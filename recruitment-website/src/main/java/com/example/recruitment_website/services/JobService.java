package com.example.recruitment_website.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
import com.example.recruitment_website.mappers.JobMapper;
import com.example.recruitment_website.payloads.JobRequest;
import com.example.recruitment_website.repositories.EmployerRepository;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private EmployerMapper employerMapper;

    @Transactional
    public JobDTO addJob(JobRequest jobRequest) {
        // 1. Lấy EmployerEntity từ employerId trong JobRequest
        EmployerEntity employer = employerRepository.findById(jobRequest.getEmployerId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà tuyển dụng với ID: " + jobRequest.getEmployerId()));

        EmployerDTO employerDTO = employerMapper.toDTO(employer);

        // 2. Map từ JobRequest sang JobDTO
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(jobRequest.getId());
        jobDTO.setTitle(jobRequest.getTitle());
        jobDTO.setEmployer(employerDTO);
        jobDTO.setAddress(jobRequest.getAddress());
        jobDTO.setApplicationCount(jobRequest.getApplicationCount());
        jobDTO.setBenefits(jobRequest.getBenefits());
        jobDTO.setCity(jobRequest.getCity());
        jobDTO.setDeadline(jobRequest.getDeadline());
        jobDTO.setDescription(jobRequest.getDescription());
        jobDTO.setEmploymentType(jobRequest.getEmploymentType());
        jobDTO.setExperience(jobRequest.getExperience());
        jobDTO.setJobLevel(jobRequest.getJobLevel());
        jobDTO.setIsApproved(false);
        jobDTO.setRequirements(jobRequest.getRequirements());
        jobDTO.setNumberOfVacancies(0);
        jobDTO.setSalary(jobRequest.getSalary());
        jobDTO.setStatus(jobRequest.getStatus());
        jobDTO.setWorkingHours(jobRequest.getWorkingHours());

        // 3. Map JobDTO sang JobEntity
        JobEntity jobEntity = jobMapper.toEntity(jobDTO);

        // 4. Gán employer cho jobEntity
        jobEntity.setEmployer(employer);

        // 5. Lưu entity vào database
        jobEntity = jobRepository.save(jobEntity);

        // 6. Map entity ngược lại DTO để trả về
        return jobMapper.toDTO(jobEntity);
    }

    public List<JobDTO> getJobsByEmployerId(String employerId) {
        List<JobEntity> jobs = jobRepository.findByEmployerUid(employerId);
        return jobs.stream().map(jobMapper::toDTO).collect(Collectors.toList());
    }

    public JobDTO getJobById(Integer jobId) {
        Optional<JobEntity> optionalJob = jobRepository.findById(jobId);
        JobEntity jobEntity = optionalJob.orElseThrow(() -> new RuntimeException("Không tìm thấy công việc với id: " + jobId));

        return jobMapper.toDTO(jobEntity);
    }

}
