package com.skylsync.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skylsync.admin.dto.LearnerDTO;
import com.skylsync.admin.service.LearnerService;

@RestController
@RequestMapping("/api/admin/learners")
public class LearnerController {
    @Autowired
    private LearnerService learnerService;

    @GetMapping
    public List<LearnerDTO> getAllLearners() {
        return learnerService.getAllLearnersWithDetails();
    }
} 