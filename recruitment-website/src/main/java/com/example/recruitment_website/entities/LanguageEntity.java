package com.example.recruitment_website.entities;

import java.util.UUID;

import com.example.recruitment_website.dtos.employee.LanguageDTO;
import com.example.recruitment_website.enums.LanguageLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Language")
public class LanguageEntity {
    @Id
    private String uid;

    @Column(columnDefinition = "nvarchar(50)")
    private String name;

    @Enumerated(EnumType.STRING)
    private LanguageLevel level;    


    @ManyToOne
    @JoinColumn(name = "employee_uid")
    private EmployeeEntity employee;

    public LanguageEntity() {
        super();
    }

    public LanguageEntity(LanguageDTO dto) {
        this.uid = UUID.randomUUID().toString();
        this.name = dto.getName();
        this.level = dto.getLevel();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public LanguageLevel getLevel() {
        return level;
    }

    public void setLevel(LanguageLevel level) {
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
