package com.example.recruitment_website.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.recruitment_website.dtos.employee.*;
import com.example.recruitment_website.services.EmployeeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/employee")
public class EmployeeRestController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> isPersonalUpdated(@PathVariable String id) {
        boolean isExists = employeeService.isExisted(id);
        return ResponseEntity.ok(isExists);
    }

    @GetMapping("/{id}/personal")
    public ResponseEntity<?> getPersonalData(@PathVariable String id) {
        try {
            PersonalDTO personal = employeeService.getPersonalData(id);
            if (personal == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(personal);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi tạo thông tin cá nhân");
        }
    }

    @PostMapping("/{id}/personal")
    public ResponseEntity<?> createPersonalData(@PathVariable String id, @RequestBody PersonalDTO dto) {
        try {
            employeeService.createPersonalData(id, dto); // Giả định bạn có hàm này
            return ResponseEntity.ok("Thêm employee thành công");
        } catch (Exception e) {
            e.printStackTrace(); // In ra lỗi chi tiết trên console
            return ResponseEntity.badRequest().body("Lỗi khi thêm thông tin cá nhân: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/personal")
    public ResponseEntity<?> updatePersonalData(@PathVariable String id, @RequestBody PersonalDTO dto) {
        try {
            employeeService.updatePersonalData(id, dto); // Giả định bạn có hàm này
            return ResponseEntity.ok("Cập nhật thông tin cá nhân thành công");
        } catch (Exception e) {
            e.printStackTrace(); // In ra lỗi chi tiết trên console
            return ResponseEntity.badRequest().body("Lỗi khi cập nhật thông tin cá nhân: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/career-objective")
    public ResponseEntity<String> getCareerObjective(@PathVariable String id) {
        String careerObjective = employeeService.findCareerObjective(id);
        return ResponseEntity.ok(careerObjective);
    }

    @PutMapping("/{id}/career-objective")
    public ResponseEntity<?> updateCareerObjective(@PathVariable String id, @RequestBody String careerObjective) {
        employeeService.postCareerObjective(id, careerObjective);
        return ResponseEntity.ok("Cập nhật mục tiêu nghề nghiệp thành công");
    }

    @GetMapping("/{id}/work-experience")
    public ResponseEntity<?> getWorkExperience(@PathVariable String id) {
        try {
            List<WorkExperienceDTO> workExperiences = employeeService.findWorkExperience(id);
            return ResponseEntity.ok(workExperiences);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy kinh nghiệm làm việc");
        }
    }

    @PostMapping("/{id}/work-experience")
    public ResponseEntity<?> postWorkExperience(@PathVariable String id, @RequestBody WorkExperienceDTO dto) {
        employeeService.postWorkExperience(id, dto);
        return ResponseEntity.ok("Cập nhật kinh nghiệm làm việc thành công");
    }

    @DeleteMapping("/{id}/work-experience")
    public ResponseEntity<?> deleteWorkExperience(@PathVariable String id, @RequestParam String expID) {
        employeeService.deleteWorkExperience(id, expID);
        return ResponseEntity.ok("Xoas kỹ năng thành công");
    }

    @GetMapping("/{id}/education")
    public ResponseEntity<?> getEducation(@PathVariable String id) {
        try {
            List<EducationDTO> educationList = employeeService.getEducations(id);
            return ResponseEntity.ok(educationList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy thông tin học vấn");
        }
    }

    @PostMapping("/{id}/education")
    public ResponseEntity<?> postEducation(@PathVariable String id, @RequestBody EducationDTO dto) {
        employeeService.postEducation(id, dto);
        return ResponseEntity.ok("Cập nhật học vấn thành công");
    }

    @DeleteMapping("/{id}/education")
    public ResponseEntity<?> deleteEducation(@PathVariable String id, @RequestParam String eduID) {
        employeeService.deleteEducation(id, eduID);
        return ResponseEntity.ok("Xoas học vấn thành công");
    }

    @GetMapping("/{id}/skill")
    public ResponseEntity<?> getSkills(@PathVariable String id) {
        try {
            List<SkillDTO> skills = employeeService.getSkills(id);
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy kỹ năng");
        }
    }

    @PostMapping("/{id}/skill")
    public ResponseEntity<?> postSkills(@PathVariable String id, @RequestBody SkillDTO dto) {
        employeeService.postSkill(id, dto);
        return ResponseEntity.ok("Cập nhật kĩ năng thành công");
    }

    @DeleteMapping("/{id}/skill")
    public ResponseEntity<?> deleteSkills(@PathVariable String id, @RequestParam String skillID) {
        employeeService.deleteSkill(id, skillID);
        return ResponseEntity.ok("Xoas kỹ năng thành công");
    }

    @GetMapping("/{id}/language")
    public ResponseEntity<?> getLanguages(@PathVariable String id) {
        try {
            List<LanguageDTO> languages = employeeService.getLanguages(id);
            return ResponseEntity.ok(languages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi lấy ngôn ngữ");
        }
    }

    @PostMapping("/{id}/language")
    public ResponseEntity<?> postLanguages(@PathVariable String id, @RequestBody LanguageDTO dto) {
        employeeService.postLanguages(id, dto);
        return ResponseEntity.ok("Cập nhật ngôn ngữ thành công");
    }

    @DeleteMapping("/{id}/language")
    public ResponseEntity<?> deleteLanguages(@PathVariable String id, @RequestParam String languageID) {
        employeeService.deleteLanguages(id, languageID);
        return ResponseEntity.ok("Xoas ngôn ngữ thành công");
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteEmployee(@PathVariable String id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Xoas employee thành công");
    }
    // Dưới đây là các method có thể dùng sau này (chưa mở):
    /*
     * @GetMapping("/{id}/certifications")
     * public ResponseEntity<?> getCertifications(@PathVariable String id) {
     * try {
     * List<String> certifications = employeeService.getCertifications(id);
     * return ResponseEntity.ok(certifications);
     * } catch (Exception e) {
     * return ResponseEntity.badRequest().body("Lỗi khi lấy chứng chỉ");
     * }
     * }
     * 
     * @GetMapping("/{id}/cv-link")
     * public ResponseEntity<?> getCvLink(@PathVariable String id) {
     * try {
     * String cvLink = employeeService.getCvLink(id);
     * if (cvLink == null) {
     * return ResponseEntity.notFound().build();
     * }
     * return ResponseEntity.ok(cvLink);
     * } catch (Exception e) {
     * return ResponseEntity.badRequest().body("Lỗi khi lấy đường dẫn CV");
     * }
     * }
     * 
     * @GetMapping("/{id}/views")
     * public ResponseEntity<?> getViewsCount(@PathVariable String id) {
     * try {
     * Integer views = employeeService.getViewsCount(id);
     * if (views == null) {
     * return ResponseEntity.notFound().build();
     * }
     * return ResponseEntity.ok(views);
     * } catch (Exception e) {
     * return ResponseEntity.badRequest().body("Lỗi khi lấy số lượt xem");
     * }
     * }
     * 
     * @GetMapping("/{id}/contacts")
     * public ResponseEntity<?> getContactCount(@PathVariable String id) {
     * try {
     * Integer contacts = employeeService.getContactCount(id);
     * if (contacts == null) {
     * return ResponseEntity.notFound().build();
     * }
     * return ResponseEntity.ok(contacts);
     * } catch (Exception e) {
     * return ResponseEntity.badRequest().body("Lỗi khi lấy số lượt liên hệ");
     * }
     * }
     */
}
