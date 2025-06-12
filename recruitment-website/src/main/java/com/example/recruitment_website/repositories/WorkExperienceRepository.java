package com.example.recruitment_website.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.recruitment_website.entities.WorkExperienceEntity;

import jakarta.transaction.Transactional;



@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperienceEntity, String> {
    // Xóa tất cả language theo uid employee
    @Modifying
    @Transactional
    @Query("DELETE FROM WorkExperienceEntity l WHERE l.employee.uid = :uid")
    void deleteByEmployeeUid(@Param("uid") String uid);

    // Lấy danh sách language theo uid employee (nếu cần)
    List<WorkExperienceEntity> findByEmployee_Uid(String uid);
    boolean existsByRole(String role);
}
