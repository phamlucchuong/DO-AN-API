package com.example.recruitment_website.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
import com.example.recruitment_website.payloads.EmployerProfileUpdateRequest;
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployerService {

    private final JobService jobService;

    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private EmployerMapper employerMapper;
    @Autowired
    private ImageUploadService imageUploadService;
    private static final Logger logger = LoggerFactory.getLogger(EmployerService.class);

    EmployerService(JobService jobService) {
        this.jobService = jobService;
    }

    @Transactional
    public EmployerDTO registerEmployer(EmployerRegisterRequest employerRegisterRequest) {
        String firebaseUid = employerRegisterRequest.getFirebaseUid();
        logger.debug("Bắt đầu đăng ký employer với UID: {}", firebaseUid);

        // Kiểm tra firebaseUid
        if (firebaseUid == null || firebaseUid.isEmpty()) {
            logger.error("Firebase UID không được để trống");
            throw new IllegalArgumentException("Firebase UID không được để trống");
        }

        // Kiểm tra tài khoản tồn tại bằng UID
        AccountEntity accountEntity = accountRepository.findById(firebaseUid)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy tài khoản với UID: {}", firebaseUid);
                    return new RuntimeException("Không tìm thấy tài khoản với UID: " + firebaseUid);
                });

        logger.debug("Tìm thấy account với UID: {}", firebaseUid);

        // Kiểm tra employer đã tồn tại
        if (employerRepository.existsById(firebaseUid)) {
            logger.warn("Tài khoản này đã đăng ký thông tin công ty! UID: {}", firebaseUid);
            throw new RuntimeException("Tài khoản này đã đăng ký thông tin công ty!");
        }

        // Xử lý file ảnh
        String logoUrl = null;
        try {
            if (employerRegisterRequest.getCompanyLogo() != null && !employerRegisterRequest.getCompanyLogo().isEmpty()) {
                logger.debug("Bắt đầu upload ảnh logo cho employer UID: {}", firebaseUid);
                logoUrl = imageUploadService.uploadToCloudinary(employerRegisterRequest.getCompanyLogo());
                logger.debug("Upload ảnh thành công, logoUrl: {}", logoUrl);
            }
        } catch (Exception ex) {
            logger.error("Lỗi upload ảnh: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi upload ảnh: " + ex.getMessage());
        }

        // Tạo employer entity
        EmployerEntity employer = new EmployerEntity();
        employer.setUid(firebaseUid);
        employer.setAccount(accountEntity);
        employer.setCompanyName(employerRegisterRequest.getCompanyName());
        employer.setCompanyAddress(employerRegisterRequest.getCompanyAddress());
        employer.setPhoneNumber(employerRegisterRequest.getPhoneNumber());
        employer.setTaxCode(employerRegisterRequest.getTaxCode());
        employer.setIndustry(employerRegisterRequest.getIndustry());
        employer.setCompanySize(employerRegisterRequest.getCompanySize());
        employer.setFoundedDate(employerRegisterRequest.getFoundedDate());
        employer.setCompanyDescription(employerRegisterRequest.getCompanyDescription());
        employer.setCompanyWebsite(employerRegisterRequest.getCompanyWebsite());
        employer.setCompanyLogo(logoUrl);
        employer.setIsApproved(false);
        employer.setStatus("ACTIVE");
        employer.setCity(employerRegisterRequest.getCity());

        logger.debug("Trạng thái employer entity trước khi save: {}", employer);

        // Lưu employer
        try {
            EmployerEntity savedEmployer = employerRepository.save(employer);
            logger.info("Lưu employer thành công với UID: {}", firebaseUid);
            return employerMapper.toDTO(savedEmployer);
        } catch (Exception ex) {
            logger.error("Lỗi khi lưu employer: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi lưu employer: " + ex.getMessage());
        }
    }

    public EmployerDTO getEmployerByUid(String uid) {
        EmployerEntity employer = employerRepository.findById(uid)
                .orElse(null);
        return employer != null ? employerMapper.toDTO(employer) : null;
    }

    @Transactional
    public EmployerDTO updateEmployerProfile(String uid, EmployerProfileUpdateRequest request) {
        logger.debug("Bắt đầu cập nhật hồ sơ employer với UID: {}", uid);

        // Kiểm tra uid
        if (uid == null || uid.isEmpty()) {
            logger.error("UID không được để trống");
            throw new IllegalArgumentException("UID không được để trống");
        }

        // Kiểm tra employer tồn tại
        EmployerEntity employer = employerRepository.findById(uid)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy nhà tuyển dụng với UID: {}", uid);
                    return new RuntimeException("Không tìm thấy nhà tuyển dụng với UID: " + uid);
                });

        // Kiểm tra tài khoản tồn tại
        AccountEntity accountEntity = accountRepository.findById(uid)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy tài khoản với UID: {}", uid);
                    return new RuntimeException("Không tìm thấy tài khoản với UID: " + uid);
                });

        // Xử lý file ảnh nếu có
        String logoUrl = employer.getCompanyLogo();
        try {
            if (request.getCompanyLogo() != null && !request.getCompanyLogo().isEmpty()) {
                logger.debug("Bắt đầu upload ảnh logo mới cho employer UID: {}", uid);
                logoUrl = imageUploadService.uploadToCloudinary(request.getCompanyLogo());
                logger.debug("Upload ảnh thành công, logoUrl: {}", logoUrl);
            }
        } catch (Exception ex) {
            logger.error("Lỗi upload ảnh: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi upload ảnh: " + ex.getMessage());
        }

        // Cập nhật các trường nếu được cung cấp
        if (request.getCompanyName() != null) {
            if (request.getCompanyName().isEmpty()) {
                logger.error("Tên công ty không được để trống");
                throw new IllegalArgumentException("Tên công ty không được để trống");
            }
            employer.setCompanyName(request.getCompanyName());
        }
        if (request.getCompanyAddress() != null) {
            employer.setCompanyAddress(request.getCompanyAddress());
        }
        if (request.getPhoneNumber() != null) {
            employer.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getTaxCode() != null) {
            employer.setTaxCode(request.getTaxCode());
        }
        if (request.getIndustry() != null) {
            employer.setIndustry(request.getIndustry());
        }
        if (request.getCompanySize() != null) {
            employer.setCompanySize(request.getCompanySize());
        }
        if (request.getFoundedDate() != null) {
            employer.setFoundedDate(request.getFoundedDate());
        }
        if (request.getCompanyDescription() != null) {
            employer.setCompanyDescription(request.getCompanyDescription());
        }
        if (request.getCompanyWebsite() != null) {
            employer.setCompanyWebsite(request.getCompanyWebsite());
        }
        if (request.getCity() != null) {
            employer.setCity(request.getCity());
        }
        employer.setCompanyLogo(logoUrl);

        // Không cập nhật isApproved hoặc status, để backend quản lý
        employer.setAccount(accountEntity);

        logger.debug("Trạng thái employer entity trước khi cập nhật: {}", employer);

        // Lưu thay đổi
        try {
            EmployerEntity updatedEmployer = employerRepository.save(employer);
            logger.info("Cập nhật hồ sơ employer thành công với UID: {}", uid);
            return employerMapper.toDTO(updatedEmployer);
        } catch (Exception ex) {
            logger.error("Lỗi khi lưu cập nhật employer: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi lưu cập nhật hồ sơ: " + ex.getMessage());
        }
    }

    public List<EmployerDTO> getAllEmployers() {
        logger.debug("Bắt đầu lấy danh sách tất cả employer");

        List<EmployerEntity> employers = employerRepository.findAll();

        if (employers.isEmpty()) {
            logger.info("Không có employer nào trong hệ thống.");
            return List.of(); // trả về danh sách rỗng
        }

        List<EmployerDTO> employerDTOs = employers.stream()
                .map(employerMapper::toDTO)
                .collect(Collectors.toList());

        logger.info("Lấy danh sách tất cả employer thành công, tổng số: {}", employerDTOs.size());
        return employerDTOs;
    }

    public void approveEmployer(String employerId) {
        EmployerEntity employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));
        employer.setIsApproved(true);
        employerRepository.save(employer);
    }

    public Map<String, Long> getEmployerStatistics() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfCurrentMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfCurrentMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfCurrentMonth.minusSeconds(1);

        // Số lượng công việc trong tháng hiện tại
        long currentMonthJobs = employerRepository.countByCreatedAtBetween(startOfCurrentMonth, now);

        // Số lượng công việc trong tháng trước
        long lastMonthJobs = employerRepository.countByCreatedAtBetween(startOfLastMonth, endOfLastMonth);

        return Map.of(
                "currentMonth", currentMonthJobs,
                "lastMonth", lastMonthJobs
        );
    }

    public List<EmployerDTO> getPendingEmployers() {
        logger.debug("Bắt đầu lấy danh sách employer đang pending duyệt");

        List<EmployerEntity> pendingEmployers = employerRepository.findByIsApprovedFalse();

        if (pendingEmployers.isEmpty()) {
            logger.info("Không có employer nào đang pending.");
            return List.of();
        }

        List<EmployerDTO> employerDTOs = pendingEmployers.stream()
                .map(employerMapper::toDTO)
                .collect(Collectors.toList());

        logger.info("Lấy danh sách employer pending thành công, tổng số: {}", employerDTOs.size());
        return employerDTOs;
    }

    public int countEmployersByMonthAndYear(int month, int year) {
        return employerRepository.countEmployersByMonthAndYear(month, year);
    }

    public List<Map<String, Object>> getTopEmployers() {
        List<EmployerEntity> employers = employerRepository.findAll();

        List<Map<String, Object>> result = employers.stream()
                .map(employer -> {
                    int jobCount = jobService.getJobsByEmployerId(employer.getUid()).size();
                    Map<String, Object> map = new HashMap<>();
                    map.put("uid", employer.getUid());
                    map.put("companyName", employer.getCompanyName());
                    map.put("industry", employer.getIndustry());
                    map.put("companyLogo", employer.getCompanyLogo());
                    map.put("city", employer.getCity());
                    map.put("companyDescription", employer.getCompanyDescription());
                    map.put("jobCount", jobCount);
                    return map;
                })
                .sorted((m1, m2) -> ((Integer) m2.get("jobCount")).compareTo((Integer) m1.get("jobCount")))
                .limit(6)
                .collect(Collectors.toList());

        return result;
    }

    public Map<String, Object> getAllEmployers(int page, int size) {
        logger.debug("Bắt đầu lấy danh sách tất cả employer với trang {} và kích thước {}", page, size);

        try {
            // Validate page and size
            if (page < 0 || size <= 0) {
                logger.error("Số trang hoặc kích thước không hợp lệ: page={}, size={}", page, size);
                throw new IllegalArgumentException("Số trang và kích thước phải là số dương");
            }

            // Create Pageable object with sorting (e.g., by companyName)
            Pageable pageable = PageRequest.of(page, size, Sort.by("companyName").ascending());

            // Fetch paginated data
            Page<EmployerEntity> employerPage = employerRepository.findAll(pageable);

            if (employerPage.isEmpty()) {
                logger.info("Không có employer nào trong hệ thống cho trang {}.", page);
                return Map.of(
                    "content", List.of(),
                    "totalElements", 0L,
                    "totalPages", 0,
                    "currentPage", page
                );
            }

            // Map entities to DTOs
            List<EmployerDTO> employerDTOs = employerPage.getContent().stream()
                    .map(employerMapper::toDTO)
                    .collect(Collectors.toList());

            logger.info("Lấy danh sách tất cả employer thành công, tổng số: {}, trang hiện tại: {}", 
                employerPage.getTotalElements(), page);

            // Return paginated response
            return Map.of(
                "content", employerDTOs,
                "totalElements", employerPage.getTotalElements(),
                "totalPages", employerPage.getTotalPages(),
                "currentPage", page
            );
        } catch (Exception ex) {
            logger.error("Lỗi khi lấy danh sách employer: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi lấy danh sách employer: " + ex.getMessage());
        }
    }

}
