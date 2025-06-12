package com.example.recruitment_website.entities;

import java.util.UUID;

import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Experience")
public class WorkExperienceEntity {
    @Id
    private String uid;

    @Column(columnDefinition = "nvarchar(100)")
    private String role;

    @Column(columnDefinition = "nvarchar(100)")
    private String company;

    @Column(columnDefinition = "nvarchar(50)")
    private String period;

    @Column(columnDefinition = "nvarchar(50)")
    private String description;

    @ManyToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    public WorkExperienceEntity() {
    }
    
    public WorkExperienceEntity(WorkExperienceDTO dto) {
        this.uid = UUID.randomUUID().toString();
        this.role = dto.getRole();
        this.company = dto.getCompany();
        this.period = dto.getPeriod();
        this.description = dto.getDescription();
    }   
    

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

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    
}
