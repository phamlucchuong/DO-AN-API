package com.example.recruitment_website.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import com.google.firebase.database.annotations.NotNull;

import java.util.List;

@Entity
@Table(name = "employer")
public class EmployerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "accountId", unique = true)
    private AccountEntity accountEntity;

    @NotNull
    @Size(max = 100)
    @Column(length = 100)
    private String companyName;

    @Lob
    private String logo;

    private int jobCount;

    private String industry;

    private double rating;

    @NotNull
    @Size(max = 200)
    @Column(length = 200)
    private String companyAddress;

    @NotNull
    @Size(max = 15)
    @Column(length = 15)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JobEntity> jobs;

    @NotNull
    @Column(nullable = false)
    private Boolean isApproved = false;

    public EmployerEntity() {}

    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public AccountEntity getAccountEntity() { return accountEntity; }

    public void setAccountEntity(AccountEntity accountEntity) { this.accountEntity = accountEntity; }

    public String getCompanyName() { return companyName; }

    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getLogo() { return logo; }

    public void setLogo(String logo) { this.logo = logo; }

    public int getJobCount() { return jobCount; }

    public void setJobCount(int jobCount) { this.jobCount = jobCount; }

    public String getIndustry() { return industry; }

    public void setIndustry(String industry) { this.industry = industry; }

    public double getRating() { return rating; }

    public void setRating(double rating) { this.rating = rating; }

    public String getCompanyAddress() { return companyAddress; }

    public void setCompanyAddress(String companyAddress) { this.companyAddress = companyAddress; }

    public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public List<JobEntity> getJobs() { return jobs; }

    public void setJobs(List<JobEntity> jobs) { this.jobs = jobs; }

    public Boolean getIsApproved() { return isApproved; }

    public void setIsApproved(Boolean isApproved) { this.isApproved = isApproved; }
}
