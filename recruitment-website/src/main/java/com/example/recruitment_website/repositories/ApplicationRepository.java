package com.example.recruitment_website.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.recruitment_website.entities.ApplicationEntity;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationEntity, String> {
    // Có thể thêm các method custom nếu cần
    List<ApplicationEntity> findByEmployee_Uid(String employeeId);
    List<ApplicationEntity> findByJob_Id(Integer jobId);
}
