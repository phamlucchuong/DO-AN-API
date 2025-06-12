package com.example.recruitment_website.restcontrollers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.services.ApplicationService;

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

    @GetMapping("/employer/{employer_id}/count")
    public ResponseEntity<?> getTotalCountCandidateByEmployerId(@PathVariable("employer_id") String employerId) {
        Integer total = applicationService.getTotalCountCandidateByEmployerId(employerId);
        return ResponseEntity.ok(total);
    }

    @GetMapping("/employer/{employer_id}/get")
    public ResponseEntity<?> getCandidateByEmployerId(@PathVariable("employer_id") String employerId) {
        List<ApplicationEntity> result = applicationService.getCandidatesByEmployerId(employerId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/employer/job")
    public Map<String, Object> getApplicationsByEmployerAndJob(
            @RequestParam String employerId,
            @RequestParam Integer jobId) {
        List<ApplicationEntity> applications = applicationService.getCandidatesByEmployerIdAndJobId(employerId, jobId);
        return Map.of("applications", applications);
    }

}
