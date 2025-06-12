package com.example.recruitment_website.dtos;
import java.time.LocalDate;

public class ApplicationDTO {

    private String id;
    private LocalDate createdDate;
    private String cvLink;
    private String employee_id;
    private String employer_id;


    public ApplicationDTO(String id, LocalDate createdDate, String cvLink, String employee_id, String employer_id) {
        this.id = id;
        this.createdDate = createdDate;
        this.cvLink = cvLink;
        this.employee_id = employee_id;
        this.employer_id = employer_id;
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

    public String getcvLink() {
        return cvLink;
    }

    public void setcvLink(String cvLink) {
        this.cvLink = cvLink;
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
}
