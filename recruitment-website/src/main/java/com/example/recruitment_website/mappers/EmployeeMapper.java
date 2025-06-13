
// package com.example.recruitment_website.mappers;

// import org.mapstruct.Mapper;
// import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;
// import com.example.recruitment_website.dtos.employee.PersonalDTO;
// import com.example.recruitment_website.dtos.employee.ProfileDTO;
// import com.example.recruitment_website.entities.EmployeeEntity;

// @Mapper(componentModel = "spring")
// public interface EmployeeMapper {

//     // EmployeeDTO toDTO(EmployeeEntity entity);

//     // EmployeeEntity toEntity(EmployeeDTO dto);


//     PersonalDTO toPersonalDTO(EmployeeEntity entity);
//     WorkExperienceDTO toCareerObjectiveDTO(EmployeeEntity entity);
//     ProfileDTO toProfileDTO(EmployeeEntity entity);
// }

package com.example.recruitment_website.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;
import com.example.recruitment_website.dtos.employee.PersonalDTO;
import com.example.recruitment_website.dtos.employee.ProfileDTO;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.LanguageEntity;
import com.example.recruitment_website.entities.SkillEntity;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    // Mapping các phần cụ thể từ EmployeeEntity sang DTO con
    PersonalDTO toPersonalDTO(EmployeeEntity entity);
    WorkExperienceDTO toCareerObjectiveDTO(EmployeeEntity entity);
    ProfileDTO toProfileDTO(EmployeeEntity entity);

    // Convert List<SkillEntity> -> List<String>
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

