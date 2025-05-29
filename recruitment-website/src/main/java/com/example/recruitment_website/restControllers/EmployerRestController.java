package com.example.recruitment_website.restControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.repositories.EmployerRepository;


@RestController
@RequestMapping("/api/employer")
public class EmployerRestController {
    @Autowired
    private EmployerRepository employerRepository;
    
    // @PostMapping("/addEmployer")
    // public String postMethodName(@RequestBody String entity) {
        
    //     return "addEmployer";
    // }

}
