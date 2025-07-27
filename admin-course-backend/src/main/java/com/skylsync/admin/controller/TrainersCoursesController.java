package com.skylsync.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skylsync.admin.entity.TrainersCourses;
import com.skylsync.admin.service.TrainersCoursesService;

@RestController
@RequestMapping("/api/admin/trainers-courses")
public class TrainersCoursesController {
    
    @Autowired
    private TrainersCoursesService trainersCoursesService;
    
    @PostMapping("/assign")
    public ResponseEntity<TrainersCourses> assignTrainerToCourse(@RequestBody Map<String, Integer> request) {
        Integer trainerUserId = request.get("trainerUserId");
        Integer courseId = request.get("courseId");
        
        if (trainerUserId == null || courseId == null) {
            return ResponseEntity.badRequest().build();
        }
        
        try {
            TrainersCourses assignment = trainersCoursesService.assignTrainerToCourse(trainerUserId, courseId);
            return ResponseEntity.ok(assignment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<TrainersCourses>> getAssignmentsByCourseId(@PathVariable Integer courseId) {
        List<TrainersCourses> assignments = trainersCoursesService.getAssignmentsByCourseId(courseId);
        return ResponseEntity.ok(assignments);
    }
    
    @GetMapping("/trainer/{trainerUserId}")
    public ResponseEntity<List<TrainersCourses>> getAssignmentsByTrainerId(@PathVariable Integer trainerUserId) {
        List<TrainersCourses> assignments = trainersCoursesService.getAssignmentsByTrainerId(trainerUserId);
        return ResponseEntity.ok(assignments);
    }
    
    @GetMapping("/check/{courseId}/{trainerUserId}")
    public ResponseEntity<Boolean> isTrainerAssignedToCourse(@PathVariable Integer courseId, @PathVariable Integer trainerUserId) {
        boolean isAssigned = trainersCoursesService.isTrainerAssignedToCourse(courseId, trainerUserId);
        return ResponseEntity.ok(isAssigned);
    }
    
    @DeleteMapping("/remove/{courseId}/{trainerUserId}")
    public ResponseEntity<Void> removeTrainerFromCourse(@PathVariable Integer courseId, @PathVariable Integer trainerUserId) {
        trainersCoursesService.removeTrainerFromCourse(courseId, trainerUserId);
        return ResponseEntity.ok().build();
    }
} 