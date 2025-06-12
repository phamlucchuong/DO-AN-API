package com.example.recruitment_website.payloads;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

public class EmployerProfileUpdateRequest {
    private String companyName;
    private String companyAddress;
    private String phoneNumber;
    private String taxCode;
    private String industry;
    private String companySize;
    private LocalDate foundedDate;
    private String companyDescription;
    private String companyWebsite;
    private String city;
    private MultipartFile companyLogo;

    // Getters and Setters
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

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
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

    public LocalDate getFoundedDate() {
        return foundedDate;
    }

    public void setFoundedDate(LocalDate foundedDate) {
        this.foundedDate = foundedDate;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public MultipartFile getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(MultipartFile companyLogo) {
        this.companyLogo = companyLogo;
    }

    @Override
    public String toString() {
        return "EmployerProfileUpdateRequest{" +
                "companyName='" + companyName + '\'' +
                ", companyAddress='" + companyAddress + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", taxCode='" + taxCode + '\'' +
                ", industry='" + industry + '\'' +
                ", companySize=" + companySize +
                ", foundedDate=" + foundedDate +
                ", companyDescription='" + companyDescription + '\'' +
                ", companyWebsite='" + companyWebsite + '\'' +
                ", city='" + city + '\'' +
                ", companyLogo=" + (companyLogo != null ? companyLogo.getOriginalFilename() : null) +
                '}';
    }
}