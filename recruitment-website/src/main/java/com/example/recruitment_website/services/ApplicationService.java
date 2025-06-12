package com.example.recruitment_website.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.JobEntity;
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

                EmployeeEntity employee = employeeRepository.findById(dto.getEmployee_id())
                                .orElseThrow(() -> new RuntimeException(
                                                "Không tìm thấy employee có ID: " + dto.getEmployee_id()));

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

                applicationRepository.save(application);
        }

}
