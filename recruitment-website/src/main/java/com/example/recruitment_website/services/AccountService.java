package com.example.recruitment_website.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.entities.Account;
import com.example.recruitment_website.repositories.AccountRepository;

@Service
public class AccountService {
     @Autowired
    private AccountRepository accountRepository;

     public Account createAccount(Account account) {

        return accountRepository.save(account);
    }

}
