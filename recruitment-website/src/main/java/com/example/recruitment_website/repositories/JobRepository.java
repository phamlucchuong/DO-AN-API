package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.JobEntity;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, String> {
    // Define custom query methods if needed
    // List<JobEntity> findByEmployerId(String employerId);
}