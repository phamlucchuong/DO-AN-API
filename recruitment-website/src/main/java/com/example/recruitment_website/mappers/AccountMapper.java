package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.entities.AccountEntity;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountMapper INSTANCE = Mappers.getMapper(AccountMapper.class);

    AccountDTO toDTO(AccountEntity entity);

    AccountEntity toEntity(AccountDTO dto);
}
