package com.skylsync.admin.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skylsync.admin.entity.Course;
import com.skylsync.admin.entity.CourseMaterial;
import com.skylsync.admin.service.CourseService;

@RestController
@RequestMapping("/api/admin/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/with-trainers")
    public List<Object[]> getAllCoursesWithTrainers() {
        return courseService.getAllCoursesWithTrainerInfo();
    }

    @GetMapping("/{id}")
    public Optional<Course> getCourseById(@PathVariable Integer id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Integer id, @RequestBody Course course) {
        course.setCourseId(id);
        return courseService.saveCourse(course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Integer id) {
        courseService.deleteCourse(id);
    }

    @GetMapping("/{id}/materials")
    public List<CourseMaterial> getMaterials(@PathVariable Integer id) {
        return courseService.getMaterialsByCourseId(id);
    }

    @PostMapping("/{id}/materials")
    public CourseMaterial addMaterial(@PathVariable Integer id, @RequestBody CourseMaterial material) {
        // Set course reference
        Course course = new Course();
        course.setCourseId(id);
        material.setCourse(course);
        return courseService.saveMaterial(material);
    }

    @DeleteMapping("/materials/{materialId}")
    public void deleteMaterial(@PathVariable Integer materialId) {
        courseService.deleteMaterial(materialId);
    }
} 