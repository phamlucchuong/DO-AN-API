package com.example.recruitment_website.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private EmployerMapper employerMapper;
    @Autowired
    private ImageUploadService imageUploadService;
    private static final Logger logger = LoggerFactory.getLogger(EmployerService.class);

    @Transactional
    public EmployerDTO registerEmployer(EmployerRegisterRequest employerRegisterRequest) {
        String firebaseUid = employerRegisterRequest.getFirebaseUid();
        logger.debug("Bắt đầu đăng ký employer với UID: {}", firebaseUid);

        // Kiểm tra firebaseUid
        if (firebaseUid == null || firebaseUid.isEmpty()) {
            logger.error("Firebase UID không được để trống");
            throw new IllegalArgumentException("Firebase UID không được để trống");
        }

        // Kiểm tra tài khoản tồn tại bằng UID
        AccountEntity accountEntity = accountRepository.findById(firebaseUid)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy tài khoản với UID: {}", firebaseUid);
                    return new RuntimeException("Không tìm thấy tài khoản với UID: " + firebaseUid);
                });

        logger.debug("Tìm thấy account với UID: {}", firebaseUid);

        // Kiểm tra employer đã tồn tại
        if (employerRepository.existsById(firebaseUid)) {
            logger.warn("Tài khoản này đã đăng ký thông tin công ty! UID: {}", firebaseUid);
            throw new RuntimeException("Tài khoản này đã đăng ký thông tin công ty!");
        }

        // Xử lý file ảnh
        String logoUrl = null;
        try {
            if (employerRegisterRequest.getCompanyLogo() != null && !employerRegisterRequest.getCompanyLogo().isEmpty()) {
                logger.debug("Bắt đầu upload ảnh logo cho employer UID: {}", firebaseUid);
                logoUrl = imageUploadService.uploadToCloudinary(employerRegisterRequest.getCompanyLogo());
                logger.debug("Upload ảnh thành công, logoUrl: {}", logoUrl);
            }
        } catch (Exception ex) {
            logger.error("Lỗi upload ảnh: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi upload ảnh: " + ex.getMessage());
        }

        // Tạo employer entity
        EmployerEntity employer = new EmployerEntity();
        employer.setUid(firebaseUid);
        employer.setAccount(accountEntity);
        employer.setCompanyName(employerRegisterRequest.getCompanyName());
        employer.setCompanyAddress(employerRegisterRequest.getCompanyAddress());
        employer.setPhoneNumber(employerRegisterRequest.getPhoneNumber());
        employer.setTaxCode(employerRegisterRequest.getTaxCode());
        employer.setIndustry(employerRegisterRequest.getIndustry());
        employer.setCompanySize(employerRegisterRequest.getCompanySize());
        employer.setFoundedDate(employerRegisterRequest.getFoundedDate());
        employer.setCompanyDescription(employerRegisterRequest.getCompanyDescription());
        employer.setCompanyWebsite(employerRegisterRequest.getCompanyWebsite());
        employer.setCompanyLogo(logoUrl);
        employer.setIsApproved(false);
        employer.setStatus("ACTIVE");
        employer.setCity(employerRegisterRequest.getCity());

        logger.debug("Trạng thái employer entity trước khi save: {}", employer);

        // Lưu employer
        try {
            EmployerEntity savedEmployer = employerRepository.save(employer);
            logger.info("Lưu employer thành công với UID: {}", firebaseUid);
            return employerMapper.toDTO(savedEmployer);
        } catch (Exception ex) {
            logger.error("Lỗi khi lưu employer: {}", ex.getMessage(), ex);
            throw new RuntimeException("Lỗi khi lưu employer: " + ex.getMessage());
        }
    }

    
}