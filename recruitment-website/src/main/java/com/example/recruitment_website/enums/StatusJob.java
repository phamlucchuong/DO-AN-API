package com.example.recruitment_website.enums;

public enum StatusJob {
    OPEN("Đang tuyển dụng"),
    URGENT("Cần gấp"),
    CLOSED("Hết tuyển dụng");

    private final String displayName;

    StatusJob(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
