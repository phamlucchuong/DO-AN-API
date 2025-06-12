package com.example.recruitment_website.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.services.ApplicationService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/application")
public class ApplicationRestController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/{job_id}/post")
    public ResponseEntity<?> postApply(
            @PathVariable Integer job_id,
            @RequestBody ApplicationDTO dto) {
        applicationService.createNewApply(job_id, dto);
        return ResponseEntity.ok("Thêm hồ sơ ứng tuyển thành công!");
    }

}
