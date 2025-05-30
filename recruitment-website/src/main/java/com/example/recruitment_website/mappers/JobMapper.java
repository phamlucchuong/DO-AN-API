package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.JobEntity;

@Mapper(componentModel = "spring")
public interface JobMapper {

    JobMapper INSTANCE = Mappers.getMapper(JobMapper.class);

    JobEntity toEntity(JobDTO dto);

    JobDTO toDTO(JobEntity entity);
}
