package com.example.recruitment_website.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.enums.EmploymentType;

@Repository
public interface JobRepository extends JpaRepository<JobEntity, Integer> {

    List<JobEntity> findByEmployerUid(String employerId);

    Page<JobEntity> findByEmployerUid(String employerUid, Pageable pageable);

    long countByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    Integer countByEmployer(EmployerEntity employer);

    @Query("SELECT COUNT(j) FROM JobEntity j WHERE MONTH(j.createdAt) = :month AND YEAR(j.createdAt) = :year")
    int countJobsByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(j) FROM JobEntity j WHERE j.employmentType = :type")
    int countJobsByEmploymentType(@Param("type") EmploymentType type);

    @Query(value = "SELECT TOP 6 * FROM job ORDER BY created_at DESC", nativeQuery = true)
    List<JobEntity> findTopJobs();

}
