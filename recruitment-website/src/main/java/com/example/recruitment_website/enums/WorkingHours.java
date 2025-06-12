package com.example.recruitment_website.enums;

public enum WorkingHours {
    EIGHTTOSEVENTEEN("Từ 8AM đến 17PM"),
    NINETOEIGHTEEN("Từ 9AM đến 18PM");

    private final String displayName;

    WorkingHours(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
