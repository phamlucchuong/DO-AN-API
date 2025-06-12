package com.example.recruitment_website.restcontrollers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.payloads.EmployerProfileUpdateRequest;
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.repositories.EmployerRepository;
import com.example.recruitment_website.services.EmployerService;
import com.example.recruitment_website.services.JobService;

@RestController
@RequestMapping("/api/employer")
public class EmployerRestController {

    @Autowired
    private EmployerService employerService;

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployerRepository employerRepository;

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> registerEmployer(@ModelAttribute EmployerRegisterRequest employerRegisterRequest) {
        try {
            logger.debug("Received EmployerRegisterRequest: {}", employerRegisterRequest);
            EmployerDTO employerDTO = employerService.registerEmployer(employerRegisterRequest);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Đăng ký thành công! Vui lòng đăng nhập.",
                    "data", employerDTO
            ));
        } catch (RuntimeException ex) {
            logger.error("Lỗi đăng ký employer: {}", ex.getMessage(), ex);
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", ex.getMessage()
            ));
        } catch (Exception ex) {
            logger.error("Lỗi không xác định: {}", ex.getMessage(), ex);
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Dữ liệu không hợp lệ: " + ex.getMessage()
            ));
        }
    }

    private static final Logger logger = LoggerFactory.getLogger(EmployerRestController.class);

    @GetMapping("/profile")
    public ResponseEntity<EmployerDTO> getEmployerProfile(@RequestParam("uid") String uid) {
        try {
            logger.info("Lấy hồ sơ nhà tuyển dụng với uid: {}", uid);
            EmployerDTO employer = employerService.getEmployerByUid(uid);
            if (employer == null) {
                logger.warn("Không tìm thấy nhà tuyển dụng với uid: {}", uid);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(employer);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy hồ sơ nhà tuyển dụng với uid: {}", uid, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping(value = "/profile/update", consumes = "multipart/form-data")
    public ResponseEntity<?> updateEmployerProfile(
            @RequestParam("uid") String uid,
            @ModelAttribute EmployerProfileUpdateRequest request) {
        try {
            logger.debug("Received update request for employer with UID: {}", uid);
            EmployerDTO updatedEmployer = employerService.updateEmployerProfile(uid, request);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Cập nhật hồ sơ thành công!",
                    "data", updatedEmployer
            ));
        } catch (RuntimeException ex) {
            logger.error("Lỗi khi cập nhật hồ sơ employer UID: {}: {}", uid, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", ex.getMessage()
            ));
        } catch (Exception ex) {
            logger.error("Lỗi không xác định khi cập nhật hồ sơ: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Lỗi khi cập nhật hồ sơ: " + ex.getMessage()
            ));
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllEmployers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            logger.info("Lấy danh sách tất cả employer với trang {} và kích thước {}", page, size);
            Map<String, Object> response = employerService.getAllEmployers(page, size);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            logger.error("Lỗi tham số không hợp lệ: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "success", false,
                    "message", ex.getMessage()
            ));
        } catch (Exception ex) {
            logger.error("Lỗi khi lấy danh sách employer: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Lỗi khi lấy danh sách employer: " + ex.getMessage()
            ));
        }
    }

    @GetMapping("/approve/{id}")
    public ResponseEntity<?> approveEmployer(@PathVariable("id") String id, RedirectAttributes redirectAttributes) {
        employerService.approveEmployer(id);
        // redirectAttributes.addFlashAttribute("successMessage", "Nhà tuyển dụng đã được duyệt thành công.");
        EmployerDTO employer = employerService.getEmployerByUid(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Nhà tuyển dụng đã được duyệt thành công.",
                "data", employer
        ));

    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getEmployerStatistics() {
        try {
            logger.info("Fetching job statistics for current and last month");
            Map<String, Long> stats = employerService.getEmployerStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            logger.error("Error fetching job statistics: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi khi lấy thống kê bài tuyển dụng"));
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<EmployerDTO>> getPendingEmployers() {
        List<EmployerDTO> pendingEmployers = employerService.getPendingEmployers();
        return new ResponseEntity<>(pendingEmployers, HttpStatus.OK);
    }

    @GetMapping("/{id}/jobs/count")
    public ResponseEntity<Integer> getJobsCountByEmployerId(@PathVariable String id) {
        Integer count = jobService.getJobsCountByEmployerId(id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/getTopEmployers")
    public ResponseEntity<?> getTopEmployers() {
        List<Map<String, Object>> topEmployers = employerService.getTopEmployers();
        // List<Map<String, Object>> topEmployers = employerRepository.findTopEmployers();
        return ResponseEntity.ok(topEmployers);
    }

    @GetMapping("/detail")
    public ResponseEntity<EmployerDTO> getEmployerDetail(@RequestParam("uid") String uid) {
        try {
            logger.info("Lấy hồ sơ nhà tuyển dụng với uid: {}", uid);
            EmployerDTO employer = employerService.getEmployerByUid(uid);
            if (employer == null) {
                logger.warn("Không tìm thấy nhà tuyển dụng với uid: {}", uid);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(employer);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy hồ sơ nhà tuyển dụng với uid: {}", uid, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
