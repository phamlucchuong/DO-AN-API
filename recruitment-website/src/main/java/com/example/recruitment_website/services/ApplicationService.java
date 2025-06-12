package com.example.recruitment_website.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.repositories.ApplicationRepository;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class ApplicationService {
    
    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public void createNewApply(Integer job_id, ApplicationDTO dto) {
        JobEntity job = jobRepository.findById(job_id)
        .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + job_id));


    }
}
