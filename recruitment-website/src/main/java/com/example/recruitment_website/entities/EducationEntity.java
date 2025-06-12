package com.example.recruitment_website.entities;

import java.util.UUID;

import com.example.recruitment_website.dtos.employee.EducationDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Education")
public class EducationEntity {
    @Id
    private String uid;

    @Column(columnDefinition = "nvarchar(50)")
    private String school;    

    @Column(columnDefinition = "nvarchar(50)")
    private String major;

    @Column(columnDefinition = "nvarchar(50)")
    private String period;


    @ManyToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    public EducationEntity() {
        super();
    }

    public EducationEntity(EducationDTO dto) {
        this.uid = UUID.randomUUID().toString();
        this.school = dto.getSchool();
        this.major = dto.getMajor();
        this.period = dto.getPeriod();
    }

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

    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    
}
