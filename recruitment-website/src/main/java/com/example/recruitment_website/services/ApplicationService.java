package com.example.recruitment_website.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.enums.Status;
import com.example.recruitment_website.repositories.ApplicationRepository;
import com.example.recruitment_website.repositories.EmployeeRepository;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class ApplicationService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ImageUploadService imageUploadService;

    public void createNewApply(Integer job_id, ApplicationDTO dto, MultipartFile file) {
        JobEntity job = jobRepository.findById(job_id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy job có ID: " + job_id));

        EmployeeEntity employee = employeeRepository.findById(dto.getEmployee())
                .orElseThrow(() -> new RuntimeException(
                "Không tìm thấy employee có ID: " + dto.getEmployee()));

        // ⚠ Check nếu đã apply job này
        if (applicationRepository.findByEmployeeAndJob(employee, job).isPresent()) {
            throw new IllegalStateException("You have already applied for this job.");
        }

        // ✅ Upload file lên Cloudinary
        String uploadedCvLink = imageUploadService.uploadPdfToCloudinary(file);

        ApplicationEntity application = new ApplicationEntity();
        application.setEmployee(employee);
        application.setJob(job);

        application.setCvLink(uploadedCvLink); // dùng link từ Cloudinary
        application.setCreatedDate(LocalDate.now());
        application.setStatus(Status.PENDING);

        applicationRepository.save(application);
    }

    public Integer getTotalCountCandidateByEmployerId(String employerId) {
        return applicationRepository.countByEmployerId(employerId);
    }

    public List<ApplicationEntity> getCandidatesByEmployerId(String employerId) {
        List<ApplicationEntity> applications = applicationRepository.findByEmployer_Id(employerId);
        return applications;
    }

    public List<ApplicationEntity> getCandidatesByEmployerIdAndJobId(String employerId, Integer jobId) {
        return applicationRepository.findByEmployeeAndJob(employerId, jobId);
    }

    public List<ApplicationEntity> getApplies(String uid) {
        if (!employeeRepository.existsByAccountId(uid)) {
            throw new RuntimeException("khong tim thay employee co ID: " + uid);
        }

        return applicationRepository.findByEmployeeUid(uid);
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
}
