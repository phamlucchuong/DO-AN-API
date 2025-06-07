package com.example.recruitment_website.dtos;

public class WorkExperienceDTO {

    private String uid;
    private String company;
    private String role;
    private String period;
    private String description;

    // Không cần chứa `EmployeeEntity` để tránh vòng lặp hoặc mapping nặng nề

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
