package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.recruitment_website.entities.ApplicationApproval;

public interface ApplicationApprovalRepository extends JpaRepository<ApplicationApproval, Integer> {
}
