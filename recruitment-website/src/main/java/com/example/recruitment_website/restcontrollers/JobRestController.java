package com.example.recruitment_website.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.payloads.EmployerLoginResponse;
import com.example.recruitment_website.payloads.JobRequest;
import com.example.recruitment_website.services.JobService;

@RestController
@RequestMapping("/api/employer/job")
public class JobRestController {

    @Autowired
    private JobService jobService;

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
    public ResponseEntity<List<JobDTO>> getJobsByEmployerId(@RequestParam("employerId") String employerId) {
        try {
            List<JobDTO> jobs = jobService.getJobsByEmployerId(employerId);
            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}
