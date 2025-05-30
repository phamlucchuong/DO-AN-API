package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.JobEntity;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Integer> {
    // Define custom query methods if needed
    
}