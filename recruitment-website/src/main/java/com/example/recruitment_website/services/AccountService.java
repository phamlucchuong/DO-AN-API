package com.example.recruitment_website.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.mappers.AccountMapper;
import com.example.recruitment_website.repositories.AccountRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

    private static final List<String> VALID_ROLES = Arrays.asList("Admin", "Employer", "Employee");

    @Transactional
    public AccountDTO createAccount(String email, String role, boolean isDeleted) {

        if (!VALID_ROLES.contains(role)) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }

        AccountEntity account = new AccountEntity();
        account.setEmail(email);
        account.setRole(role);
        account.setIsDeleted(isDeleted);

        accountRepository.save(account);

        return accountMapper.toDTO(account);
    }

    public String getEmailById(String accountId) {
        AccountEntity account = accountRepository.findById(accountId)
            .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));
        return account.getEmail();
    }

}
