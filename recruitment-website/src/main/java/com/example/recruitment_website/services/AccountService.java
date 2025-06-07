package com.example.recruitment_website.services;

<<<<<<< HEAD
import java.util.Arrays;
import java.util.List;
=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.mappers.AccountMapper;
import com.example.recruitment_website.repositories.AccountRepository;

<<<<<<< HEAD
import jakarta.transaction.Transactional;
=======
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

<<<<<<< HEAD
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

=======
    public AccountDTO getAccountByEmail(String email){
        AccountEntity accountEntity = accountRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Account not found with email: " + email));

        AccountDTO accountDTO = accountMapper.toDTO(accountEntity);
        return accountDTO;    
    }
    
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
}
