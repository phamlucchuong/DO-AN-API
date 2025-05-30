package com.example.recruitment_website.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    // Define custom query methods if needed
    boolean existsByEmail(String email);
    Optional<AccountEntity> findByEmail(String email);
    boolean existsByIdAndIsDeletedFalse(Integer id);
    Optional<AccountEntity> findByIdAndIsDeletedFalse(Integer id);
}
