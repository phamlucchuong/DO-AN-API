package com.example.recruitment_website.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.mappers.AccountMapper;
import com.example.recruitment_website.repositories.AccountRepository;


@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    public AccountDTO getAccountByEmail(String email){
        AccountEntity accountEntity = accountRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Account not found with email: " + email));

        AccountDTO accountDTO = accountMapper.toDTO(accountEntity);
        return accountDTO;    
    }
    
}
