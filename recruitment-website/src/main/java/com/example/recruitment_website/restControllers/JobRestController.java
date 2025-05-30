package com.example.recruitment_website.restControllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.mappers.JobMapper;
import com.example.recruitment_website.repositories.JobRepository;

@RestController
@RequestMapping("/employer/job")
public class JobRestController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> postNewJob(@RequestBody JobDTO jobDTO) {
        Map<String, Object> response = new HashMap<>();

        try {
            JobEntity jobEntity = jobMapper.toEntity(jobDTO);
            jobEntity.setCreatedAt(LocalDateTime.now());
            jobEntity.setUpdatedAt(LocalDateTime.now());
            jobRepository.save(jobEntity);

            response.put("success", true);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
