package com.example.recruitment_website.dtos;

import java.time.LocalDate;
import java.util.Date;

import com.example.recruitment_website.entities.EmployerEntity;

public class EmployerDTO {

    private String uid;
    private AccountDTO account;
    // private String password;
    private String companyName; // Tên công ty
    private String companyAddress; // Địa chỉ công ty
    private String phoneNumber; // Số điện thoại công ty
    private Boolean isApproved; // Trạng thái phê duyệt tài khoản
    private String companyDescription; // Mô tả công ty
    private String companyWebsite; // Website công ty
    private String companyLogo; // Logo công ty
    private String industry; // Ngành nghề
    private String companySize; // Quy mô công ty
    private String taxCode; // Mã số thuế
    private LocalDate foundedDate; // Ngày thành lập
    private String status; // Trạng thái tài khoản
    private Date createdAt; // Ngày tạo
    private Date updatedAt; // Ngày cập nhật
    private String city; // Thành phố

    public EmployerDTO() {
    }

    // public EmployerDTO(String uid, AccountDTO account, String companyName, String companyAddress, String phoneNumber,
    //                    Boolean isApproved, String companyDescription, String companyWebsite, String companyLogo,
    //                    String industry, String companySize, String taxCode, LocalDate foundedDate, String status,
    //                    Date createdAt, Date updatedAt, String city) {
    //     this.uid = uid;
    //     this.account = account;
    //     this.companyName = companyName;
    //     this.companyAddress = companyAddress;
    //     this.phoneNumber = phoneNumber;
    //     this.isApproved = isApproved;
    //     this.companyDescription = companyDescription;
    //     this.companyWebsite = companyWebsite;
    //     this.companyLogo = companyLogo;
    //     this.industry = industry;
    //     this.companySize = companySize;
    //     this.taxCode = taxCode;
    //     this.foundedDate = foundedDate;
    //     this.status = status;
    //     this.createdAt = createdAt;
    //     this.updatedAt = updatedAt;
    //     this.city = city;
    // }

    public EmployerDTO(String uid, AccountDTO account, String companyName, String companyAddress, String phoneNumber,
                       Boolean isApproved, String companyDescription, String companyWebsite, String companyLogo,
                       String industry, String companySize, String taxCode, LocalDate foundedDate, String status,
                       Date createdAt, Date updatedAt, String city) {
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

    public EmployerDTO(EmployerEntity employer) {
        this.uid = employer.getUid();
        this.account = new AccountDTO(employer.getAccount());
        this.companyName = employer.getCompanyName();
        this.companyAddress = employer.getCompanyAddress();
        this.phoneNumber = employer.getPhoneNumber();
        this.isApproved = employer.getIsApproved();
        this.companyDescription = employer.getCompanyDescription();
        this.companyWebsite = employer.getCompanyWebsite();
        this.companyLogo = employer.getCompanyLogo();
        this.industry = employer.getIndustry();
        this.companySize = employer.getCompanySize();
        this.taxCode = employer.getTaxCode();
        this.foundedDate = employer.getFoundedDate();
        this.status = employer.getStatus();
        this.createdAt = employer.getCreatedAt();
        this.updatedAt = employer.getUpdatedAt();
        this.city = employer.getCity();
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public AccountDTO getAccount() {
        return account;
    }

    public void setAccount(AccountDTO account) {
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
