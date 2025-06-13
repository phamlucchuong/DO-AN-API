package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.recruitment_website.entities.ApplicationApprovalEntity;

public interface ApplicationApprovalRepository extends JpaRepository<ApplicationApprovalEntity, Integer> {
}
