package com.example.recruitment_website.restcontrollers;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
=======
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.EmployerDTO;
<<<<<<< HEAD
import com.example.recruitment_website.payloads.EmployerLoginRequest;
=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.services.EmployerService;

@RestController
<<<<<<< HEAD
@RequestMapping("/employer")
=======
@RequestMapping("/api/employer")
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
public class EmployerRestController {

    @Autowired
    private EmployerService employerService;

<<<<<<< HEAD
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployer(@RequestBody EmployerRegisterRequest request) {
        try {
            EmployerDTO registeredEmployer = employerService.registerEmployer(
                    request.getEmail(),
                    request.getPassword(),
                    request.getCompanyName(),
                    request.getCompanyAddress(),
                    request.getPhoneNumber()
            );
            return ResponseEntity.ok(registeredEmployer);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<EmployerDTO> login(@RequestBody EmployerLoginRequest loginRequest) {
        EmployerDTO accountDTO = employerService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(accountDTO);
    }
}
=======
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
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
