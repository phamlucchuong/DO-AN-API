package com.example.recruitment_website.dtos;

import com.example.recruitment_website.enums.Degree;
import com.example.recruitment_website.enums.Gender;
import com.example.recruitment_website.enums.JobLevel;

import java.time.LocalDate;
import java.util.List;

public class EmployeeDTO {

    private String uid;
    private String name;
    private String title;
    private JobLevel jobLevel;
    private int exp;
    private Degree degree;
    private Boolean country;
    private String phone;
    private LocalDate dateOfBirth;
    private String address;
    private String location;
    private Gender gender;
    private String languages;
    private String summary;
    private String cvLink;
    private String desiredSalary;
    private String startDate;
    private Integer viewsCount;
    private Integer contactCount;
    private List<String> skills;
    private List<String> certifications;

    // Nếu cần ánh xạ các thực thể liên quan, nên dùng DTO riêng thay vì entity
    private List<WorkExperienceDTO> workExperience;
    private List<EducationDTO> education;

    // Getters & Setters

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public JobLevel getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(JobLevel jobLevel) {
        this.jobLevel = jobLevel;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public Boolean getCountry() {
        return country;
    }

    public void setCountry(Boolean country) {
        this.country = country;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCvLink() {
        return cvLink;
    }

    public void setCvLink(String cvLink) {
        this.cvLink = cvLink;
    }

    public String getDesiredSalary() {
        return desiredSalary;
    }

    public void setDesiredSalary(String desiredSalary) {
        this.desiredSalary = desiredSalary;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public Integer getViewsCount() {
        return viewsCount;
    }

    public void setViewsCount(Integer viewsCount) {
        this.viewsCount = viewsCount;
    }

    public Integer getContactCount() {
        return contactCount;
    }

    public void setContactCount(Integer contactCount) {
        this.contactCount = contactCount;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getCertifications() {
        return certifications;
    }

    public void setCertifications(List<String> certifications) {
        this.certifications = certifications;
    }

    public List<WorkExperienceDTO> getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(List<WorkExperienceDTO> workExperience) {
        this.workExperience = workExperience;
    }

    public List<EducationDTO> getEducation() {
        return education;
    }

    public void setEducation(List<EducationDTO> education) {
        this.education = education;
    }
}
