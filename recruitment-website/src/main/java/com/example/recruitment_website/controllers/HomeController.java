package com.example.recruitment_website.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.recruitment_website.dtos.EmployerDTO;
import com.example.recruitment_website.dtos.JobDTO;
import com.example.recruitment_website.services.EmployerService;
import com.example.recruitment_website.services.JobService;

@Controller
public class HomeController {

    @Autowired
    private JobService jobService;

    @Autowired
    private EmployerService employerService;

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/register")
    public String register() {
        return "account/register";
    }

    @GetMapping("/employer")
    public String employerPage() {
        return "employer/home";
    }

    @GetMapping("/company-detail")
    public String companyDetail(@RequestParam(value = "uid", required = false) String employeyrID, Model model) {
        EmployerDTO employer = employerService.getEmployerByUid(employeyrID);
        if (employer == null) {
            return "error/404"; // hoặc redirect về trang khác
        }
        model.addAttribute("employer", employer);
        return "details/company-detail";
    }

    @GetMapping("/job-detail")
    public String jobDetail(@RequestParam(value = "id", required = false) Integer jobId, Model model) {
        JobDTO job = jobService.getJobById(jobId);
        if (job == null) {
            return "error/404"; // hoặc redirect về trang khác
        }
        model.addAttribute("job", job);
        return "details/job-detail";
    }

    @GetMapping("/employee-profile")
    public String profileDetail() {
        return "employee/profile-detail";
    }

    @GetMapping("/admin")
    public String admin() {
        return "/admin/login";
    }

    @GetMapping("/profile")
    public String profile() {
        return "employee/profile";
    }

    @GetMapping("/company-profile")
    public String company() {
    return "employee/company";
    }


    @GetMapping("/jobs-profile")
    public String jobs() {
        return "employee/jobs";
    }

    @GetMapping("/application-profile")
    public String application() {
        return "employee/application-profile";
    }
}
