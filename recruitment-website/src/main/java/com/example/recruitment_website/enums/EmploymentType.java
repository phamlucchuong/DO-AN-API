package com.example.recruitment_website.enums;

public enum EmploymentType {
    FULL_TIME("Toàn thời gian"),
    PART_TIME("Bán thời gian"),
    CONTRACT("Hợp đồng"),
    INTERNSHIP("Thực tập"),
    FREELANCE("Tự do");

    private final String displayName;

    EmploymentType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}