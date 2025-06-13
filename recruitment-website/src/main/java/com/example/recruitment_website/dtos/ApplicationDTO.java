package com.example.recruitment_website.dtos;
import java.time.LocalDate;

import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.enums.Status;

public class ApplicationDTO {

    private String id;
    private LocalDate createdDate;
    private String cvLink;
    private EmployeeDTO employee;
    private JobDTO job;
    private Status status;


    public ApplicationDTO() {
    }

    

    public ApplicationDTO(String id, LocalDate createdDate, String cvLink, EmployeeDTO employee, JobEntity job, Status status) {
        this.id = id;
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee = employee;
        this.job = new JobDTO(job);
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

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    public JobDTO getJob() {
        return job;
    }

    public void setJob(JobDTO job) {
        this.job = job;
    }

    public EmployeeDTO getEmployee_id() {
        return employee;
    }

    public void setEmployee_id(EmployeeDTO employee) {
        this.employee = employee;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
