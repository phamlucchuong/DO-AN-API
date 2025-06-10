package com.example.recruitment_website.dtos.employee;

import com.example.recruitment_website.enums.LanguageLevel;

public class LanguageDTO {
    private String name;
    private LanguageLevel level; // nếu bạn muốn gán điểm, hoặc chỉ là list<String>

    public LanguageDTO(String name, LanguageLevel level) {
        this.name = name;
        this.level = level;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public LanguageLevel getLevel() {
        return level;
    }
    public void setLevel(LanguageLevel level) {
        this.level = level;
    }
}
