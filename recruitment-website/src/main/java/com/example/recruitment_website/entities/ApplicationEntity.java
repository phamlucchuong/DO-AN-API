package com.example.recruitment_website.entities;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "application")
public class ApplicationEntity {
    @Id
    private String id;

    private LocalDate createdDate;

    private String cvLink;

    @OneToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    @OneToOne
    @JoinColumn(name = "employer_uid")
    private EmployerEntity employer;
    
    @OneToOne
    @JoinColumn(name = "job_id")
    private JobEntity job;



    public ApplicationEntity( LocalDate createdDate, String cvLink, EmployeeEntity employee,
            EmployerEntity employer) {
        this.id = UUID.randomUUID().toString();
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee = employee;
        this.employer = employer;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getCv_link() {
        return cvLink;
    }

    public void setCv_link(String cvLink) {
        this.cvLink = cvLink;
    }

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    public EmployerEntity getEmployer() {
        return employer;
    }

    public void setEmployer(EmployerEntity employer) {
        this.employer = employer;
    }

    
}
