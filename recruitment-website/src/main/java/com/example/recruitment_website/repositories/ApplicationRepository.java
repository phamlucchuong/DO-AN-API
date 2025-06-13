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

    void deleteByEmployee(EmployeeEntity employee);

    @Query("SELECT a FROM ApplicationEntity a WHERE a.employee.uid = :uid")
    // @Query("SELECT new com.example.recruitment_website.dtos.ApplicationEntity(a.id, a.createdDate, a.cvLink, a.employee, a.job, a.status) FROM ApplicationEntity a WHERE a.employee.uid = :uid")
    List<ApplicationEntity> findByEmployeeUid(@Param("uid") String uid);

    // List<ApplicationEntity> findByEmployeeUid(String uid);

    // @Query("SELECT a FROM ApplicationEntity a JOIN FETCH a.job WHERE a.employee.uid = :uid")
    // List<ApplicationEntity> findWithJobByEmployeeUid(@Param("uid") String uid);

}
