package com.skylsync.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class TrainerService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Object[]> getAllTrainersWithDetails() {
        String sql = "SELECT U.user_id, U.first_name, U.last_name, U.email, U.phone_number, U.age, U.location, U.experience " +
                "FROM users U JOIN userroles UR ON U.user_id = UR.user_id JOIN roles R ON UR.role_id = R.role_id WHERE R.role_name = 'Trainer' ORDER BY U.created_at DESC";
        return entityManager.createNativeQuery(sql).getResultList();
    }
} 