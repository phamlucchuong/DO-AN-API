package com.example.recruitment_website.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.services.ApplicationService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/application")
public class ApplicationRestController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/{job_id}/post")
    public ResponseEntity<?> postApply(
            @PathVariable Integer job_id,
            @RequestPart("data") ApplicationDTO dto, // Nhận JSON từ FormData
            @RequestPart("cvFile") MultipartFile file) { // Nhận file PDF
        applicationService.createNewApply(job_id, dto, file);
        return ResponseEntity.ok("Thêm hồ sơ ứng tuyển thành công!");
    }

}
