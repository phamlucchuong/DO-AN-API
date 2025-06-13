package com.example.recruitment_website.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.entities.ApplicationApproval;
import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.repositories.ApplicationApprovalRepository;
import com.example.recruitment_website.repositories.ApplicationRepository;
import com.example.recruitment_website.repositories.EmployeeRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

@Service
public class ApplicationApprovalService {

    @Autowired
    private ApplicationApprovalRepository approvalRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployerRepository employerRepository;

    public ApplicationApproval addApproval(String applicationId, String employerId, String employeeId, LocalDateTime approvedDate) {
        // Tìm application
        ApplicationEntity application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Application với id: " + applicationId));

        // Tìm employee theo employeeId
        EmployeeEntity employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Employee với id: " + employeeId));

        // Tìm employer
        EmployerEntity employer = employerRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Employer với id: " + employerId));

        // Tạo mới bản ghi ApplicationApproval
        ApplicationApproval approval = new ApplicationApproval();
        approval.setApprovedDate(approvedDate != null ? approvedDate : LocalDateTime.now());
        approval.setApplication(application);
        approval.setEmployee(employee);
        approval.setEmployer(employer);

        // Lưu vào DB
        return approvalRepository.save(approval);
    }

}
