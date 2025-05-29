package com.example.recruitment_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.recruitment_website.controllers",
    "com.example.recruitment_website.restControllers",
    "com.example.recruitment_website.services",
    "com.example.recruitment_website.repositories",
    "com.example.recruitment_website.configs"
})
public class RecruitmentWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentWebsiteApplication.class, args);
	}

}