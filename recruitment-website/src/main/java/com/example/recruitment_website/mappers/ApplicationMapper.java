package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;

import com.example.recruitment_website.dtos.ApplicationDTO;
import com.example.recruitment_website.entities.ApplicationEntity;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class})
public interface ApplicationMapper {

    ApplicationDTO toDTO(ApplicationEntity entity);

    ApplicationEntity toEntity(ApplicationDTO dto);
}
