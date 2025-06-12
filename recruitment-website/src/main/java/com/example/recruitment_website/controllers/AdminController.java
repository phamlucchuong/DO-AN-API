package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @GetMapping("/")
    public String loginPage(){
        return "/admin/login";
    }

    @GetMapping("/dashboard")
    public String adminPage() {
        return "/admin/dashboard";
    }

    @GetMapping("/jobs-management")
    public String jobsManagement() {
        return "/admin/jobs-management";
    }

    @GetMapping("/employers-management")
    public String employersManagement() {
        return "/admin/employers-management";
    }
}
