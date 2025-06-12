package com.example.recruitment_website.restcontrollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.recruitment_website.services.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/chart-data")
    @ResponseBody
    public Map<String, Object> getChartData(@RequestParam String period) {
        int months = 6;

        switch (period) {
            case "6months":
                months = 6;
                break;
            case "1year":
                months = 12;
                break;
            case "2years":
                months = 24;
                break;
            default:
                months = 6;
        }

        return adminService.getChartData(months);
    }

    @GetMapping("/job-type-distribution")
    @ResponseBody
    public Map<String, Integer> getJobTypeDistribution() {
        return adminService.getJobTypeDistribution();
    }
}
