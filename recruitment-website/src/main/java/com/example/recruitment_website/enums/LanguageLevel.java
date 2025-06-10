package com.example.recruitment_website.enums;

public enum LanguageLevel {
    BASIC("Basic"),
    FLUENT("Fluent"),
    NATIVE("Native");

    private final String label;

    LanguageLevel(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}

