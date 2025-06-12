package com.example.recruitment_website.dtos.employee;

import java.time.LocalDate;

import com.example.recruitment_website.enums.Gender;

public class PersonalDTO {
    // private String uid;
    private String name;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String address;
    // private String image;

    // ✅ Constructor cần thiết cho Hibernate
    public PersonalDTO() {}

    public PersonalDTO(String name, String email, String phone, LocalDate dateOfBirth, Gender gender, String address) {
    // public PersonalDTO(String uid, String name, String email, String phone, LocalDate dateOfBirth, Gender gender, String address) {
        // this.uid = uid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.address = address;
        // this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    // public String getImage() {
    //     return image;
    // }

    // public void setImage(String image) {
    //     this.image = image;
    // }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

}
