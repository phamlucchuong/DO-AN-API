package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.recruitment_website.dtos.JobDTO;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/employer")
public class EmployerController {

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

}
