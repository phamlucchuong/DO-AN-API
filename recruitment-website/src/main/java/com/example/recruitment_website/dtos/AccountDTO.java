package com.example.recruitment_website.dtos;

import com.example.recruitment_website.entities.AccountEntity;

public class AccountDTO {

    private String id;
    private String email;
    private String role;
    private Boolean isDeleted;

    public AccountDTO() {
    }

    public AccountDTO(String id, String email, String role, Boolean isDeleted) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.isDeleted = isDeleted;
    }

    public AccountDTO(AccountEntity entity) {
        this.id = entity.getUid();
        this.email = entity.getEmail();
        this.role = entity.getRole();
        this.isDeleted = entity.getIsDeleted();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
