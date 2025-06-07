package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import com.example.recruitment_website.dtos.EducationDTO;
import com.example.recruitment_website.entities.EducationEntity;

@Mapper(componentModel = "spring")
public interface EducationMapper {
    EducationDTO toDTO(EducationEntity entity);
    EducationEntity toEntity(EducationDTO dto);
}
