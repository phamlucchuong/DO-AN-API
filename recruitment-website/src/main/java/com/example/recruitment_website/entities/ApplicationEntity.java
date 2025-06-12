package com.example.recruitment_website.entities;

import java.time.LocalDate;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(
    name = "application"
)
public class ApplicationEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;

    private LocalDate createdDate;

    private String cvLink;

    @ManyToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private JobEntity job;

    public ApplicationEntity() {
    }

    public ApplicationEntity(LocalDate createdDate, String cvLink, EmployeeEntity employee, JobEntity job) {
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee = employee;
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

    public void setJob(JobEntity job) {
        this.job = job;
    }

    public JobEntity getJob() {
        return job;
    }
}
