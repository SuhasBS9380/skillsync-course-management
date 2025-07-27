package com.skylsync.admin.controller;

import com.skylsync.admin.entity.Enrollment;
import com.skylsync.admin.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/enrollments")
public class EnrollmentController {
    @Autowired
    private EnrollmentService enrollmentService;

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/{id}")
    public Optional<Enrollment> getEnrollmentById(@PathVariable Integer id) {
        return enrollmentService.getEnrollmentById(id);
    }

    @PostMapping
    public Enrollment createEnrollment(@RequestBody Enrollment enrollment) {
        return enrollmentService.saveEnrollment(enrollment);
    }

    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable Integer id, @RequestBody Enrollment enrollment) {
        enrollment.setEnrollmentId(id);
        return enrollmentService.saveEnrollment(enrollment);
    }

    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable Integer id) {
        enrollmentService.deleteEnrollment(id);
    }
} 