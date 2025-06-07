package com.example.recruitment_website.services;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.AccountDTO;
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
<<<<<<< HEAD
=======
import com.example.recruitment_website.payloads.EmployerRegisterRequest;
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployerService {
<<<<<<< HEAD

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmployerMapper employerMapper;

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public EmployerDTO registerEmployer(String email, String rawPassword, String companyName, String address, String phoneNumber) {
        // Kiểm tra đầu vào
        if (email == null || email.isEmpty() || rawPassword == null || rawPassword.isEmpty()
                || companyName == null || companyName.isEmpty() || address == null || address.isEmpty()
                || phoneNumber == null || phoneNumber.isEmpty()) {
            throw new IllegalArgumentException("Dữ liệu đầu vào không được để trống");
        }

        // Mã hóa mật khẩu
        String hashedPassword = passwordEncoder.encode(rawPassword);
        if (hashedPassword == null) {
            throw new RuntimeException("Lỗi khi mã hóa mật khẩu");
        }

        // Tạo tài khoản
        AccountDTO newAccountDTO = accountService.createAccount(email, "Employer", false);
        String accountId = newAccountDTO.getId();
        if (accountId == null) {
            throw new RuntimeException("Không thể tạo tài khoản: accountId là null");
        }

        // Tạo EmployerDTO
        EmployerDTO employerDTO = new EmployerDTO();
        employerDTO.setUid(accountId);
        employerDTO.setCompanyName(companyName);
        employerDTO.setCompanyAddress(address);
        employerDTO.setPhoneNumber(phoneNumber);
        employerDTO.setIsApproved(false);

        // Log để debug
        System.out.println("EmployerDTO: accountId=" + employerDTO.getUid());

        // Ánh xạ sang EmployerEntity
        EmployerEntity employerEntity = employerMapper.toEntity(employerDTO);
        if (employerEntity.getAccount() == null || employerEntity.getPassword() == null) {
            throw new RuntimeException("Lỗi ánh xạ: accountId=" + employerEntity.getAccount() + ", password=" + employerEntity.getPassword());
        }

        // Lưu vào cơ sở dữ liệu
        employerRepository.save(employerEntity);

        // Trả về DTO
        return employerMapper.toDTO(employerEntity);
    }

    public EmployerDTO login(String email, String rawPassword) {
        AccountEntity account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        if (account.getIsDeleted()) {
            throw new RuntimeException("Tài khoản đã bị khóa");
        }

        EmployerEntity employer = employerRepository.findByAccountId(account.getUid())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà tuyển dụng cho tài khoản này"));

        boolean matches = passwordEncoder.matches(rawPassword, employer.getPassword());
        if (!matches) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        return employerMapper.toDTO(employer);
    }
}
=======
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
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
