package com.example.recruitment_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.recruitment_website.controllers",
    "com.example.recruitment_website.restcontrollers",
    "com.example.recruitment_website.services",
    "com.example.recruitment_website.repositories",
    "com.example.recruitment_website.configs",
    "com.example.recruitment_website.mappers",
})
@EntityScan(basePackages = "com.example.recruitment_website.entities")
public class RecruitmentWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentWebsiteApplication.class, args);
	}

}