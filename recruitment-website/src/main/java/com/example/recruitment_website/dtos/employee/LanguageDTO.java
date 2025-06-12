package com.example.recruitment_website.dtos.employee;

import com.example.recruitment_website.enums.LanguageLevel;

public class LanguageDTO {
    private String uid;
    private String name;
    private LanguageLevel level; // nếu bạn muốn gán điểm, hoặc chỉ là list<String>

    public LanguageDTO(String uid, String name, LanguageLevel level) {
        this.uid = uid;
        this.name = name;
        this.level = level;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
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
