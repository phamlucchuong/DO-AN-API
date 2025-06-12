package com.example.recruitment_website.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.recruitment_website.enums.EmploymentType;
import com.example.recruitment_website.enums.JobLevel;
import com.example.recruitment_website.enums.StatusJob;
import com.example.recruitment_website.enums.WorkingHours;

import jakarta.validation.constraints.PositiveOrZero;

public class JobDTO {
    private Integer id;
    private EmployerDTO employer;
    private String title;
    private String salary; // Mức lương (có thể là khoảng lương hoặc mức lương cụ thể)
    private String experience; // Kinh nghiệm làm việc
    private String description;     // Mô tả công việc
    private String requirements; // Yêu cầu công việc
    private String benefits; // Phúc lợi
    private LocalDate deadline; // Ngày hết hạn ứng tuyển
    private LocalDateTime createdAt; // Thêm trường createdAt để lưu thời gian tạo
    private LocalDateTime updatedAt; // Thêm trường updatedAt để lưu thời gian cập nhật
    private StatusJob status; // Mặc định trạng thái là "Open"
    @PositiveOrZero(message = "Number of vacancies must be non-negative")
    private Integer numberOfVacancies; // Mặc định là 1 vị trí
    private JobLevel jobLevel; // Cấp độ công việc (Entry, Mid, Senior, v.v.)
    private EmploymentType  employmentType; // Loại hình công việc (toàn thời gian, bán thời gian, thực tập, v.v.)
    private String city; // Thành phố làm việc 
    private String address; // Địa chỉ chi tiết
    private WorkingHours workingHours; // Thời gian làm việc
    private Boolean isApproved; // Trạng thái phê duyệt (thêm mới)
    private Integer applicationCount; // Số lượt ứng tuyển (thêm mới)

    public JobDTO() {}

    public JobDTO(Integer id, EmployerDTO employer, String title, String salary, String experience,
                  String description, String requirements, String benefits, LocalDate deadline,
                  JobLevel jobLevel, EmploymentType employmentType, String city,
                  String address, WorkingHours workingHours) {
        this.id = id;
        this.employer = employer;
        this.title = title;
        this.salary = salary;
        this.experience = experience;
        this.description = description;
        this.requirements = requirements;
        this.benefits = benefits;
        this.deadline = deadline;
        this.jobLevel = jobLevel;
        this.employmentType = employmentType;
        this.city = city;
        this.address = address;
        this.workingHours = workingHours;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EmployerDTO getEmployer() {
        return employer;
    }

    public void setEmployer(EmployerDTO employer) {
        this.employer = employer;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public StatusJob getStatus() {
        return status;
    }

    public void setStatus(StatusJob status) {
        this.status = status;
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

    public void setJobLevel(JobLevel jobLevel) {
        this.jobLevel = jobLevel;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
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

    public void setWorkingHours(WorkingHours workingHours) {
        this.workingHours = workingHours;
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
