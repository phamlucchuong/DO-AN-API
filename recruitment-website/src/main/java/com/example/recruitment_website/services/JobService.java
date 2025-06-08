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

    @Transactional
    public JobDTO updateJob(Integer jobId, JobRequest jobRequest) {
        // 1. Kiểm tra sự tồn tại của công việc
        JobEntity jobEntity = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy công việc với ID: " + jobId));

        // 2. Kiểm tra sự tồn tại của nhà tuyển dụng
        String employerId = jobRequest.getEmployerId();
        if (employerId == null || employerId.isEmpty()) {
            throw new IllegalArgumentException("Employer ID must not be null or empty");
        }
        EmployerEntity employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà tuyển dụng với ID: " + employerId));

        // 3. Kiểm tra quyền sở hữu
        if (!jobEntity.getEmployer().getUid().equals(employerId)) {
            throw new RuntimeException("Bạn không có quyền cập nhật công việc này");
        }

        // 4. Cập nhật các trường từ jobRequest, giữ nguyên nếu null
        jobEntity.setTitle(jobRequest.getTitle() != null ? jobRequest.getTitle() : jobEntity.getTitle());
        jobEntity.setSalary(jobRequest.getSalary() != null ? jobRequest.getSalary() : jobEntity.getSalary());
        jobEntity.setExperience(jobRequest.getExperience() != null ? jobRequest.getExperience() : jobEntity.getExperience());
        jobEntity.setDescription(jobRequest.getDescription() != null ? jobRequest.getDescription() : jobEntity.getDescription());
        jobEntity.setRequirements(jobRequest.getRequirements() != null ? jobRequest.getRequirements() : jobEntity.getRequirements());
        jobEntity.setBenefits(jobRequest.getBenefits() != null ? jobRequest.getBenefits() : jobEntity.getBenefits());
        jobEntity.setDeadline(jobRequest.getDeadline() != null ? jobRequest.getDeadline() : jobEntity.getDeadline());
        jobEntity.setStatus(jobRequest.getStatus() != null ? jobRequest.getStatus() : jobEntity.getStatus());
        jobEntity.setNumberOfVacancies(jobRequest.getNumberOfVacancies() != null ? jobRequest.getNumberOfVacancies() : jobEntity.getNumberOfVacancies());
        jobEntity.setJobLevel(jobRequest.getJobLevel() != null ? jobRequest.getJobLevel() : jobEntity.getJobLevel());
        jobEntity.setEmploymentType(jobRequest.getEmploymentType() != null ? jobRequest.getEmploymentType() : jobEntity.getEmploymentType());
        jobEntity.setCity(jobRequest.getCity() != null ? jobRequest.getCity() : jobEntity.getCity());
        jobEntity.setAddress(jobRequest.getAddress() != null ? jobRequest.getAddress() : jobEntity.getAddress());
        jobEntity.setWorkingHours(jobRequest.getWorkingHours() != null ? jobRequest.getWorkingHours() : jobEntity.getWorkingHours());

        // 5. Không cập nhật isApproved và applicationCount
        // jobEntity.setIsApproved(jobRequest.getIsApproved() != null ? jobRequest.getIsApproved() : jobEntity.getIsApproved());
        // jobEntity.setApplicationCount(jobRequest.getApplicationCount() != null ? jobRequest.getApplicationCount() : jobEntity.getApplicationCount());

        // 6. Gán lại employer
        jobEntity.setEmployer(employer);

        // 7. Lưu entity vào database
        jobEntity = jobRepository.save(jobEntity);

        // 8. Map entity sang DTO
        return jobMapper.toDTO(jobEntity);
    }

}
