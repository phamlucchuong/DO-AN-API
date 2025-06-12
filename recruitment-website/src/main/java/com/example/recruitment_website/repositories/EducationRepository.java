package com.example.recruitment_website.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.EducationEntity;

@Repository
public interface EducationRepository extends JpaRepository<EducationEntity, String> {
    
}
