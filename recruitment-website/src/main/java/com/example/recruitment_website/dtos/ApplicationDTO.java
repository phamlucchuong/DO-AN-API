package com.example.recruitment_website.dtos;
import java.time.LocalDate;

public class ApplicationDTO {

    private String id;
    private LocalDate createdDate;
    private String cvLink;
    private String employee_id;
    private String employer_id;
    private Integer job_id;


    public ApplicationDTO() {
    }

    

    public ApplicationDTO(String id, LocalDate createdDate, String cvLink, String employee_id, String employer_id,
            Integer job_id) {
        this.id = id;
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee_id = employee_id;
        this.employer_id = employer_id;
        this.job_id = job_id;
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

    public void setEmployee_id(String employee_id) {
        this.employee_id = employee_id;
    }

    public String getEmployer_id() {
        return employer_id;
    }

    public void setEmployer_id(String employer_id) {
        this.employer_id = employer_id;
    }

    public Integer getJob_id() {
        return job_id;
    }

    public void setJob_id(Integer job_id) {
        this.job_id = job_id;
    }
}
