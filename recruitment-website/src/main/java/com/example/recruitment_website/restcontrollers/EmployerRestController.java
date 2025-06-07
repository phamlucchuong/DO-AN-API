package com.example.recruitment_website.restcontrollers;


import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.services.EmployerService;

@RestController
@RequestMapping("/api/employer")
public class EmployerRestController {

    @Autowired
    private EmployerService employerService;

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
}
