package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


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

}
