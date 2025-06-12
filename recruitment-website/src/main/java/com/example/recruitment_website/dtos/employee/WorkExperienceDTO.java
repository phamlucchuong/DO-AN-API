package com.example.recruitment_website.dtos.employee;

public class WorkExperienceDTO {
    private String uid;
    private String role;
    private String company;
    private String period;
    private String description;


    public WorkExperienceDTO(String uid, String role, String company, String period, String description) {
        this.uid = uid;
        this.role = role;
        this.company = company;
        this.period = period;
        this.description = description;
    }
    public String getUid() {
        return uid;
    }
    public void setUid(String uid) {
        this.uid = uid;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public String getPeriod() {
        return period;
    }
    public void setPeriod(String period) {
        this.period = period;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    
}
