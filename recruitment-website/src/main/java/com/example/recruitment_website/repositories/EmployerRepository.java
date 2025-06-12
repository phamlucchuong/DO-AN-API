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

    // @Query("SELECT new map(e.uid as uid, e.companyName as companyName, e.industry as industry, "
    //         + "e.companyLogo as companyLogo, e.city as city, e.companyDescription as companyDescription, "
    //         + "COUNT(j) as jobCount) "
    //         + "FROM EmployerEntity e LEFT JOIN JobEntity j ON e.uid = j.employerId "
    //         + "GROUP BY e.uid, e.companyName, e.industry, e.companyLogo, e.city, e.companyDescription "
    //         + "ORDER BY COUNT(j) DESC")
    // List<Map<String, Object>> findTopEmployers();
}
