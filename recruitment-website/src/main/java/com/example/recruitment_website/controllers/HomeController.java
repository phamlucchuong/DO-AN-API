package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomeController {
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
    public String companyDetail(@RequestParam(value = "id", required = false) Integer companyId) {
        return "details/company-detail";
    }

    @GetMapping("/job-detail")
    public String jobDetail(@RequestParam(value = "id", required = false) Integer jobId) {
        return "details/job-detail";
    }

    @GetMapping("/employee-profile")
    public String profileDetail() {
        return "employee/profile-detail"; 
    }

    @GetMapping("/admin")
    public String admin(){
        return "/admin/login";
    }

}
