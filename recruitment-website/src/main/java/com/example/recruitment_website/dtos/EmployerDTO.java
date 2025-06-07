package com.example.recruitment_website.dtos;

import com.example.recruitment_website.entities.EmployerEntity;

public class EmployerDTO {

    private String uid;
    private String email; // từ AccountEntity
    private String companyName;
    private String companyAddress;
    private String phoneNumber;
    private Boolean isApproved;

    public EmployerDTO() {
    }

    public EmployerDTO(String uid, String email, String companyName, String companyAddress, String phoneNumber,
            Boolean isApproved) {
        this.uid = uid;
        this.email = email;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
        this.isApproved = isApproved;
    }

    public EmployerDTO toDTO(EmployerEntity entity) {
        return new EmployerDTO(
                entity.getId(),
                entity.getAccount() != null ? entity.getAccount().getEmail() : null,
                entity.getCompanyName(),
                entity.getCompanyAddress(),
                entity.getPhoneNumber(),
                entity.getIsApproved());
    }

    // Getters and setters

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
