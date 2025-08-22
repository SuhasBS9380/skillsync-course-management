# 🎓 SkillSync course (admin,Learners) Management System

A comprehensive full-stack learning management platform built with React/TypeScript frontend and Spring Boot backend, designed for educational institutions to manage courses, trainers, learners, and certifications.

## 👥 Team Collaboration

This project was developed as part of **Sasken Technologies Internship Program** through collaborative efforts of:
**Suhas B S**, **Srijaini M**, and **Harshith S J**. We extend our heartfelt gratitude to our team for excellent coordination and mutual support throughout the development process.
Special thanks to **Sasken Technologies** for providing this valuable internship opportunity and fostering our professional growth.
The project demonstrates our collective skills in java bakend full-stack development and teamwork in delivering enterprise-grade solutions.

## 🌟 Overview

SkillSync is a dual-dashboard learning management system consisting of:

1. **Admin Dashboard** - For administrators to manage courses, trainers, and learners
2. **Learners Dashboard** - For students to view courses, track progress, and manage certifications

Both dashboards are connected to a shared MySQL database for seamless data management.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Admin Web     │    │  Learners Web   │    │     MySQL       │
│   Dashboard     │    │   Dashboard     │    │   Database      │
│   (React/TS)    │    │ (Spring/Thyme.) │    │  (Port 3000)    │
│   Port 8080     │    │   Port 7000     │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        │
┌─────────────────┐    ┌─────────────────┐                 │
│ Admin Backend   │    │ Learners Backend│                 │
│ (Spring Boot)   │    │ (Spring Boot)   │                 │
│   Port 8081     │    │   Port 7000     │                 │
└─────────────────┘    └─────────────────┘                 │
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                          Shared Database
```

## ✨ Features

### 🔧 Admin Dashboard Features
- **Dashboard Overview**: Real-time statistics and analytics
- **Course Management**: 
  - Create, edit, and manage courses
  - Set course capacity, levels, and schedules
  - Upload course materials and resources
- **Trainer Management**: 
  - Add new trainers with role assignment
  - Assign trainers to courses (one trainer per course)
  - Manage trainer profiles and information
- **Learner Management**: 
  - View student enrollments and progress
  - Monitor completion rates and scores
- **Responsive Design**: Modern UI with shadcn/ui components

### 📚 Learners Dashboard Features
- **Personal Dashboard**: 
  - View enrolled courses and progress
  - Track completion percentages and scores
  - Access certifications earned
- **Course Catalog**: 
  - Browse available courses
  - View course details and materials
- **Progress Tracking**: 
  - Monitor learning progress
  - Track completion status
- **Certification Management**: 
  - View earned certificates
  - Download certification documents

## 🛠️ Technology Stack

### Frontend (Admin Dashboard)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Radix UI** primitives
- **React Hook Form** for form management
- **TanStack Query** for data fetching

### Backend Services
- **Spring Boot 3.5.x** (Java 17/21)
- **Spring Data JPA** with Hibernate
- **MySQL 8** database
- **Thymeleaf** templating (Learners dashboard)
- **Maven** for dependency management

### Database
- **MySQL 8.0+**


## 🔧 Prerequisites

Before running the applications, ensure you have:

- **Java 17 or 21** installed
- **Maven 3.8+** installed
- **Node.js 18+** and **npm** installed
- **MySQL 8.0+** running on port 3000
- **Git** for version control

### Database Setup
Create the required databases in MySQL:
```sql
CREATE DATABASE course_management;
CREATE DATABASE course_manage;
```

## 🗄️ Database Schema

The system uses a shared database schema with the following main tables:

### Core Tables

#### `users` Table
```sql
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    age INT,
    location VARCHAR(255),
    experience TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### `roles` Table
```sql
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert default roles
INSERT INTO roles (role_name) VALUES 
('admin'),
('trainer'), 
('student');
```

#### `userroles` Table
```sql
CREATE TABLE userroles (
    user_role_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    UNIQUE KEY unique_user_role (user_id, role_id)
);
```

#### `courses` Table
```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    max_capacity INT,
    status VARCHAR(20) DEFAULT 'active',
    level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### `enrollments` Table
```sql
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    score DECIMAL(5,2),
    status ENUM('assigned', 'in_progress', 'completed', 'overdue') DEFAULT 'assigned',
    FOREIGN KEY (student_user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

#### `certifications` Table
```sql
CREATE TABLE certifications (
    certificate_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    enrollment_id INT NOT NULL UNIQUE,
    certificate_title VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    certificate_url VARCHAR(2048),
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id)
);
```

#### `course_materials` Table
```sql
CREATE TABLE course_materials (
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    material_name VARCHAR(255) NOT NULL,
    material_url VARCHAR(2048),
    material_type VARCHAR(50),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

#### `trainers_courses` Table
```sql
CREATE TABLE trainers_courses (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    trainer_user_id INT NOT NULL,
    course_id INT NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_user_id) REFERENCES users(user_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    UNIQUE KEY unique_trainer_course (trainer_user_id, course_id)
);
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd admin-course-vista
```

### 2. Database Configuration

1. **Start MySQL** on port 3000 with credentials:
   - Username: `root`
   - Password: `9380102924`

2. **Create Databases**:
   ```sql
   CREATE DATABASE course_management;
   CREATE DATABASE course_manage;
   ```

3. **Update Database Settings** (if needed):
   - Admin Backend: `Admin_dashboard/admin-course-backend/src/main/resources/application.properties`
   - Learners Backend: `learners/src/main/resources/application.properties`

### 3. Backend Setup

#### Admin Backend
```bash
cd Admin_dashboard/admin-course-backend
mvn clean install
```

#### Learners Backend
```bash
cd learners
mvn clean install
```

### 4. Frontend Setup (Admin Dashboard)
```bash
cd Admin_dashboard
npm install
```

## 🏃‍♂️ Running the Applications

### Method 1: Run All Services Individually

#### 1. Start Admin Backend
```bash
cd Admin_dashboard/admin-course-backend
mvn spring-boot:run
```
- **URL**: http://localhost:8081
- **API Base**: http://localhost:8081/api

#### 2. Start Admin Frontend
```bash
cd Admin_dashboard
npm run dev
```
- **URL**: http://localhost:8080

#### 3. Start Learners Dashboard
```bash
cd learners
mvn spring-boot:run
```
- **URL**: http://localhost:7000

### Method 2: Using Multiple Terminals

**Terminal 1 - Admin Backend:**
```bash
cd Admin_dashboard/admin-course-backend && mvn spring-boot:run
```

**Terminal 2 - Admin Frontend:**
```bash
cd Admin_dashboard && npm run dev
```

**Terminal 3 - Learners Dashboard:**
```bash
cd learners && mvn spring-boot:run
```

## 🌐 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Admin Frontend | http://localhost:8080 | React-based admin dashboard |
| Admin Backend API | http://localhost:8081 | Spring Boot REST API |
| Learners Dashboard | http://localhost:7000 | Spring Boot web application |

## 📚 API Documentation


## 📁 Project Structure

```
admin-course-vista/
├── Admin_dashboard/                 # Admin Dashboard Frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CoursesPage.tsx
│   │   │   ├── TrainersPage.tsx
│   │   │   └── ui/                # UI components (shadcn)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility functions
│   │   └── pages/                 # Page components
│   ├── admin-course-backend/       # Admin Backend API
│   │   └── src/main/java/com/skylsync/admin/
│   │       ├── controller/        # REST controllers
│   │       ├── entity/           # JPA entities
│   │       ├── repository/       # Data repositories
│   │       └── service/          # Business logic
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── learners/                       # Learners Dashboard (Full-stack)
│   └── src/main/java/com/example/learners/
│       ├── controller/            # Web controllers
│       ├── entity/               # JPA entities
│       ├── repository/           # Data repositories
│       ├── service/              # Business logic
│       └── resources/
│           ├── templates/        # Thymeleaf templates
│           └── static/          # CSS, JS, images
└── README.md                      # This file
```

## 🔍 Key Features Implementation

### Role-Based Access Control
- **Admin Role**: Full access to manage courses, trainers, and learners
- **Trainer Role**: Access to assigned courses and student progress
- **Student Role**: Access to enrolled courses and personal progress

### Data Synchronization
- Both dashboards share the same MySQL database
- Real-time updates across both applications
- Consistent data models using JPA entities

### Security Features
- Password hashing for user authentication
- Session management for user state
- Input validation and sanitization

## 🔧 Configuration Files

### Admin Backend (`application.properties`)
```properties
spring.application.name=AdminCourseBackend
spring.datasource.url=jdbc:mysql://localhost:3000/course_management
spring.datasource.username=root
spring.datasource.password=9380102924
spring.jpa.hibernate.ddl-auto=update
server.port=8081
```

### Learners Backend (`application.properties`)
```properties
spring.application.name=learners
spring.datasource.url=jdbc:mysql://localhost:3000/course_manage
spring.datasource.username=root
spring.datasource.password=9380102924
spring.jpa.hibernate.ddl-auto=none
server.port=7000
```

### Frontend Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  // ... other configurations
});
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify MySQL is running on port 3000
   - Check database credentials in application.properties
   - Ensure databases `course_management` and `course_manage` exist

2. **Port Already in Use**
   - Admin Frontend: Change port in `vite.config.ts`
   - Admin Backend: Change `server.port` in `application.properties`
   - Learners Dashboard: Change `server.port` in `application.properties`

3. **Frontend Build Issues**
   - Run `npm install` to install dependencies
   - Clear node_modules and reinstall if needed
   - Check Node.js version compatibility

4. **Backend Compilation Issues**
   - Verify Java version (17 or 21)
   - Run `mvn clean install` to rebuild
   - Check Maven dependencies






**Happy Learning! 🎓**

For support or questions, please open an issue in the repository.
