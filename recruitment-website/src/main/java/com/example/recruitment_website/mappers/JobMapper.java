package com.example.recruitment_website.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.JobEntity;

@Mapper(componentModel = "spring")
public interface JobMapper {

    JobEntity toEntity(JobDTO dto);

    JobDTO toDTO(JobEntity entity);

    List<JobDTO> toDTOList(List<JobEntity> entities);
}
