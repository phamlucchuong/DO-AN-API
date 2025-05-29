package com.example.recruitment_website.dtos;

public class AccountDTO {

    private Integer id;
    private String email;
    private String role;
    private Boolean isDeleted;

    // Constructor mặc định
    public AccountDTO() {}

    // Constructor từ Entity Account (dùng khi chuyển đổi)
    public AccountDTO(com.example.recruitment_website.entities.Account account) {
        // this.id = account.getId();
        this.email = account.getEmail();
        this.role = account.getRole();
        this.isDeleted = account.getIsDeleted();
    }

    // Getter và Setter
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
