package com.skylsync.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skylsync.admin.entity.Enrollment;
import com.skylsync.admin.dto.CourseLearnerDTO;
import com.skylsync.admin.repository.EnrollmentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Optional<Enrollment> getEnrollmentById(Integer id) {
        return enrollmentRepository.findById(id);
    }

    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public void deleteEnrollment(Integer id) {
        enrollmentRepository.deleteById(id);
    }

    public List<Enrollment> getEnrollmentsByCourseId(Integer courseId) {
        String sql = "SELECT * FROM enrollments WHERE course_id = :courseId ORDER BY enrollment_date DESC";
        return entityManager.createNativeQuery(sql, Enrollment.class)
                .setParameter("courseId", courseId)
                .getResultList();
    }

    public List<CourseLearnerDTO> getLearnersByCourseId(Integer courseId) {
        String sql = "SELECT u.user_id, u.first_name, u.last_name, u.email " +
                "FROM enrollments e JOIN users u ON e.student_user_id = u.user_id " +
                "WHERE e.course_id = :courseId ORDER BY e.enrollment_date DESC";
        List<Object[]> rows = entityManager.createNativeQuery(sql)
                .setParameter("courseId", courseId)
                .getResultList();
        return rows.stream()
                .map(r -> new CourseLearnerDTO(((Number) r[0]).intValue(), r[1].toString(), r[2].toString(), r[3].toString()))
                .toList();
    }
} 