package com.example.recruitment_website.mappers;

import org.mapstruct.Mapper;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.entities.AccountEntity;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDTO toDTO(AccountEntity entity);

    AccountEntity toEntity(AccountDTO dto);
}
