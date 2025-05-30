package com.example.recruitment_website.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.dtos.AccountDTO;
import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.entities.AccountEntity;
import com.example.recruitment_website.entities.EmployerEntity;
import com.example.recruitment_website.mappers.EmployerMapper;
import com.example.recruitment_website.repositories.AccountRepository;
import com.example.recruitment_website.repositories.EmployerRepository;

import jakarta.transaction.Transactional;

@Service
public class EmployerService {

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
        Integer accountId = newAccountDTO.getId();
        if (accountId == null) {
            throw new RuntimeException("Không thể tạo tài khoản: accountId là null");
        }

        // Tạo EmployerDTO
        EmployerDTO employerDTO = new EmployerDTO();
        employerDTO.setAccountId(accountId);
        employerDTO.setCompanyName(companyName);
        employerDTO.setCompanyAddress(address);
        employerDTO.setPhoneNumber(phoneNumber);
        employerDTO.setPassword(hashedPassword);
        employerDTO.setIsApproved(false);

        // Log để debug
        System.out.println("EmployerDTO: accountId=" + employerDTO.getAccountId() + ", password=" + employerDTO.getPassword());

        // Ánh xạ sang EmployerEntity
        EmployerEntity employerEntity = employerMapper.toEntity(employerDTO);
        if (employerEntity.getAccountId() == null || employerEntity.getPassword() == null) {
            throw new RuntimeException("Lỗi ánh xạ: accountId=" + employerEntity.getAccountId() + ", password=" + employerEntity.getPassword());
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

        EmployerEntity employer = employerRepository.findByAccountId(account.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhà tuyển dụng cho tài khoản này"));

        boolean matches = passwordEncoder.matches(rawPassword, employer.getPassword());
        if (!matches) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        return employerMapper.toDTO(employer);
    }
}
