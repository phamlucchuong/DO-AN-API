package com.example.recruitment_website.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.EmployerEntity;

@Repository
public interface EmployerRepository extends JpaRepository<EmployerEntity, String> {    
    // Optional<EmployerEntity> findByAccountId(String accountId);
    long countByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<EmployerEntity> findByIsApprovedFalse();

    @Query("SELECT COUNT(e) FROM EmployerEntity e WHERE MONTH(e.createdAt) = :month AND YEAR(e.createdAt) = :year")
    int countEmployersByMonthAndYear(@Param("month") int month, @Param("year") int year);
}
