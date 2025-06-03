package com.example.recruitment_website.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.payloads.EmployerLoginResponse;
import com.example.recruitment_website.payloads.JobResponse;
import com.example.recruitment_website.services.JobService;

@RestController
@RequestMapping("/employer/job")
public class JobRestController {

    @Autowired
    private JobService jobService;

    @PostMapping("/add")
    public ResponseEntity<?> addJob(@RequestBody JobDTO jobDTO) {
        try {
            JobDTO savedJob = jobService.addJob(jobDTO);
            return ResponseEntity.ok(new EmployerLoginResponse("true", "Job added successfully", savedJob));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new EmployerLoginResponse("false", e.getMessage(), null));
        }
    }

    @GetMapping("/get")
    @ResponseBody
    public List<JobResponse> getJobsByEmployerId(@RequestParam Integer employerId) {
        if (employerId == null) {
            throw new IllegalArgumentException("Employer ID must not be null");
        }
        return jobService.getJobResponsesByEmployerId(employerId);
    }

}
