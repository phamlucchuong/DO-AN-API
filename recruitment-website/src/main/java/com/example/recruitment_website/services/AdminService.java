package com.example.recruitment_website.services;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.recruitment_website.enums.EmploymentType;
import com.example.recruitment_website.repositories.JobRepository;

@Service
public class AdminService {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployerService employerService;

    public Map<String, Object> getChartData(int period) {
        Map<String, Object> data = new HashMap<>();

        String[] labels = new String[period];
        int[] newJobs = new int[period];
        int[] newEmployers = new int[period];

        LocalDate now = LocalDate.now();

        for (int i = 0; i < period; i++) {
            LocalDate month = now.minusMonths(period - 1 - i);
            String label = "Tháng " + month.getMonthValue() + "/" + month.getYear();
            labels[i] = label;

            int countJobs = jobService.countJobsByMonthAndYear(month.getMonthValue(), month.getYear());
            int countEmployers = employerService.countEmployersByMonthAndYear(month.getMonthValue(), month.getYear());

            newJobs[i] = countJobs;
            newEmployers[i] = countEmployers;
        }

        data.put("labels", labels);
        data.put("newJobs", newJobs);
        data.put("newEmployers", newEmployers);

        return data;
    }

    public Map<String, Integer> getJobTypeDistribution() {
        Map<String, Integer> result = new HashMap<>();

        for (EmploymentType type : EmploymentType.values()) {
            int count = jobRepository.countJobsByEmploymentType(type);
            result.put(type.getDisplayName(), count);
        }

        return result;
    }

}
