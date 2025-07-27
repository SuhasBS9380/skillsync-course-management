package com.skylsync.admin.repository;

import com.skylsync.admin.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
} 