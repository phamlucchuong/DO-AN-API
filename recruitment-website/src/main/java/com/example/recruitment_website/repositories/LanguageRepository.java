package com.example.recruitment_website.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.recruitment_website.entities.LanguageEntity;

import jakarta.transaction.Transactional;

@Repository
public interface LanguageRepository extends JpaRepository<LanguageEntity, String> {
    // Xóa tất cả language theo uid employee
    @Modifying
    @Transactional
    @Query("DELETE FROM LanguageEntity l WHERE l.employee.uid = :uid")
    void deleteByEmployeeUid(@Param("uid") String uid);

    // Lấy danh sách language theo uid employee (nếu cần)
    List<LanguageEntity> findByEmployee_Uid(String uid);
    boolean existsByName(String name);
}
