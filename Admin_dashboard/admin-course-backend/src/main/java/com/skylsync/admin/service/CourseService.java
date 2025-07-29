package com.skylsync.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skylsync.admin.entity.Course;
import com.skylsync.admin.entity.CourseMaterial;
import com.skylsync.admin.repository.CourseMaterialRepository;
import com.skylsync.admin.repository.CourseRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private CourseMaterialRepository courseMaterialRepository;
    
    @PersistenceContext
    private EntityManager entityManager;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Integer id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Integer id) {
        courseRepository.deleteById(id);
    }

    public List<CourseMaterial> getMaterialsByCourseId(Integer courseId) {
        return courseMaterialRepository.findAll().stream().filter(m -> m.getCourse().getCourseId().equals(courseId)).toList();
    }

    public CourseMaterial saveMaterial(CourseMaterial material) {
        return courseMaterialRepository.save(material);
    }

    public void deleteMaterial(Integer materialId) {
        courseMaterialRepository.deleteById(materialId);
    }

    public List<Object[]> getAllCoursesWithTrainerInfo() {
        String sql = "SELECT c.course_id, c.title, c.description, c.start_date, c.end_date, c.max_capacity, c.status, " +
                    "u.first_name, u.last_name, u.email " +
                    "FROM courses c " +
                    "LEFT JOIN trainerscourses tc ON c.course_id = tc.course_id " +
                    "LEFT JOIN users u ON tc.trainer_user_id = u.user_id " +
                    "ORDER BY c.created_at DESC";
        return entityManager.createNativeQuery(sql).getResultList();
    }
} 