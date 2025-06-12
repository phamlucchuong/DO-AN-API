package com.example.recruitment_website.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.recruitment_website.dtos.employee.EducationDTO;
import com.example.recruitment_website.dtos.employee.LanguageDTO;
import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;
import com.example.recruitment_website.dtos.employee.PersonalDTO;
import com.example.recruitment_website.dtos.employee.SkillDTO;
import com.example.recruitment_website.entities.EmployeeEntity;



@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String> {
    // Optional<EmployeeEntity> findByAccountId(String accountId);

    Optional<EmployeeEntity> findByEmail(String email);
    Optional<EmployeeEntity> findByPhone(String phone);
    boolean existsByAccountId(String accountId);

    // 1. Lấy PersonalDTO
    @Query("SELECT new com.example.recruitment_website.dtos.employee.PersonalDTO(e.name, e.email, e.phone, e.dateOfBirth, e.gender, e.address) FROM EmployeeEntity e WHERE e.uid = :uid")
    // @Query("SELECT new com.example.recruitment_website.dtos.employee.PersonalDTO(e.name, e.email, e.phone, e.dateOfBirth, e.gender, e.address, e.image) FROM EmployeeEntity e WHERE e.uid = :uid")
    PersonalDTO findPersonalByUid(@Param("uid") String uid);

    // 2. Lấy CareerObjective
    @Query("SELECT e.careerObjective FROM EmployeeEntity e WHERE e.uid = :uid")
    String findCareerObjectiveByUid(@Param("uid") String uid);


    // 3. Lấy WorkExperienceDTO list
    @Query("SELECT new com.example.recruitment_website.dtos.employee.WorkExperienceDTO(w.uid, w.role, w.company, w.period, w.description) FROM WorkExperienceEntity w WHERE w.employee.uid = :uid")
    List<WorkExperienceDTO> findWorkExperienceByUid(@Param("uid") String uid);

    // 4. Lấy EducationDTO list
    @Query("SELECT new com.example.recruitment_website.dtos.employee.EducationDTO(ed.uid, ed.school, ed.major, ed.period) FROM EducationEntity ed WHERE ed.employee.uid = :uid")
    List<EducationDTO> findEducationByUid(@Param("uid") String uid);

    // 5. Lấy skills (List<String>)
    @Query("SELECT new com.example.recruitment_website.dtos.employee.SkillDTO(sk.uid, sk.name, sk.level) FROM SkillEntity sk WHERE sk.employee.uid = :uid")
    List<SkillDTO> findSkillsByUid(@Param("uid") String uid);

    // 6. Lấy languages (List<String>)
    // @Query("SELECT l FROM EmployeeEntity e JOIN e.language l WHERE e.uid = :uid")
    @Query("SELECT new com.example.recruitment_website.dtos.employee.LanguageDTO(l.uid, l.name, l.level) FROM LanguageEntity l WHERE l.employee.uid = :uid")
    List<LanguageDTO> findLanguagesByUid(@Param("uid") String uid);


    // // 5. Lấy certifications (List<String>)
    // @Query("SELECT c FROM EmployeeEntity e JOIN e.certifications c WHERE e.uid = :uid")
    // List<String> findCertificationsByUid(@Param("uid") String uid);


    // // 7. Lấy cvLink, viewsCount, contactCount
    // @Query("SELECT e.cvLink, e.viewsCount, e.contactCount FROM EmployeeEntity e WHERE e.uid = :uid")
    // Object[] findCvViewsContactsByUid(@Param("uid") String uid);

}
