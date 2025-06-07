package com.example.recruitment_website.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

<<<<<<< HEAD
=======
import com.example.recruitment_website.enums.EmploymentType;
import com.example.recruitment_website.enums.JobLevel;

import jakarta.validation.constraints.PositiveOrZero;

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
public class JobDTO {
    private String id;
    private String employerId;
    private String title;
<<<<<<< HEAD
    private String salary;
    private String experience;
    private String department;
    private String description;
    private String requirements;
    private String benefits;
    private LocalDate deadline;
    private Boolean remoteOk;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status; 
    private Integer numberOfVacancies;
    private String jobLevel;
    private String employmentType; 

    public JobDTO() {}

    // getter và setter
=======
    private String salary; // Mức lương (có thể là khoảng lương hoặc mức lương cụ thể)
    private String experience; // Kinh nghiệm làm việc
    private String description;     // Mô tả công việc
    private String requirements; // Yêu cầu công việc
    private String benefits; // Phúc lợi
    private LocalDate deadline; // Ngày hết hạn ứng tuyển
    private LocalDateTime createdAt; // Thêm trường createdAt để lưu thời gian tạo
    private LocalDateTime updatedAt; // Thêm trường updatedAt để lưu thời gian cập nhật
    private String status; // Mặc định trạng thái là "Open"
    @PositiveOrZero(message = "Number of vacancies must be non-negative")
    private Integer numberOfVacancies; // Mặc định là 1 vị trí
    private JobLevel jobLevel; // Cấp độ công việc (Entry, Mid, Senior, v.v.)
    private EmploymentType  employmentType; // Loại hình công việc (toàn thời gian, bán thời gian, thực tập, v.v.)
    private String city; // Thành phố làm việc 
    private String country; // Quốc gia làm việc (thêm mới)
    private String address; // Địa chỉ chi tiết
    private String workingHours; // Thời gian làm việc
    private Boolean isApproved; // Trạng thái phê duyệt (thêm mới)
    private Integer applicationCount; // Số lượt ứng tuyển (thêm mới)

    public JobDTO() {}

    public JobDTO(String id, String employerId, String title, String salary, String experience,
                  String description, String requirements, String benefits, LocalDate deadline,
                  JobLevel jobLevel, EmploymentType employmentType, String city, String country,
                  String address, String workingHours) {
        this.id = id;
        this.employerId = employerId;
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
        this.country = country;
        this.address = address;
        this.workingHours = workingHours;
    }

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
    public String getId() {
        return id;
    }

    public void setId(String id) {
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
<<<<<<< HEAD
    
    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }
=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86

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

<<<<<<< HEAD
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
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

<<<<<<< HEAD
    public Boolean getRemoteOk() {
        return remoteOk;
    }

    public void setRemoteOk(Boolean remoteOk) {
        this.remoteOk = remoteOk;
    }

=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getNumberOfVacancies() {
        return numberOfVacancies;
    }

    public void setNumberOfVacancies(Integer numberOfVacancies) {
        this.numberOfVacancies = numberOfVacancies;
    }

<<<<<<< HEAD
    public String getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(String jobLevel) {
        this.jobLevel = jobLevel;
    }
    
=======
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
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

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
}
