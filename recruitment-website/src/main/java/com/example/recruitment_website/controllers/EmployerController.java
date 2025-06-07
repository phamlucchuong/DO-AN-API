package com.example.recruitment_website.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.recruitment_website.dtos.JobDTO;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/employer")
public class EmployerController {

    private static final Logger logger = LoggerFactory.getLogger(EmployerController.class);

    @GetMapping("/")
    public String employerHomePage() {
        return "employer/home";
    }

    @GetMapping("/login")
    public String employerLoginPage() {
        return "employer/login";
    }

    @GetMapping("/register")
    public String employerRegisterPage() {
        return "employer/register";
    }

    @GetMapping("/profile")
    public String employerProfilePage() {
        logger.debug("Truy cập trang profile");
        return "employer/profile";
    }

    @GetMapping("/dashboard")
    public String dashboardPage(Model model, HttpServletRequest request) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "employer/dashboard";
    }

    @GetMapping("/post-job")
    public String postJobPage(Model model, HttpServletRequest request) {
        model.addAttribute("requestURI", request.getRequestURI());
        model.addAttribute("job", new JobDTO());
        return "employer/post-job";
    }

    @GetMapping("/candidates")
    public String candidatesPage(Model model, HttpServletRequest request) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "employer/candidates";
    }

    @GetMapping("/statistics")
    public String statisticsPage(Model model, HttpServletRequest request) {
        model.addAttribute("requestURI", request.getRequestURI());
        return "employer/statistics";
    }

    @GetMapping("/job-detail/{id}")
    public String showJobDetail(@PathVariable Long id, Model model) {
        model.addAttribute("jobId", id);
        return "employer/job-detail";
    }

}
