package com.example.recruitment_website.services;

import org.springframework.stereotype.Service;

import com.example.recruitment_website.entities.Account;
import com.example.recruitment_website.entities.Employer;
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

@Service
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final AccountRepository accountRepository;

    public EmployerService(EmployerRepository employerRepository, AccountRepository accountRepository) {
        this.employerRepository = employerRepository;
        this.accountRepository = accountRepository;
    }

    public Employer addEmployer(Employer employer) {
        Account account = accountRepository.findById(employer.getAccount().getId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!"Employer".equals(account.getRole())) {
            throw new RuntimeException("Account must have role 'Employer'");
        }

        employer.setAccount(account);
        return employerRepository.save(employer);
    }
}
