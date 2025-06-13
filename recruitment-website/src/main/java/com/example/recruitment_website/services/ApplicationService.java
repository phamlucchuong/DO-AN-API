package com.example.recruitment_website.services;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.enums.Status;
import com.example.recruitment_website.mappers.ApplicationMapper;
import com.example.recruitment_website.mappers.ApplicationResponseMapper;
import com.example.recruitment_website.payloads.ApplicationRespone;
import com.example.recruitment_website.repositories.ApplicationRepository;
import com.example.recruitment_website.repositories.EmployeeRepository;
import com.example.recruitment_website.repositories.JobRepository;

import jakarta.transaction.Transactional;

@Service
public class ApplicationService {
  
    @Autowired
    private ApplicationMapper applicationMapper;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    @Autowired
    private ApplicationResponseMapper applicationResponseMapper;

    @Transactional
    public void createNewApply(Integer job_id, ApplicationDTO dto, MultipartFile file) {
        JobEntity job = jobRepository.findById(job_id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + job_id));

        EmployeeEntity employee = employeeRepository.findById(dto.getEmployee_id())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy employee có ID: " + dto.getEmployee_id()));

        // ✅ Upload file lên Cloudinary
        String uploadedCvLink = imageUploadService.uploadPdfToCloudinary(file);

        ApplicationEntity application = new ApplicationEntity();

        if (employee.getApplications().contains(application)) {
            return;
        }

        application.setEmployee(employee);
        application.setJob(job);

        application.setCvLink(uploadedCvLink); // dùng link từ Cloudinary
        application.setCreatedDate(LocalDate.now());
        application.setStatus(Status.PENDING);

        employee.getApplications().add(application);
        applicationRepository.save(application);
    }

    public Integer getTotalCountCandidateByEmployerId(String employerId) {
        return applicationRepository.countByEmployerId(employerId);
    }

    public List<ApplicationRespone> getCandidatesByEmployerId(String employerId) {
        List<ApplicationEntity> applications = applicationRepository.findByJob_Employer_Uid(employerId);

        List<ApplicationRespone> responses = applications.stream()
                .map(applicationResponseMapper::toResponse)
                .collect(Collectors.toList());

        return responses;
    }

    public List<ApplicationEntity> getCandidatesByEmployerIdAndJobId(String employerId, Integer jobId) {
        return applicationRepository.findByEmployeeAndJob(employerId, jobId);
    }

    public List<ApplicationDTO> getApplies(String uid) {
        if (!employeeRepository.existsByAccountId(uid)) {
            throw new RuntimeException("khong tim thay employee co ID: " + uid);
        }

        List<ApplicationEntity> apps = applicationRepository.findByEmployee_Uid(uid);

        return apps.stream().map(app -> {
            ApplicationDTO dto = new ApplicationDTO();
            dto.setId(app.getId());
            dto.setStatus(app.getStatus());
            dto.setCvLink(app.getCvLink());
            dto.setCreatedDate(app.getCreatedDate());

            JobEntity job = app.getJob();
            JobDTO jobDto = new JobDTO();
            jobDto.setId(job.getId());
            jobDto.setTitle(job.getTitle());

            // Nếu muốn gói thông tin công ty:
            EmployerEntity emp = job.getEmployer();
            EmployerDTO empDto = new EmployerDTO();
            empDto.setUid(emp.getUid());
            empDto.setCompanyName(emp.getCompanyName());
            // ...

            jobDto.setEmployer(empDto);
            dto.setJob(jobDto);

            return dto;
        }).collect(Collectors.toList());
    }

    public void putApplies(String uid, MultipartFile file) {
        ApplicationEntity application = applicationRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("khong tim thay apply"));

        // ✅ Upload file lên Cloudinary
        String uploadedCvLink = imageUploadService.uploadPdfToCloudinary(file);

        application.setCvLink(uploadedCvLink);
        applicationRepository.save(application);

    }

    public void deleteApplies(String uid) {
        ApplicationEntity application = applicationRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("khong tim thay apply"));

        applicationRepository.delete(application);
    }

    public void updateApplicationStatus(String applicationId, String statusValue) {
        ApplicationEntity application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ứng tuyển với id: " + applicationId));

        // Kiểm tra nếu statusValue không hợp lệ
        Status newStatus;
        try {
            newStatus = Status.valueOf(statusValue);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status không hợp lệ: " + statusValue);
        }

        application.setStatus(newStatus);
        applicationRepository.save(application);
    }
}
