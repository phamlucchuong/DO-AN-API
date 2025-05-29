package com.example.recruitment_website.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HomController {
    @GetMapping("/index")
    public String index(@RequestParam String param) {
        return "index";
    }
    
}
