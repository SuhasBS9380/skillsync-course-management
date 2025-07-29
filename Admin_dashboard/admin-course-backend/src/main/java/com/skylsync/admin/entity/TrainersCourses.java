package com.skylsync.admin.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "trainerscourses")
public class TrainersCourses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trainer_course_id")
    private Integer trainerCourseId;

    @Column(name = "trainer_user_id", nullable = false)
    private Integer trainerUserId;

    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @Column(name = "assignment_date")
    private LocalDate assignmentDate;

    // Constructors
    public TrainersCourses() {}

    public TrainersCourses(Integer trainerUserId, Integer courseId, LocalDate assignmentDate) {
        this.trainerUserId = trainerUserId;
        this.courseId = courseId;
        this.assignmentDate = assignmentDate;
    }

    // Getters and Setters
    public Integer getTrainerCourseId() {
        return trainerCourseId;
    }

    public void setTrainerCourseId(Integer trainerCourseId) {
        this.trainerCourseId = trainerCourseId;
    }

    public Integer getTrainerUserId() {
        return trainerUserId;
    }

    public void setTrainerUserId(Integer trainerUserId) {
        this.trainerUserId = trainerUserId;
    }

    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }

    public LocalDate getAssignmentDate() {
        return assignmentDate;
    }

    public void setAssignmentDate(LocalDate assignmentDate) {
        this.assignmentDate = assignmentDate;
    }
} 