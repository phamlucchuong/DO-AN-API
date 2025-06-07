package com.example.recruitment_website.repositories;

import java.util.List;

import org.springframework.boot.autoconfigure.batch.BatchProperties.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.JobEntity;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Integer> {
    List<JobEntity> findByEmployerUid(String employerId);
    Page<JobEntity> findByEmployerUid(String employerUid, Pageable pageable);
}