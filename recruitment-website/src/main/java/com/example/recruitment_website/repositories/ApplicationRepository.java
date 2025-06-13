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

    // @Query("SELECT a FROM ApplicationEntity a WHERE a.job.employer.uid = :employerId")
    // List<ApplicationEntity> findByEmployer_Id(@Param("employerId") String employerId);

    List<ApplicationEntity> findByJob_Employer_Uid(String employerId);


    @Query("SELECT a FROM ApplicationEntity a JOIN FETCH a.job j JOIN FETCH a.employee e WHERE j.employer.id = :employerId AND j.id = :jobId")
    List<ApplicationEntity> findByEmployeeAndJob(@Param("employeeId") String employeeId, @Param("jobId") Integer jobId);

    @Query("SELECT a FROM ApplicationEntity a JOIN FETCH a.job j JOIN FETCH a.employee e WHERE j.employer.id = :employerId AND j.id = :jobId")
    List<ApplicationEntity> findByEmployerIdAndJobId(@Param("employerId") String employerId, @Param("jobId") Integer jobId);

    // void deleteByEmployee(EmployeeEntity employee);

    // @Query("SELECT new com.example.recruitment_website.dtos.ApplicationDTO(a.id,  a.createdDate, a.cvLink, a.employee, a.job) FROM ApplicationEntity a WHERE a.employee.uid = :uid")
    // List<ApplicationDTO> findAllById(@Param("uid") String uid);
    // List<ApplicationEntity> findByEmployeeUid(String uid);

    // void deleteByEmployee(EmployeeEntity employee);

    // @Query("SELECT a FROM ApplicationEntity a WHERE a.employee.uid = :uid")
    // @Query("SELECT new com.example.recruitment_website.dtos.ApplicationEntity(a.id, a.createdDate, a.cvLink, a.employee, a.job, a.status) FROM ApplicationEntity a WHERE a.employee.uid = :uid")
    // List<ApplicationEntity> findByEmployeeUid(@Param("uid") String uid);

    // List<ApplicationEntity> findByEmployeeUid(String uid);

    // @Query("SELECT a FROM ApplicationEntity a JOIN FETCH a.job WHERE a.employee.uid = :uid")
    // List<ApplicationEntity> findWithJobByEmployeeUid(@Param("uid") String uid);

}
