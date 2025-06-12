package com.example.recruitment_website.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.ApplicationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.JobEntity;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, String> {

    // Có thể thêm các method custom nếu cần
    List<ApplicationEntity> findByEmployee_Uid(String employeeId);

    List<ApplicationEntity> findByJob_Id(Integer jobId);

    Optional<ApplicationEntity> findByEmployeeAndJob(EmployeeEntity employee, JobEntity job);

    @Query("SELECT COUNT(a) FROM ApplicationEntity  a WHERE a.job.employer.uid = :employerId")
    Integer countByEmployerId(@Param("employerId") String employerId);

    @Query("SELECT a FROM ApplicationEntity a WHERE a.job.employer.id = :employerId")
    List<ApplicationEntity> findByEmployer_Id(@Param("employerId") String employerId);

    @Query("SELECT a FROM ApplicationEntity a WHERE a.job.employer.id = :employeeId AND a.job.id = :jobId")
    List<ApplicationEntity> findByEmployeeAndJob(@Param("employeeId") String employeeId, @Param("jobId") Integer jobId);

}
