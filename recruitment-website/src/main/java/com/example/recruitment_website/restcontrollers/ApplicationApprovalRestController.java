package com.example.recruitment_website.restcontrollers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.entities.ApplicationApprovalEntity;
import com.example.recruitment_website.services.ApplicationApprovalService;

@RestController
@RequestMapping("/api/application/approval")
public class ApplicationApprovalRestController {

    @Autowired
    private ApplicationApprovalService approvalService;

    // API duyệt ứng viên
    @PostMapping("/add")
    public ResponseEntity<?> approveApplication(
            @RequestParam String applicationId,
            @RequestParam String employerId,
            @RequestParam String employeeId,
            @RequestParam(required = false) LocalDateTime approvedDate) {

        try {
            ApplicationApprovalEntity approval = approvalService.addApproval(applicationId, employerId, employeeId, approvedDate);
            return ResponseEntity.ok(approval);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
