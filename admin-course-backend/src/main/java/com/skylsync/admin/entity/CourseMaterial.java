package com.skylsync.admin.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "coursematerials")
public class CourseMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_id")
    private Integer materialId;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "material_url", nullable = false, length = 2048)
    private String materialUrl;

    @Column(name = "material_description", length = 255)
    private String materialDescription;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;

    // getters and setters
    public Integer getMaterialId() { return materialId; }
    public void setMaterialId(Integer materialId) { this.materialId = materialId; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public String getMaterialUrl() { return materialUrl; }
    public void setMaterialUrl(String materialUrl) { this.materialUrl = materialUrl; }
    public String getMaterialDescription() { return materialDescription; }
    public void setMaterialDescription(String materialDescription) { this.materialDescription = materialDescription; }
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
} 