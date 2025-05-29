package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    // Define custom query methods if needed
    
}
