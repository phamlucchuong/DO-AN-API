package com.example.recruitment_website.dtos;

public class EmployerDTO {
    private Integer id;
    private Integer accountId; 
    private String password;
    private String companyName;
    private String companyAddress;
    private String phoneNumber;
    private boolean isApproved;

    public EmployerDTO() {}

    public EmployerDTO(Integer id, Integer accountId, String companyName, String companyAddress, String phoneNumber) {
        this.id = id;
        this.accountId = accountId;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setIsApproved(boolean isApproved) {
        this.isApproved = isApproved;
    }
}
