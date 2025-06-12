package com.example.recruitment_website.entities;


import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Employer")
public class EmployerEntity {

    @Id
    @Column(name = "uid") // hoặc tên thật trong DB
    private String uid;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    private AccountEntity account;

    @NotNull
    @Size(max = 100)
    @Column(columnDefinition = "NVARCHAR(100)")
    private String companyName;

    @NotNull
    @Size(max = 200)
    @Column(columnDefinition = "NVARCHAR(200)")
    private String companyAddress;

    @NotNull
    @Size(max = 15)
    @Column(columnDefinition = "NVARCHAR(15)")
    private String phoneNumber;

    @NotNull
    @Column(columnDefinition = "BIT DEFAULT 0")
    private Boolean isApproved = false;

    @NotNull
    @Size(max = 500)
    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String companyDescription;

    @Size(max = 255)
    @Column(columnDefinition = "NVARCHAR(255)")
    private String companyWebsite;

    @Size(max = 255)
    @Column(columnDefinition = "NVARCHAR(255)")
    private String companyLogo;

    @Size(max = 100)
    @Column(columnDefinition = "NVARCHAR(100)")
    private String industry;

    @Size(max = 50)
    @Column(columnDefinition = "NVARCHAR(50)")
    private String companySize;

    @NotNull
    @Size(max = 50)
    @Column(columnDefinition = "NVARCHAR(50)", unique = true)
    private String taxCode;

    private LocalDate foundedDate;

    @Size(max = 50)
    @Column(columnDefinition = "NVARCHAR(50)")
    private String status;

    @Size(max = 100)
    @Column(columnDefinition = "NVARCHAR(100)")
    private String city;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        updatedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }

    public EmployerEntity() {}

    public EmployerEntity(String uid, AccountEntity account, String companyName, String companyAddress,
                         String phoneNumber, Boolean isApproved, String companyDescription, String companyWebsite,
                         String companyLogo, String industry, String companySize, String taxCode,
                         LocalDate foundedDate, String status, Date createdAt, Date updatedAt, String city) {
        this.uid = uid;
        this.account = account;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
        this.isApproved = isApproved;
        this.companyDescription = companyDescription;
        this.companyWebsite = companyWebsite;
        this.companyLogo = companyLogo;
        this.industry = industry;
        this.companySize = companySize;
        this.taxCode = taxCode;
        this.foundedDate = foundedDate;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.city = city;
    }

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    public String getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(String companyLogo) {
        this.companyLogo = companyLogo;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public LocalDate getFoundedDate() {
        return foundedDate;
    }

    public void setFoundedDate(LocalDate foundedDate) {
        this.foundedDate = foundedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}