package com.example.recruitment_website.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.mappers.JobMapper;
import com.example.recruitment_website.payloads.JobResponse;
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

    @Transactional
    public JobDTO addJob(JobDTO jobDTO) {
        // Kiểm tra dữ liệu đầu vào
        if (jobDTO.getEmployerId() == null) {
            throw new IllegalArgumentException("ID nhà tuyển dụng là bắt buộc");
        }
        if (jobDTO.getTitle() == null || jobDTO.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Tiêu đề công việc là bắt buộc");
        }
        if (jobDTO.getEmploymentType() == null || jobDTO.getEmploymentType().trim().isEmpty()) {
            throw new IllegalArgumentException("Loại hình công việc là bắt buộc");
        }
        if (jobDTO.getDescription() == null || jobDTO.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Mô tả công việc là bắt buộc");
        }
        if (jobDTO.getRequirements() == null || jobDTO.getRequirements().trim().isEmpty()) {
            throw new IllegalArgumentException("Yêu cầu công việc là bắt buộc");
        }

        // Ánh xạ JobDTO sang JobEntity
        JobEntity jobEntity = jobMapper.toEntity(jobDTO);

        // Đặt giá trị mặc định
        if (jobEntity.getStatus() == null || jobEntity.getStatus().trim().isEmpty()) {
            jobEntity.setStatus("Open");
        }
        jobEntity.setEmployerId(jobDTO.getEmployerId());
        jobEntity.setCreatedAt(LocalDateTime.now());
        jobEntity.setUpdatedAt(LocalDateTime.now());

        // Lưu vào cơ sở dữ liệu
        JobEntity savedJob = jobRepository.save(jobEntity);

        // Ánh xạ JobEntity trở lại JobDTO để trả về
        return jobMapper.toDTO(savedJob);
    }

    @Transactional
    public List<JobResponse> getJobResponsesByEmployerId(String employerId) {
        List<JobEntity> jobEntities = jobRepository.findByEmployerId(employerId);

        List<JobResponse> jobResponses = new ArrayList<>();

        EmployerEntity employerEntity = employerRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà tuyển dụng"));

        for (JobEntity jobEntity : jobEntities) {
            JobResponse response = new JobResponse();
            response.setId(jobEntity.getId());
            response.setTitle(jobEntity.getTitle());
            response.setCompanyName(employerEntity.getCompanyName());
            response.setCompanyAddress(employerEntity.getCompanyAddress());
            response.setJobType(jobEntity.getEmploymentType());
            response.setSalaryRange(jobEntity.getSalary());
            response.setUrgent(jobEntity.getStatus().equalsIgnoreCase("Urgent"));
            // response.setCandidateCount(candidateRepository.countByJobId(job.getId()));
            response.setCandidateCount(0);
            jobResponses.add(response);
        }

        return jobResponses;
    }

    public Integer getCandidateCountByJobId(Integer jobId) {
        // Giả sử bạn có một repository để đếm số lượng ứng viên theo jobId
        // return candidateRepository.countByJobId(jobId);
        return 0; // Chưa triển khai logic đếm ứng viên
    }

}
