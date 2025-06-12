package com.example.recruitment_website.payloads;

import java.time.LocalDate;

import com.example.recruitment_website.enums.EmploymentType;
import com.example.recruitment_website.enums.JobLevel;
import com.example.recruitment_website.enums.StatusJob;
import com.example.recruitment_website.enums.WorkingHours;

import jakarta.validation.constraints.PositiveOrZero;

public class JobRequest {

    private Integer id;
    private String employerId;  // lấy từ token payload.user_id, kiểu Integer
    private String title;
    private String salary;           // trường salaryRange đổi thành salary cho khớp
    private String experience;
    private String description;
    private String requirements;
    private String benefits;
    private LocalDate deadline;         // có thể dùng String (định dạng ISO date) hoặc LocalDate tùy mapping
    private StatusJob status;           // trạng thái (mặc định "Open")
    @PositiveOrZero(message = "Number of vacancies must be non-negative")
    private Integer numberOfVacancies;
    private JobLevel jobLevel;         // String hoặc enum (JobLevel), tùy cách xử lý ở backend
    private EmploymentType employmentType;   // String hoặc enum (EmploymentType)
    private String city;
    private String address;
    private WorkingHours workingHours;
    private Boolean isApproved;      // mặc định false
    private Integer applicationCount;

    public JobRequest() {
    }

    // getter và setter cho tất cả các field
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getBenefits() {
        return benefits;
    }

    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public StatusJob getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status != null ? StatusJob.valueOf(status.toUpperCase()) : StatusJob.OPEN;
    }

    public Integer getNumberOfVacancies() {
        return numberOfVacancies;
    }

    public void setNumberOfVacancies(Integer numberOfVacancies) {
        this.numberOfVacancies = numberOfVacancies;
    }

    public JobLevel getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(String jobLevel) {
        this.jobLevel = jobLevel != null ? JobLevel.valueOf(jobLevel.toUpperCase()) : null;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType != null ? EmploymentType.valueOf(employmentType.toUpperCase()) : null;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public WorkingHours getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours != null ? WorkingHours.valueOf(workingHours.replace(" ", "_").toUpperCase()) : null;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }
    
    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public Integer getApplicationCount() {
        return applicationCount;
    }

    public void setApplicationCount(Integer applicationCount) {
        this.applicationCount = applicationCount;
    }
}
