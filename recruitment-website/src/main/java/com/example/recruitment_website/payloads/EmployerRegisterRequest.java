package com.example.recruitment_website.payloads;

<<<<<<< HEAD
public class EmployerRegisterRequest {

    private String email;
    private String password;
    private String companyName;
    private String companyAddress;
    private String phoneNumber;

    // Constructors
    public EmployerRegisterRequest() {}

    public EmployerRegisterRequest(String email, String password, String companyName, String companyAddress, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
    }

    // Getters và Setters
=======
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

public class EmployerRegisterRequest {

    private String email;
    private String companyName;
    private MultipartFile companyLogo;
    private String firebaseUid;
    private String companyAddress;
    private String phoneNumber;
    private String taxCode;
    private String industry;
    private String companySize;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) // Định dạng YYYY-MM-DD
    private LocalDate foundedDate;
    private String city;
    private String companyWebsite;
    private String companyDescription;

    public EmployerRegisterRequest() {}

    public EmployerRegisterRequest(String email, String companyName, MultipartFile companyLogo, String companyAddress,
                                   String phoneNumber, String taxCode, String industry, String companySize,
                                   LocalDate foundedDate, String city, String companyWebsite,
                                   String companyDescription, String firebaseUid) {
        this.email = email;
        this.companyName = companyName;
        this.companyLogo = companyLogo;
        this.companyAddress = companyAddress;
        this.phoneNumber = phoneNumber;
        this.taxCode = taxCode;
        this.industry = industry;
        this.companySize = companySize;
        this.foundedDate = foundedDate;
        this.city = city;
        this.companyWebsite = companyWebsite;
        this.companyDescription = companyDescription;
        this.firebaseUid = firebaseUid;
    }

    // Getters và Setters

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

<<<<<<< HEAD
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

<<<<<<< HEAD
=======
    public MultipartFile getCompanyLogo() {
        return companyLogo;
    }

    public void setCompanyLogo(MultipartFile companyLogo) {
        this.companyLogo = companyLogo;
    }

    public String getFirebaseUid() {
        return firebaseUid;
    }

    public void setFirebaseUid(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
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
<<<<<<< HEAD
=======

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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
}
