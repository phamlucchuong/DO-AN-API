package com.example.recruitment_website.dtos.employee;

public class SkillDTO {
    private String id;
    private String name;
    private int level; // nếu bạn muốn gán điểm, hoặc chỉ là list<String>

    
    public SkillDTO(String id, String name, int level) {
        this.id = id;
        this.name = name;
        this.level = level;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
