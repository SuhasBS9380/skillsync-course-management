package com.skylsync.admin.service;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class DashboardService {
    @PersistenceContext
    private EntityManager entityManager;

    public Long getTotalLearners() {
        String sql = "SELECT COUNT(DISTINCT U.user_id) FROM users U JOIN userroles UR ON U.user_id = UR.user_id JOIN roles R ON UR.role_id = R.role_id WHERE R.role_name = 'Student'";
        return ((Number) entityManager.createNativeQuery(sql).getSingleResult()).longValue();
    }

    public Long getTotalTrainers() {
        String sql = "SELECT COUNT(DISTINCT U.user_id) FROM users U JOIN userroles UR ON U.user_id = UR.user_id JOIN roles R ON UR.role_id = R.role_id WHERE R.role_name = 'Trainer'";
        return ((Number) entityManager.createNativeQuery(sql).getSingleResult()).longValue();
    }

    public Long getTotalCourses() {
        String sql = "SELECT COUNT(course_id) FROM courses";
        return ((Number) entityManager.createNativeQuery(sql).getSingleResult()).longValue();
    }

    public Long getActiveCourses() {
        String sql = "SELECT COUNT(course_id) FROM courses WHERE status = 'active'";
        return ((Number) entityManager.createNativeQuery(sql).getSingleResult()).longValue();
    }
} 