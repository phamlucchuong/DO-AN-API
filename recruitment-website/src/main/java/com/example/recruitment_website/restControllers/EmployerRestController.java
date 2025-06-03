package com.example.recruitment_website.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.payloads.EmployerLoginRequest;
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.services.EmployerService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/employer")
public class EmployerRestController {

    @Autowired
    private EmployerService employerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployer(@RequestBody EmployerRegisterRequest request) {
        try {
            EmployerDTO registeredEmployer = employerService.registerEmployer(
                    request.getEmail(),
                    request.getPassword(),
                    request.getCompanyName(),
                    request.getCompanyAddress(),
                    request.getPhoneNumber());
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

    @GetMapping("/get-list")
    public ResponseEntity<List<EmployerDTO>> getCompanyList() {
        List<EmployerDTO> employerList = employerService.getListEmployer();
        return ResponseEntity.ok(employerList);
    }

}
