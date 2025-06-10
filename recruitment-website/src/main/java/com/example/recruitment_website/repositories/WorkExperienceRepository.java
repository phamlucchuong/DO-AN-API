package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.WorkExperienceEntity;



@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperienceEntity, String> {
    
}
