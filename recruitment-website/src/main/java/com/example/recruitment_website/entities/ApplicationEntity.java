package com.example.recruitment_website.entities;

import java.time.LocalDate;
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

    public ApplicationEntity() {
    }

    

    public ApplicationEntity(String id, LocalDate createdDate, String cvLink, EmployeeEntity employee,
            EmployerEntity employer, JobEntity job) {
        this.id = id;
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee = employee;
        this.employer = employer;
        this.job = job;
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

    public String getCvLink() {
        return cvLink;
    }

    public void setCvLink(String cvLink) {
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

    public void setJob(JobEntity job) {
        this.job = job;
    }

    public JobEntity getJob() {
        return job;
    }
}
