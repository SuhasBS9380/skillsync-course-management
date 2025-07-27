package com.skylsync.admin.repository;

import com.skylsync.admin.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
} 