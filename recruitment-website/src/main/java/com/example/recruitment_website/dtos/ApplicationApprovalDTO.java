package com.example.recruitment_website.dtos;

import java.time.LocalDateTime;

public class ApplicationApprovalDTO {

    private Integer id;
    private LocalDateTime approvedDate;
    private EmployeeDTO employee;
    private EmployerDTO employer;
    private ApplicationDTO application;

    public ApplicationApprovalDTO() {
    }

    public ApplicationApprovalDTO(Integer id, LocalDateTime approvedDate, EmployeeDTO employee, EmployerDTO employer, ApplicationDTO application) {
        this.id = id;
        this.approvedDate = approvedDate;
        this.employee = employee;
        this.employer = employer;
        this.application = application;
    }

    // Getters & Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(LocalDateTime approvedDate) {
        this.approvedDate = approvedDate;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public EmployerDTO getEmployer() {
        return employer;
    }

    public void setEmployer(EmployerDTO employer) {
        this.employer = employer;
    }

    public ApplicationDTO getApplication() {
        return application;
    }

    public void setApplication(ApplicationDTO application) {
        this.application = application;
    }
}
