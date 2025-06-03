package com.example.recruitment_website.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Account")
public class AccountEntity {

    @Id
    @Column(name = "id")
    private String id;

    @NotNull
    @Size(max = 25)
    @Column(unique = true)
    private String email;

    @NotNull
    @Size(max = 20)
    @Column(columnDefinition = "NVARCHAR(10) CHECK (role IN ('Admin', 'Employer', 'Employee'))")
    private String role;


    @Column(nullable = false)
    private Boolean isDeleted;

    public String getUid() {
        return id;
    }

    public void setUid(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
