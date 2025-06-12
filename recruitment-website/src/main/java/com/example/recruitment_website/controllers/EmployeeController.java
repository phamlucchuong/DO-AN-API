package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/employee")
public class EmployeeController {
    
    @GetMapping("/employers")
    public String employersPage() {
        return "employee/employers"; 
    }
}
