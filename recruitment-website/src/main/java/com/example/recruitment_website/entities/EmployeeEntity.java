package com.example.recruitment_website.entities;

import com.example.recruitment_website.enums.Degree;
import com.example.recruitment_website.enums.Gender;
import com.example.recruitment_website.enums.JobLevel;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Employee")
public class EmployeeEntity {

    @Id
    private String uid;

    @OneToOne
    @MapsId
    @JoinColumn(name = "uid")
    private AccountEntity account;

    @NotNull
    @Size(max = 255)
    @Column(columnDefinition = "nvarchar(255)")
    private String name;

    @NotNull
    @Size(max = 50)
    private String email;

    @NotNull
    @Size(max = 20)
    private String phone;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    @Size(max = 100)
    @Column(columnDefinition = "nvarchar(100)")
    private String address;
    
    @Size(max = 50)
    @Column(columnDefinition = "nvarchar(50)")
    private String location;

    private String image;

    @Size(max = 100)
    private String title;

    @Enumerated(EnumType.STRING)
    private JobLevel jobLevel;

    private int exp;

    @Enumerated(EnumType.STRING)
    private Degree degree;

    private Boolean country;

    @Column(columnDefinition = "nvarchar(max)")
    private String careerObjective;

    private String cvLink;

    private String desiredSalary;

    private String startDate;

    private Integer viewsCount;

    private Integer contactCount;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SkillEntity> skills;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LanguageEntity> languages;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkExperienceEntity> workExperience;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EducationEntity> education;

    // Getters and Setters

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompanyLogo() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCareerObjective() {
        return careerObjective;
    }

    public void setCareerObjective(String careerObjective) {
        this.careerObjective = careerObjective;
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

    public List<LanguageEntity> getLanguages() {
        return languages;
    }

    public void setLanguages(List<LanguageEntity> languages) {
        this.languages = languages;
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

    public List<SkillEntity> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillEntity> skills) {
        this.skills = skills;
    }

    public List<WorkExperienceEntity> getWorkExperience() {
        return workExperience;
    }

    public void setWorkExperience(List<WorkExperienceEntity> workExperience) {
        this.workExperience = workExperience;
    }

    public List<EducationEntity> getEducation() {
        return education;
    }

    public void setEducation(List<EducationEntity> education) {
        this.education = education;
    }
}
