
package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import com.example.recruitment_website.dtos.EmployeeDTO;
import com.example.recruitment_website.entities.EmployeeEntity;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    EmployeeDTO toDTO(EmployeeEntity entity);

    EmployeeEntity toEntity(EmployeeDTO dto);
}
