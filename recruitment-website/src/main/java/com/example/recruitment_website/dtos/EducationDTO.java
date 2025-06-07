package com.example.recruitment_website.dtos;

public class EducationDTO {

    private String uid;
    private String school;
    private String major;
    private String period;

    // Không chứa EmployeeEntity để tránh vòng lặp hoặc dư thừa dữ liệu

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
}
