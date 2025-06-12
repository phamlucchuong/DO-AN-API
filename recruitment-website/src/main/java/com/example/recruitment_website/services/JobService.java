package com.example.recruitment_website.services;

// package com.example.recruitment_website.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.entities.JobEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
import com.example.recruitment_website.mappers.JobMapper;
import com.example.recruitment_website.payloads.JobRequest;
import com.example.recruitment_website.repositories.EmployerRepository;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class JobService {

    private static final Logger logger = LoggerFactory.getLogger(JobService.class);

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobMapper jobMapper;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private EmployerMapper employerMapper;

    @Transactional
    public JobDTO addJob(JobRequest jobRequest) {
        // 1. Lấy EmployerEntity từ employerId trong JobRequest
        EmployerEntity employer = employerRepository.findById(jobRequest.getEmployerId())
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy nhà tuyển dụng với ID: {}", jobRequest.getEmployerId());
                    return new RuntimeException("Không tìm thấy nhà tuyển dụng với ID: " + jobRequest.getEmployerId());
                });

        // 2. Kiểm tra isApproved của employer
        if (!employer.getIsApproved()) {
            logger.warn("Nhà tuyển dụng với ID: {} chưa được duyệt, không thể đăng bài tuyển dụng", jobRequest.getEmployerId());
            throw new RuntimeException("Tài khoản của bạn chưa được duyệt. Vui lòng chờ duyệt để đăng bài tuyển dụng.");
        }

        // 3. Map từ JobRequest sang JobDTO
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(jobRequest.getId());
        jobDTO.setTitle(jobRequest.getTitle());
        jobDTO.setEmployer(employerMapper.toDTO(employer));
        jobDTO.setAddress(jobRequest.getAddress());
        jobDTO.setApplicationCount(jobRequest.getApplicationCount());
        jobDTO.setBenefits(jobRequest.getBenefits());
        jobDTO.setCity(jobRequest.getCity());
        jobDTO.setDeadline(jobRequest.getDeadline());
        jobDTO.setDescription(jobRequest.getDescription());
        jobDTO.setEmploymentType(jobRequest.getEmploymentType());
        jobDTO.setExperience(jobRequest.getExperience());
        jobDTO.setJobLevel(jobRequest.getJobLevel());
        jobDTO.setIsApproved(false);
        jobDTO.setRequirements(jobRequest.getRequirements());
        jobDTO.setNumberOfVacancies(0);
        jobDTO.setSalary(jobRequest.getSalary());
        jobDTO.setStatus(jobRequest.getStatus());
        jobDTO.setWorkingHours(jobRequest.getWorkingHours());

        // 4. Map JobDTO sang JobEntity
        JobEntity jobEntity = jobMapper.toEntity(jobDTO);

        // 5. Gán employer cho jobEntity
        jobEntity.setEmployer(employer);

        // 6. Lưu entity vào database
        try {
            jobEntity = jobRepository.save(jobEntity);
            logger.info("Đăng bài tuyển dụng thành công với ID: {}", jobEntity.getId());
        } catch (Exception ex) {
            logger.error("Lỗi khi lưu bài tuyển dụng: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi lưu bài tuyển dụng: " + ex.getMessage());
        }

        // 7. Map entity ngược lại DTO để trả về
        return jobMapper.toDTO(jobEntity);
    }

    public List<JobDTO> getJobsByEmployerId(String employerId) {
        List<JobEntity> jobs = jobRepository.findByEmployerUid(employerId);
        return jobs.stream().map(jobMapper::toDTO).collect(Collectors.toList());
    }

    public JobDTO getJobById(Integer jobId) {
        Optional<JobEntity> optionalJob = jobRepository.findById(jobId);
        JobEntity jobEntity = optionalJob.orElseThrow(() -> new RuntimeException("Không tìm thấy công việc với id: " + jobId));

        return jobMapper.toDTO(jobEntity);
    }

    public List<JobDTO> getJobs() {
        List<JobEntity> jobs = jobRepository.findAll();
        return jobs.stream().map(jobMapper::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public JobDTO updateJob(Integer jobId, JobRequest jobRequest) {
        // 1. Kiểm tra sự tồn tại của công việc
        JobEntity jobEntity = jobRepository.findById(jobId)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy công việc với ID: {}", jobId);
                    return new RuntimeException("Không tìm thấy công việc với ID: " + jobId);
                });

        // 2. Kiểm tra sự tồn tại của nhà tuyển dụng
        String employerId = jobRequest.getEmployerId();
        if (employerId == null || employerId.isEmpty()) {
            logger.error("Employer ID không được để trống");
            throw new IllegalArgumentException("Employer ID must not be null or empty");
        }
        EmployerEntity employer = employerRepository.findById(employerId)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy nhà tuyển dụng với ID: {}", employerId);
                    return new RuntimeException("Không tìm thấy nhà tuyển dụng với ID: " + employerId);
                });

        // 3. Kiểm tra isApproved của employer
        if (!employer.getIsApproved()) {
            logger.warn("Nhà tuyển dụng với ID: {} chưa được duyệt, không thể cập nhật bài tuyển dụng", employerId);
            throw new RuntimeException("Tài khoản của bạn chưa được duyệt. Vui lòng chờ duyệt để cập nhật bài tuyển dụng.");
        }

        // 4. Kiểm tra quyền sở hữu
        if (!jobEntity.getEmployer().getUid().equals(employerId)) {
            logger.warn("Nhà tuyển dụng với ID: {} không có quyền cập nhật công việc với ID: {}", employerId, jobId);
            throw new RuntimeException("Bạn không có quyền cập nhật công việc này");
        }

        // 5. Cập nhật các trường từ jobRequest, giữ nguyên nếu null
        jobEntity.setTitle(jobRequest.getTitle() != null ? jobRequest.getTitle() : jobEntity.getTitle());
        jobEntity.setSalary(jobRequest.getSalary() != null ? jobRequest.getSalary() : jobEntity.getSalary());
        jobEntity.setExperience(jobRequest.getExperience() != null ? jobRequest.getExperience() : jobEntity.getExperience());
        jobEntity.setDescription(jobRequest.getDescription() != null ? jobRequest.getDescription() : jobEntity.getDescription());
        jobEntity.setRequirements(jobRequest.getRequirements() != null ? jobRequest.getRequirements() : jobEntity.getRequirements());
        jobEntity.setBenefits(jobRequest.getBenefits() != null ? jobRequest.getBenefits() : jobEntity.getBenefits());
        jobEntity.setDeadline(jobRequest.getDeadline() != null ? jobRequest.getDeadline() : jobEntity.getDeadline());
        jobEntity.setStatus(jobRequest.getStatus() != null ? jobRequest.getStatus() : jobEntity.getStatus());
        jobEntity.setNumberOfVacancies(jobRequest.getNumberOfVacancies() != null ? jobRequest.getNumberOfVacancies() : jobEntity.getNumberOfVacancies());
        jobEntity.setJobLevel(jobRequest.getJobLevel() != null ? jobRequest.getJobLevel() : jobEntity.getJobLevel());
        jobEntity.setEmploymentType(jobRequest.getEmploymentType() != null ? jobRequest.getEmploymentType() : jobEntity.getEmploymentType());
        jobEntity.setCity(jobRequest.getCity() != null ? jobRequest.getCity() : jobEntity.getCity());
        jobEntity.setAddress(jobRequest.getAddress() != null ? jobRequest.getAddress() : jobEntity.getAddress());
        jobEntity.setWorkingHours(jobRequest.getWorkingHours() != null ? jobRequest.getWorkingHours() : jobEntity.getWorkingHours());

        // 6. Không cập nhật isApproved và applicationCount
        // jobEntity.setIsApproved(jobRequest.getIsApproved() != null ? jobRequest.getIsApproved() : jobEntity.getIsApproved());
        // jobEntity.setApplicationCount(jobRequest.getApplicationCount() != null ? jobRequest.getApplicationCount() : jobEntity.getApplicationCount());
        // 7. Gán lại employer
        jobEntity.setEmployer(employer);

        // 8. Lưu entity vào database
        try {
            jobEntity = jobRepository.save(jobEntity);
            logger.info("Cập nhật công việc thành công với ID: {}", jobId);
        } catch (Exception ex) {
            logger.error("Lỗi khi cập nhật công việc: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi cập nhật công việc: " + ex.getMessage());
        }

        // 9. Map entity sang DTO
        return jobMapper.toDTO(jobEntity);
    }

    public Map<String, Long> getJobStatistics() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfCurrentMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfLastMonth = startOfCurrentMonth.minusMonths(1);
        LocalDateTime endOfLastMonth = startOfCurrentMonth.minusSeconds(1);

        // Số lượng công việc trong tháng hiện tại
        long currentMonthJobs = jobRepository.countByCreatedAtBetween(startOfCurrentMonth, now);

        // Số lượng công việc trong tháng trước
        long lastMonthJobs = jobRepository.countByCreatedAtBetween(startOfLastMonth, endOfLastMonth);

        return Map.of(
                "currentMonth", currentMonthJobs,
                "lastMonth", lastMonthJobs
        );
    }

    public Integer getJobsCountByEmployerId(String id) {
        EmployerEntity employer = employerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employer not found with id: " + id));
        return jobRepository.countByEmployer(employer);
    }

    public int countJobsByMonthAndYear(int month, int year) {
        return jobRepository.countJobsByMonthAndYear(month, year);
    }

    public List<JobEntity> getHotJobs(){
        return jobRepository.findAll();
    }

}
