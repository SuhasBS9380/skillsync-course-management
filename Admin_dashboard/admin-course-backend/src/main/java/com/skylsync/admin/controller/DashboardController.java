package com.skylsync.admin.controller;

import com.skylsync.admin.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/summary")
    public Map<String, Long> getDashboardSummary() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("totalLearners", dashboardService.getTotalLearners());
        summary.put("totalTrainers", dashboardService.getTotalTrainers());
        summary.put("totalCourses", dashboardService.getTotalCourses());
        summary.put("activeCourses", dashboardService.getActiveCourses());
        return summary;
    }
} 