package com.example.recruitment_website.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;

import com.example.recruitment_website.dtos.ApplicationApprovalDTO;
import com.example.recruitment_website.entities.ApplicationApprovalEntity;
import com.example.recruitment_website.entities.LanguageEntity;
import com.example.recruitment_website.entities.SkillEntity;

@Mapper(componentModel = "spring")
public interface ApplicationApprovalMapper {

    ApplicationApprovalDTO toDTO(ApplicationApprovalEntity entity);

    ApplicationApprovalEntity toEntity(ApplicationApprovalDTO dto);

    default List<String> skillEntitiesToStrings(List<SkillEntity> skills) {
        if (skills == null) return null;
        return skills.stream().map(SkillEntity::getName).collect(Collectors.toList());
    }

    // Convert List<String> -> List<SkillEntity>
    default List<SkillEntity> stringsToSkillEntities(List<String> names) {
        if (names == null) return null;
        return names.stream().map(name -> {
            SkillEntity skill = new SkillEntity();
            skill.setName(name);
            return skill;
        }).collect(Collectors.toList());
    }

    // Convert List<LanguageEntity> -> List<String>
    default List<String> languageEntitiesToStrings(List<LanguageEntity> languages) {
        if (languages == null) return null;
        return languages.stream().map(LanguageEntity::getName).collect(Collectors.toList());
    }

    // Convert List<String> -> List<LanguageEntity>
    default List<LanguageEntity> stringsToLanguageEntities(List<String> names) {
        if (names == null) return null;
        return names.stream().map(name -> {
            LanguageEntity lang = new LanguageEntity();
            lang.setName(name);
            return lang;
        }).collect(Collectors.toList());
    }
}
