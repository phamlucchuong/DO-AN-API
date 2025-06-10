package com.example.recruitment_website.dtos.employee;

public class SkillDTO {
    private String name;
    private int level; // nếu bạn muốn gán điểm, hoặc chỉ là list<String>

    
    public SkillDTO(String name, int level) {
        this.name = name;
        this.level = level;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getLevel() {
        return level;
    }
    public void setLevel(int level) {
        this.level = level;
    }

    
}
