package com.example.recruitment_website.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.recruitment_website.dtos.employee.WorkExperienceDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.entities.EducationEntity;
import com.example.recruitment_website.entities.EmployeeEntity;
import com.example.recruitment_website.entities.LanguageEntity;
import com.example.recruitment_website.entities.SkillEntity;
import com.example.recruitment_website.entities.WorkExperienceEntity;
import com.example.recruitment_website.dtos.employee.EducationDTO;
import com.example.recruitment_website.dtos.employee.LanguageDTO;
import com.example.recruitment_website.dtos.employee.PersonalDTO;
import com.example.recruitment_website.dtos.employee.SkillDTO;
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployeeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AccountRepository accountRepository;

    @PersistenceContext
    private EntityManager entityManager; // Thêm dòng này

    public boolean isExisted(String id) {
        return employeeRepository.existsById(id);
    }

    // region personal data

    public PersonalDTO getPersonalData(String uid) {
        return employeeRepository.findPersonalByUid(uid);
    }

    @Transactional
    public void createPersonalData(String id, PersonalDTO dto) {
        if (employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên đã tồn tại, không thể tạo mới.");
        }

        EmployeeEntity employee = new EmployeeEntity();
        employee.setUid(id);

        // Liên kết với AccountEntity (vì có @OneToOne)
        AccountEntity account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy tài khoản tương ứng"));
        employee.setAccount(account);

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setGender(dto.getGender());
        employee.setAddress(dto.getAddress());

        entityManager.persist(employee);
        // employeeRepository.save(employeeEntity);
    }

    @Transactional
    public void updatePersonalData(String id, PersonalDTO dto) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên không tồn tại.");
        }

        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + id));

        // --- Bắt đầu kiểm tra ràng buộc UNIQUE ---

        // Kiểm tra Email
        if (dto.getEmail() != null && !dto.getEmail().equals(employee.getEmail())) {
            Optional<EmployeeEntity> existingEmployeeOptional = employeeRepository.findByEmail(dto.getEmail());
            // Thay thế ifPresent bằng isPresent() và get()
            if (existingEmployeeOptional.isPresent()) {
                EmployeeEntity existingEmployee = existingEmployeeOptional.get();
                if (!existingEmployee.getUid().equals(id)) {
                    throw new RuntimeException("Email '" + dto.getEmail() + "' đã tồn tại cho nhân viên khác.");
                }
            }
        }

        // Kiểm tra Phone
        if (dto.getPhone() != null && !dto.getPhone().equals(employee.getPhone())) {
            Optional<EmployeeEntity> existingEmployeeOptional = employeeRepository.findByPhone(dto.getPhone());
            // Thay thế ifPresent bằng isPresent() và get()
            if (existingEmployeeOptional.isPresent()) {
                EmployeeEntity existingEmployee = existingEmployeeOptional.get();
                if (!existingEmployee.getUid().equals(id)) {
                    throw new RuntimeException("Số điện thoại '" + dto.getPhone() + "' đã tồn tại cho nhân viên khác.");
                }
            }
        }
        // --- Kết thúc kiểm tra ---

        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setGender(dto.getGender());
        employee.setAddress(dto.getAddress());

        try {
            entityManager.merge(employee);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(
                    "Lỗi dữ liệu: Giá trị email hoặc số điện thoại có thể đã tồn tại hoặc không hợp lệ. "
                            + e.getMessage(),
                    e);
        } catch (Exception e) {
            throw new RuntimeException("Có lỗi xảy ra trong quá trình cập nhật thông tin cá nhân: " + e.getMessage(),
                    e);
        }
    }

    // endregion

    // region career objective
    public String findCareerObjective(String id) {
        return employeeRepository.findCareerObjectiveByUid(id);
    }

    public void postCareerObjective(String uid, String careerObjective) {
        EmployeeEntity employee = (EmployeeEntity) employeeRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + uid));

        employee.setCareerObjective(careerObjective);
        employeeRepository.save(employee);
    }
    // endregion

    // region experience
    public List<WorkExperienceDTO> findWorkExperience(String uid) {
        return employeeRepository.findWorkExperienceByUid(uid);
    }

    public void postWorkExperience(String id, WorkExperienceDTO dto) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên không tồn tại.");
        }

        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + id));

        WorkExperienceEntity experience = new WorkExperienceEntity(dto);
        experience.setEmployee(employee);
        
        if (employee.getWorkExperience() == null) {
            employee.setWorkExperience(new ArrayList<>());
        }
        employee.getWorkExperience().add(experience);

        employeeRepository.save(employee);
    }

    // endregion

    public List<EducationDTO> getEducations(String uid) {
        return employeeRepository.findEducationByUid(uid);
    }

    public void postEducation(String id, EducationDTO dto) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên không tồn tại.");
        }

        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + id));

        EducationEntity education = new EducationEntity(dto);
        education.setEmployee(employee);
        
        if (employee.getEducation() == null) {
            employee.setEducation(new ArrayList<>());
        }
        employee.getEducation().add(education);

        employeeRepository.save(employee);
    }

    public List<SkillDTO> getSkills(String uid) {
        return employeeRepository.findSkillsByUid(uid);
    }

    public void postSkill(String id, SkillDTO dto) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên không tồn tại.");
        }

        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + id));

        SkillEntity skill = new SkillEntity(dto);
        skill.setEmployee(employee);
        
        if (employee.getSkills() == null) {
            employee.setSkills(new ArrayList<>());
        }
        employee.getSkills().add(skill);

        employeeRepository.save(employee);
    }

    public List<LanguageDTO> getLanguages(String uid) {
        return employeeRepository.findLanguagesByUid(uid);
    }

    public void postLanguages(String id, LanguageDTO dto) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Nhân viên không tồn tại.");
        }

        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với UID: " + id));

        LanguageEntity language = new LanguageEntity(dto);
        language.setEmployee(employee);
        
        if (employee.getLanguages() == null) {
            employee.setLanguages(new ArrayList<>());
        }
        employee.getLanguages().add(language);

        employeeRepository.save(employee);
    }

    

    // public String getCvLink(String uid) {
    // return employeeRepository.findCvLinkByUid(uid);
    // }

    // public Integer getViewsCount(String uid) {
    // return employeeRepository.findViewsCountByUid(uid);
    // }

    // public Integer getContactCount(String uid) {
    // return employeeRepository.findContactCountByUid(uid);
    // }
}
