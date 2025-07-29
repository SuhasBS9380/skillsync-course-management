package com.skylsync.admin.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skylsync.admin.dto.LearnerDTO;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class LearnerService {
    @PersistenceContext
    private EntityManager entityManager;

    public List<LearnerDTO> getAllLearnersWithDetails() {
        String sql = "SELECT U.user_id, U.first_name, U.last_name, U.email, U.phone_number, U.age, U.location, U.experience, " +
                "(SELECT C.title FROM enrollments E JOIN courses C ON E.course_id = C.course_id WHERE E.student_user_id = U.user_id ORDER BY E.enrollment_date DESC LIMIT 1) AS current_course_title, " +
                "(SELECT E.score FROM enrollments E WHERE E.student_user_id = U.user_id ORDER BY E.enrollment_date DESC LIMIT 1) AS current_course_score, " +
                "(SELECT E.enrollment_date FROM enrollments E WHERE E.student_user_id = U.user_id ORDER BY E.enrollment_date ASC LIMIT 1) AS earliest_enrollment_date " +
                "FROM users U JOIN userroles UR ON U.user_id = UR.user_id JOIN roles R ON UR.role_id = R.role_id WHERE R.role_name = 'Student' ORDER BY U.created_at DESC";
        List<Object[]> results = entityManager.createNativeQuery(sql).getResultList();
        List<LearnerDTO> learners = new ArrayList<>();
        for (Object[] row : results) {
            System.out.println(Arrays.toString(row)); // Debug log
            learners.add(new LearnerDTO(
                row[0] != null ? ((Number) row[0]).intValue() : null,
                row[1] != null ? row[1].toString() : "",
                row[2] != null ? row[2].toString() : "",
                row[3] != null ? row[3].toString() : "",
                row[4] != null ? row[4].toString() : "",
                row[5] != null ? ((Number) row[5]).intValue() : null,
                row[6] != null ? row[6].toString() : "",
                row[7] != null ? row[7].toString() : "",
                row[8] != null ? row[8].toString() : "",
                row[9] != null ? ((Number) row[9]).doubleValue() : null,
                row[10] != null ? row[10].toString() : ""
            ));
        }
        return learners;
    }
} 