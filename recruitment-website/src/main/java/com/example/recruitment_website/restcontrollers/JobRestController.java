package com.example.recruitment_website.restcontrollers;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.bind.annotation.PutMapping;
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

    private static final Logger log = LoggerFactory.getLogger(JobRestController.class);

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addJob(@ModelAttribute JobRequest jobRequest) {
        try {
            log.info("Adding job for employerId: {}", jobRequest.getEmployerId());
            JobDTO savedJob = jobService.addJob(jobRequest);
            return ResponseEntity.ok(new EmployerLoginResponse("true", "Job added successfully", savedJob));
        } catch (Exception e) {
            log.error("Error adding job: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new EmployerLoginResponse("false", e.getMessage(), null));
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> getJobsByEmployerId(
            @RequestParam("employerId") String employerId,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        try {
            log.info("Fetching jobs for employerId: {}, page: {}, limit: {}", employerId, page, limit);
            Pageable pageable = PageRequest.of(page - 1, limit);
            Page<JobEntity> jobPage = jobRepository.findByEmployerUid(employerId, pageable);
            Map<String, Object> response = Map.of(
                    "jobs", jobPage.getContent(),
                    "totalCount", jobPage.getTotalElements(),
                    "totalPages", jobPage.getTotalPages(),
                    "currentPage", page
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching jobs: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/getAllJobs")
    public ResponseEntity<?> getAllJobs() {
        try {
            log.info("Fetching all jobs");
            return ResponseEntity.ok(jobService.getJobs());
        } catch (Exception e) {
            log.error("Error fetching all jobs: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", e.getMessage()));
        }
    }


    @GetMapping("/{id}/detail")
    public ResponseEntity<?> getJobById(@PathVariable Integer id) {
        try {
            log.info("Fetching job detail for id: {}", id);
            JobDTO jobDTO = jobService.getJobById(id);
            return ResponseEntity.ok(jobDTO);
        } catch (Exception e) {
            log.error("Error fetching job detail: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Không tìm thấy công việc"));
        }
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateJob(@PathVariable Integer id, @ModelAttribute JobRequest jobRequest) {
        try {
            log.info("Updating job id: {}, employerId: {}", id, jobRequest.getEmployerId());
            JobDTO updatedJob = jobService.updateJob(id, jobRequest);
            return ResponseEntity.ok(new EmployerLoginResponse("true", "Job updated successfully", updatedJob));
        } catch (Exception e) {
            log.error("Error updating job id: {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(new EmployerLoginResponse("false", e.getMessage(), null));
        }
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getJobStatistics() {
        try {
            log.info("Fetching job statistics for current and last month");
            Map<String, Long> stats = jobService.getJobStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Error fetching job statistics: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi khi lấy thống kê bài tuyển dụng"));
        }
    }

    @GetMapping("/getHotJobs")
    public List<JobEntity> getHotJobs() {
        return jobService.getHotJobs();
    }
    
}
