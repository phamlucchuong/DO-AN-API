package com.example.recruitment_website.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Employer")
public class EmployerEntity {

    @Id
    private String uid;

    @OneToOne
    @MapsId
    @JoinColumn(name = "uid")
    private AccountEntity account;

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

    public EmployerEntity(String uid, String companyName, String companyAddress, String phoneNumber, Boolean isApproved) {
        this.uid = uid;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
        this.isApproved = isApproved;
    }

    public String getId() {
        return uid;
    }

    public void setId(String id) {
        this.uid = id;
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