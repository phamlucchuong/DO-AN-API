package com.example.recruitment_website.entities;

import java.time.LocalDate;
import java.util.Date;

import com.example.recruitment_website.enums.EmploymentType;
import com.example.recruitment_website.enums.JobLevel;
import com.example.recruitment_website.enums.StatusJob;
import com.example.recruitment_website.enums.WorkingHours;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Job")
@Getter
@Setter
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "employer_uid", referencedColumnName = "uid", nullable = false)
    private EmployerEntity employer;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String title;

    @Column(columnDefinition = "NVARCHAR(50)")
    private String salary;

    @Column(columnDefinition = "NVARCHAR(100)")
    private String experience;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String requirements;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String benefits;

    private LocalDate deadline;

    @Column(nullable = false, updatable = false)
    private Date createdAt;

    private Date updatedAt;

    @Enumerated(EnumType.STRING)
    private StatusJob status;

    private Integer numberOfVacancies;

    @Enumerated(EnumType.STRING)
    private JobLevel jobLevel;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @Column(columnDefinition = "NVARCHAR(100)")
    private String city;

    @Column(columnDefinition = "NVARCHAR(200)")
    private String address;

    @Enumerated(EnumType.STRING)
    private WorkingHours workingHours;

    @Column(nullable = false)
    private Boolean isApproved;

    @Column(nullable = false)
    private Integer applicationCount;

    @PrePersist
    protected void onCreate() {
        Date now = new Date();
        createdAt = now;
        updatedAt = now;
        if (status == null) {
            status = StatusJob.OPEN;
        }
        if (numberOfVacancies == null) {
            numberOfVacancies = 1;
        }
        if (isApproved == null) {
            isApproved = false;
        }
        if (applicationCount == null) {
            applicationCount = 0;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    public JobEntity() {}

    public JobEntity(Integer id, EmployerEntity employer, String title, String salary, String experience,
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

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EmployerEntity getEmployer() {
        return employer;
    }

    public void setEmployer(EmployerEntity employer) {
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
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

    public void setJobLevelе(JobLevel jobLevel) {
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