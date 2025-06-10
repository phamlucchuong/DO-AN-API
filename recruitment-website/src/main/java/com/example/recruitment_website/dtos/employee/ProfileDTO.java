package com.example.recruitment_website.dtos.employee;

import java.util.List;

import com.example.recruitment_website.entities.LanguageEntity;


public class ProfileDTO {
    private PersonalDTO personal;
    private String careerObjective;
    private List<WorkExperienceDTO> workExperience;
    private List<EducationDTO> education;
    private List<SkillDTO> skills;
    private List<LanguageEntity> languages;
    private String cvLink;
    private Integer viewsCount;
    private Integer contactCount;


    public ProfileDTO(PersonalDTO personal, String careerObjective, List<WorkExperienceDTO> workExperience,
            List<EducationDTO> education, List<SkillDTO> skills, List<LanguageEntity> languages,
            String cvLink, Integer viewsCount, Integer contactCount) {
        this.personal = personal;
        this.careerObjective = careerObjective;
        this.workExperience = workExperience;
        this.education = education;
        this.skills = skills;
        this.languages = languages;
        this.cvLink = cvLink;
        this.viewsCount = viewsCount;
        this.contactCount = contactCount;
    }




    public PersonalDTO getPersonal() {
        return personal;
    }
    public void setPersonal(PersonalDTO personal) {
        this.personal = personal;
    }
    public String getCareerObjective() {
        return careerObjective;
    }
    public void setCareerObjective(String careerObjective) {
        this.careerObjective = careerObjective;
    }
    public List<WorkExperienceDTO> getWorkExperience() {
        return workExperience;
    }
    public void setWorkExperience(List<WorkExperienceDTO> workExperience) {
        this.workExperience = workExperience;
    }
    public List<EducationDTO> getEducation() {
        return education;
    }
    public void setEducation(List<EducationDTO> education) {
        this.education = education;
    }
    public List<SkillDTO> getSkills() {
        return skills;
    }
    public void setSkills(List<SkillDTO> skills) {
        this.skills = skills;
    }
    public List<LanguageEntity> getLanguages() {
        return languages;
    }
    public void setLanguages(List<LanguageEntity> languages) {
        this.languages = languages;
    }
    public String getCvLink() {
        return cvLink;
    }
    public void setCvLink(String cvLink) {
        this.cvLink = cvLink;
    }
    public Integer getViewsCount() {
        return viewsCount;
    }
    public void setViewsCount(Integer viewsCount) {
        this.viewsCount = viewsCount;
    }
    public Integer getContactCount() {
        return contactCount;
    }
    public void setContactCount(Integer contactCount) {
        this.contactCount = contactCount;
    }


    
}
