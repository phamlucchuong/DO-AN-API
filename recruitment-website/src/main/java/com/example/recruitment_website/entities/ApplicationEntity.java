package com.example.recruitment_website.entities;

import java.time.LocalDate;
import org.hibernate.annotations.GenericGenerator;

import com.example.recruitment_website.enums.Status;
import com.google.firebase.database.annotations.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "application",
    uniqueConstraints = @UniqueConstraint(columnNames = {"employee_uid", "job_id"})
)
public class ApplicationEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "VARCHAR(36)")
    private String id;

    private LocalDate createdDate;

    private String cvLink;

    @OneToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    @OneToOne
    @JoinColumn(name = "job_id")
    private JobEntity job;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;

    public ApplicationEntity() {
    }

    public ApplicationEntity(LocalDate createdDate, String cvLink, EmployeeEntity employee, JobEntity job, Status status) {
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee = employee;
        this.job = job;
        this.status = status;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
