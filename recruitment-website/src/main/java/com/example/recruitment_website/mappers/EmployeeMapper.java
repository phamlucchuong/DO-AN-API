
package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;
import com.example.recruitment_website.dtos.employee.PersonalDTO;
import com.example.recruitment_website.dtos.employee.ProfileDTO;
import com.example.recruitment_website.entities.EmployeeEntity;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    // EmployeeDTO toDTO(EmployeeEntity entity);

    // EmployeeEntity toEntity(EmployeeDTO dto);


    PersonalDTO toPersonalDTO(EmployeeEntity entity);
    WorkExperienceDTO toCareerObjectiveDTO(EmployeeEntity entity);
    ProfileDTO toProfileDTO(EmployeeEntity entity);
}
