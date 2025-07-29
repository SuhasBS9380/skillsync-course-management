# SkylSync Admin Course Management System

A comprehensive full-stack course management platform built with React frontend and Spring Boot backend, designed for educational institutions to manage courses, trainers, learners, and assignments.

## 🚀 Features

### Admin Dashboard
- **Dashboard Overview**: Real-time statistics and analytics
- **Course Management**: Create, edit, and manage courses with materials
- **Trainer Assignment**: Assign and change trainers for courses (one trainer per course)
- **Learner Management**: View and manage student enrollments
- **Responsive Design**: Modern UI with animated backgrounds and professional styling

### Course Management
- **Course Creation**: Add new courses with title, description, dates, capacity, and level
- **Course Materials**: Upload and manage course materials and links
- **Trainer Assignment**: Assign trainers to courses with easy reassignment
- **Status Tracking**: Track course status (active, upcoming, archived)

### User Management
- **Role-Based Access**: Admin, Trainer, and Student roles
- **User Profiles**: Complete user information management
- **Enrollment Tracking**: Monitor student progress and completion

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router DOM** for navigation
- **React Hook Form** for form management

### Backend
- **Spring Boot 3** with Java 17
- **Spring Data JPA** for database operations
- **MySQL** database
- **Maven** for dependency management
- **RESTful API** design

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Java 17** (JDK)
- **MySQL** (v8.0 or higher)
- **Maven** (v3.6 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SuhasBS9380/skillsync-learners-admin-dashboard-.git
cd admin-course-vista
```

### 2. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE course_management;
USE course_management;
```

2. Run the provided SQL schema (see `database-schema.sql` in the project root)

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd admin-course-backend
```

2. Configure database connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/course_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run the backend:
```bash
# Using Maven wrapper
./mvnw spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

The backend will start on `http://localhost:8081`

### 4. Frontend Setup

1. Navigate to the project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📁 Project Structure

```
admin-course-vista/
├── admin-course-backend/          # Spring Boot backend
│   ├── src/main/java/com/skylsync/admin/
│   │   ├── controller/            # REST controllers
│   │   ├── service/              # Business logic
│   │   ├── repository/           # Data access layer
│   │   ├── entity/               # JPA entities
│   │   └── dto/                  # Data transfer objects
│   └── src/main/resources/
│       └── application.properties # Configuration
├── src/                          # React frontend
│   ├── components/               # React components
│   ├── pages/                    # Page components
│   ├── hooks/                    # Custom hooks
│   └── lib/                      # Utilities
├── public/                       # Static assets
└── package.json                  # Frontend dependencies
```

## 🔧 API Endpoints

### Courses
- `GET /api/admin/courses` - Get all courses
- `GET /api/admin/courses/with-trainers` - Get courses with trainer info
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/{id}` - Update course
- `DELETE /api/admin/courses/{id}` - Delete course

### Trainers
- `GET /api/admin/trainers` - Get all trainers
- `POST /api/admin/trainers` - Create trainer

### Trainer Assignments
- `POST /api/admin/trainer-assignments` - Assign trainer to course
- `GET /api/admin/trainer-assignments/course/{courseId}` - Get trainer for course
- `DELETE /api/admin/trainer-assignments/course/{courseId}` - Remove trainer assignment

### Learners
- `GET /api/admin/learners` - Get all learners
- `POST /api/admin/learners` - Create learner

## 🎨 UI Components

### Custom Components
- **Logo**: SkylSync branding component
- **Navigation**: Responsive navigation bar
- **Dashboard**: Main admin dashboard with statistics
- **CourseForm**: Course creation and editing form
- **TrainerAssignmentModal**: Trainer assignment interface
- **StatsCard**: Reusable statistics cards

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Responsive Design**: Mobile-first approach
- **Animated Backgrounds**: Dynamic visual elements

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use (Backend)**
   ```bash
   # Find process using port 8081
   netstat -ano | findstr :8081
   
   # Kill the process (replace PID with actual process ID)
   taskkill /PID <PID> /F
   ```

2. **Database Connection Issues**
   - Verify MySQL is running
   - Check database credentials in `application.properties`
   - Ensure database exists and schema is loaded

3. **Frontend Build Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Git Issues**
   ```bash
   # If you encounter "dubious ownership" error
   git config --global --add safe.directory C:/Users/Public/skylsync/admin-course-vista
   ```

## 📝 Development

### Adding New Features

1. **Backend**: Add new entities, repositories, services, and controllers
2. **Frontend**: Create new components and integrate with API
3. **Database**: Update schema as needed

### Code Style

- **Java**: Follow Spring Boot conventions
- **TypeScript**: Use strict mode and proper typing
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind utility classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **SuhasBS9380** - Initial work

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the frontend library
- Tailwind CSS for the styling framework
- shadcn/ui for the component library

---

**Note**: Make sure to update the database credentials and configuration according to your local setup before running the application.
