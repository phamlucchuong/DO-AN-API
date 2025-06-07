package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import com.example.recruitment_website.dtos.WorkExperienceDTO;
import com.example.recruitment_website.entities.WorkExperienceEntity;

@Mapper(componentModel = "spring")
public interface WorkExperienceMapper {
    WorkExperienceDTO toDTO(WorkExperienceEntity entity);
    WorkExperienceEntity toEntity(WorkExperienceDTO dto);
}
