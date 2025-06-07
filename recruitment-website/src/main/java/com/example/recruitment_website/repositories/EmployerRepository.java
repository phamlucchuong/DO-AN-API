package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.EmployerEntity;

@Repository
public interface  EmployerRepository extends JpaRepository<EmployerEntity, String> {
    // Optional<EmployerEntity> findByAccountId(String accountId);
}
