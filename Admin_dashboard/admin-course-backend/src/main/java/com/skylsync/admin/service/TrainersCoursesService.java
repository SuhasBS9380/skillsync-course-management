package com.skylsync.admin.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skylsync.admin.entity.TrainersCourses;
import com.skylsync.admin.repository.TrainersCoursesRepository;

@Service
public class TrainersCoursesService {
    
    @Autowired
    private TrainersCoursesRepository trainersCoursesRepository;
    
    public TrainersCourses assignTrainerToCourse(Integer trainerUserId, Integer courseId) {
        // Check if assignment already exists
        if (trainersCoursesRepository.existsByCourseIdAndTrainerUserId(courseId, trainerUserId)) {
            throw new RuntimeException("Trainer is already assigned to this course");
        }
        
        // Remove any existing assignments for this course (ensure only one trainer per course)
        List<TrainersCourses> existingAssignments = trainersCoursesRepository.findByCourseId(courseId);
        for (TrainersCourses existing : existingAssignments) {
            trainersCoursesRepository.delete(existing);
        }
        
        TrainersCourses assignment = new TrainersCourses(trainerUserId, courseId, LocalDate.now());
        return trainersCoursesRepository.save(assignment);
    }
    
    public List<TrainersCourses> getAssignmentsByCourseId(Integer courseId) {
        return trainersCoursesRepository.findByCourseId(courseId);
    }
    
    public List<TrainersCourses> getAssignmentsByTrainerId(Integer trainerUserId) {
        return trainersCoursesRepository.findByTrainerUserId(trainerUserId);
    }
    
    public boolean isTrainerAssignedToCourse(Integer courseId, Integer trainerUserId) {
        return trainersCoursesRepository.existsByCourseIdAndTrainerUserId(courseId, trainerUserId);
    }
    
    public void removeTrainerFromCourse(Integer courseId, Integer trainerUserId) {
        Optional<TrainersCourses> assignment = trainersCoursesRepository.findByCourseIdAndTrainerUserId(courseId, trainerUserId);
        if (assignment.isPresent()) {
            trainersCoursesRepository.delete(assignment.get());
        }
    }
} 