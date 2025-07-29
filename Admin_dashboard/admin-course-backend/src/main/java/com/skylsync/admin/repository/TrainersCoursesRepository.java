package com.skylsync.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.skylsync.admin.entity.TrainersCourses;

@Repository
public interface TrainersCoursesRepository extends JpaRepository<TrainersCourses, Integer> {
    
    @Query("SELECT tc FROM TrainersCourses tc WHERE tc.courseId = :courseId")
    List<TrainersCourses> findByCourseId(@Param("courseId") Integer courseId);
    
    @Query("SELECT tc FROM TrainersCourses tc WHERE tc.trainerUserId = :trainerUserId")
    List<TrainersCourses> findByTrainerUserId(@Param("trainerUserId") Integer trainerUserId);
    
    @Query("SELECT tc FROM TrainersCourses tc WHERE tc.courseId = :courseId AND tc.trainerUserId = :trainerUserId")
    Optional<TrainersCourses> findByCourseIdAndTrainerUserId(@Param("courseId") Integer courseId, @Param("trainerUserId") Integer trainerUserId);
    
    @Query("SELECT COUNT(tc) > 0 FROM TrainersCourses tc WHERE tc.courseId = :courseId AND tc.trainerUserId = :trainerUserId")
    boolean existsByCourseIdAndTrainerUserId(@Param("courseId") Integer courseId, @Param("trainerUserId") Integer trainerUserId);
} 