package com.example.recruitment_website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.example.uml.controllers",
    "com.example.uml.restcontrollers",
    "com.example.uml.services",
    "com.example.uml.repositories"
})
public class RecruitmentWebsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecruitmentWebsiteApplication.class, args);
	}

}
