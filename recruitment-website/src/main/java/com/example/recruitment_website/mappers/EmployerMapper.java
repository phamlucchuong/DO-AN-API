package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;

import org.mapstruct.factory.Mappers;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.entities.EmployerEntity;

@Mapper(componentModel = "spring")
public interface EmployerMapper {

    EmployerMapper INSTANCE = Mappers.getMapper(EmployerMapper.class);

    EmployerDTO toDTO(EmployerEntity entity);

    EmployerEntity toEntity(EmployerDTO dto);
}
