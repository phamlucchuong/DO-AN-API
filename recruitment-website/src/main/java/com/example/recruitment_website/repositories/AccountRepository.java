package com.example.recruitment_website.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, String> {
    // Define custom query methods if needed
    boolean existsById(String id);
    boolean existsByEmail(String email);
    Optional<AccountEntity> findByEmail(String email);
    boolean existsByIdAndIsDeletedFalse(String id);
    Optional<AccountEntity> findByIdAndIsDeletedFalse(String id);
}
