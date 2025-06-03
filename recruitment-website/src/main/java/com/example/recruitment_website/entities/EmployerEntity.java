package com.example.recruitment_website.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Employer")
public class EmployerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private Integer accountId;

    @NotNull
    @Size(max = 100)
    @Column(length = 100)
    private String companyName;

    @NotNull
    @Size(max = 200)
    @Column(length = 200)
    private String password;

    @NotNull
    @Size(max = 200)
    @Column(length = 200)
    private String companyAddress;

    @NotNull
    @Size(max = 15)
    @Column(length = 15)
    private String phoneNumber;

    @NotNull
    @Column(nullable = false)
    private Boolean isApproved = false;

    public EmployerEntity() {
    }

    public EmployerEntity(Integer accountId, String companyName, String companyAddress, String phoneNumber, Boolean isApproved) {
        this.accountId = accountId;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
        this.isApproved = isApproved;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }
}