package com.example.recruitment_website.entities;

import java.util.UUID;

import com.example.recruitment_website.dtos.employee.SkillDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Skill")
public class SkillEntity {
    @Id
    private String uid;

    @Column(columnDefinition = "nvarchar(50)")
    private String name;
    private int level;

    @ManyToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    public SkillEntity() {
        super();
    }

    public SkillEntity(SkillDTO dto) {
        this.uid = UUID.randomUUID().toString();
        this.name = dto.getName();
        this.level = dto.getLevel();
    }

    public SkillEntity(String name, int level, EmployeeEntity employee) {
        this.uid = UUID.randomUUID().toString();
        this.name = name;
        this.level = level;
        this.employee = employee;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public EmployeeEntity getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeEntity employee) {
        this.employee = employee;
    }

    
}
