package com.example.recruitment_website.restcontrollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.payloads.EmployerLoginResponse;
import com.example.recruitment_website.payloads.JobRequest;
import com.example.recruitment_website.repositories.JobRepository;
import com.example.recruitment_website.services.JobService;

@RestController
@RequestMapping("/api/employer/job")
public class JobRestController {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addJob(@ModelAttribute JobRequest jobRequest) {
        try {
            // gọi service với jobRequest
            JobDTO savedJob = jobService.addJob(jobRequest);

            return ResponseEntity.ok(new EmployerLoginResponse("true", "Job added successfully", savedJob));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new EmployerLoginResponse("false", e.getMessage(), null));
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getJobsByEmployerId(
            @RequestParam("employerId") String employerId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit) {

        Pageable pageable = PageRequest.of(page - 1, limit);
        Page<JobEntity> jobPage = jobRepository.findByEmployerUid(employerId, pageable);
        Map<String, Object> response = Map.of(
                "jobs", jobPage.getContent(),
                "totalCount", jobPage.getTotalElements(),
                "totalPages", jobPage.getTotalPages(),
                "currentPage", page
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Integer id) {
        try {
            JobDTO jobDTO = jobService.getJobById(id);
            return ResponseEntity.ok(jobDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Không tìm thấy công việc"));
        }
    }

}
