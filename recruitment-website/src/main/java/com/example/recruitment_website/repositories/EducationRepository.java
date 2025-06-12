package com.example.recruitment_website.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.recruitment_website.entities.EducationEntity;
import jakarta.transaction.Transactional;

@Repository
public interface EducationRepository extends JpaRepository<EducationEntity, String> {
    // Xóa tất cả language theo uid employee
    @Modifying
    @Transactional
    @Query("DELETE FROM EducationEntity l WHERE l.employee.uid = :uid")
    void deleteByEmployeeUid(@Param("uid") String uid);

    // Lấy danh sách language theo uid employee (nếu cần)
    List<EducationEntity> findByEmployee_Uid(String uid);
    boolean existsByMajor(String major);
}
