package com.skylsync.admin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LearnerDTO {
    @JsonProperty("userId")
    private Integer userId;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("phoneNumber")
    private String phoneNumber;
    @JsonProperty("age")
    private Integer age;
    @JsonProperty("location")
    private String location;
    @JsonProperty("experience")
    private String experience;
    @JsonProperty("currentCourse")
    private String currentCourse;
    @JsonProperty("score")
    private Double score;
    @JsonProperty("enrollmentDate")
    private String enrollmentDate;

    public LearnerDTO(Integer userId, String firstName, String lastName, String email, String phoneNumber, Integer age, String location, String experience, String currentCourse, Double score, String enrollmentDate) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.location = location;
        this.experience = experience;
        this.currentCourse = currentCourse;
        this.score = score;
        this.enrollmentDate = enrollmentDate;
    }

    public Integer getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public Integer getAge() { return age; }
    public String getLocation() { return location; }
    public String getExperience() { return experience; }
    public String getCurrentCourse() { return currentCourse; }
    public Double getScore() { return score; }
    public String getEnrollmentDate() { return enrollmentDate; }

    public void setUserId(Integer userId) { this.userId = userId; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setAge(Integer age) { this.age = age; }
    public void setLocation(String location) { this.location = location; }
    public void setExperience(String experience) { this.experience = experience; }
    public void setCurrentCourse(String currentCourse) { this.currentCourse = currentCourse; }
    public void setScore(Double score) { this.score = score; }
    public void setEnrollmentDate(String enrollmentDate) { this.enrollmentDate = enrollmentDate; }
} 