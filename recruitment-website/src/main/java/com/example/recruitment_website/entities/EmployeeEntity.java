package com.example.recruitment_website.entities;

import com.example.recruitment_website.enums.Degree;
import com.example.recruitment_website.enums.Gender;
import com.example.recruitment_website.enums.JobLevel;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "Employee")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "accountId", unique = true)
    private AccountEntity account;

    @NotNull
    @Size(max = 100)
    private String name;

    @NotNull
    @Size(max = 100)
    private String title;

    @NotNull
    @Enumerated(EnumType.STRING)
    private JobLevel jobLevel;

    @NotNull
    private int exp;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Degree degree;

    @NotNull
    private Boolean country; // false = Vietnam, true = Foreign

    // ➕ Các trường bổ sung dựa theo form UI:

    @NotNull
    @Size(max = 20)
    private String phone;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    @Size(max = 100)
    private String address;

    @NotNull
    @Size(max = 100)
    private String location; // Quốc gia/ Tỉnh thành/ Quận huyện

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    // getter & setter...

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public JobLevel getJobLevel() {
        return jobLevel;
    }

    public void setJobLevel(JobLevel jobLevel) {
        this.jobLevel = jobLevel;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public Degree getDegree() {
        return degree;
    }

    public void setDegree(Degree degree) {
        this.degree = degree;
    }

    public Boolean getCountry() {
        return country;
    }

    public void setCountry(Boolean country) {
        this.country = country;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

}