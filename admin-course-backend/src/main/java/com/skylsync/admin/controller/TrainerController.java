package com.skylsync.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skylsync.admin.service.TrainerService;

@RestController
@RequestMapping("/api/admin/trainers")
public class TrainerController {
    @Autowired
    private TrainerService trainerService;

    @GetMapping
    public List<Object[]> getAllTrainers() {
        return trainerService.getAllTrainersWithDetails();
    }
} 