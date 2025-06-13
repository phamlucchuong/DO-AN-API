package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.payloads.ApplicationRespone;

@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, JobMapper.class})
public interface ApplicationResponseMapper {
    ApplicationRespone toResponse(ApplicationEntity entity);
}

