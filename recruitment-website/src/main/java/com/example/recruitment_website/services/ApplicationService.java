package com.example.recruitment_website.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.repositories.ApplicationRepository;
import com.example.recruitment_website.repositories.EmployeeRepository;
import com.example.recruitment_website.repositories.EmployerRepository;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class ApplicationService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public void createNewApply(Integer job_id, ApplicationDTO dto) {
        JobEntity job = jobRepository.findById(job_id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + job_id));

        EmployeeEntity employee = employeeRepository.findById(dto.getEmployee_id())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + dto.getEmployee_id()));

        EmployerEntity employer = employerRepository.findById(dto.getEmployer_id())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + dto.getEmployer_id()));

        ApplicationEntity application = new ApplicationEntity();
        application.setEmployee(employee);
        application.setEmployer(employer);
        application.setJob(job);

        application.setCvLink(dto.getCvLink());
        application.setCreatedDate(LocalDate.now());

        applicationRepository.save(application);
    }
}
