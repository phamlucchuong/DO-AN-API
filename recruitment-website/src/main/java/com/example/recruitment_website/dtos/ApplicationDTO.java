package com.example.recruitment_website.dtos;
import java.time.LocalDate;

import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.enums.Status;

public class ApplicationDTO {

    private String id;
    private LocalDate createdDate;
    private String cvLink;
    private String employee_id;
    private JobDTO job;
    private Status status;


    public ApplicationDTO() {
    }

    

    public ApplicationDTO(String id, LocalDate createdDate, String cvLink, String employee_id, JobEntity job, Status status) {
        this.id = id;
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee_id = employee_id;
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

    public String getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_uid(String employee_id) {
        this.employee_id = employee_id;
    }

    public JobDTO getJob() {
        return job;
    }

    public void setJob(JobDTO job) {
        this.job = job;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
