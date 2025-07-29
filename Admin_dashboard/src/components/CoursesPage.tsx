import { useState, useEffect } from "react";
import { Plus, Edit, Users, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseForm } from "./CourseForm";
import { TrainerAssignmentModal } from "@/components/ui/trainer-assignment-modal";

interface Course {
  id: string;
  courseId?: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  enrolledCount: number;
  maxCapacity: number;
  status: "active" | "upcoming" | "completed";
  courseLinks: string[];
  assignedTrainer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const CoursesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/courses/with-trainers")
      .then(res => res.json())
      .then(data => setCourses(data.map((c: any) => ({
        id: c[0]?.toString() ?? "",
        courseId: c[0], // course_id
        title: c[1], // title
        description: c[2], // description
        startDate: c[3], // start_date
        endDate: c[4], // end_date
        enrolledCount: 0, // You may need to fetch this separately
        maxCapacity: c[5], // max_capacity
        status: c[6], // status
        courseLinks: [], // You may need to fetch materials separately
        assignedTrainer: c[7] ? { // Check if trainer exists
          firstName: c[7], // first_name
          lastName: c[8], // last_name
          email: c[9] // email
        } : undefined
      }))))
      .catch(() => setCourses([]));
  }, [showForm]);

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "active": return "bg-success text-white";
      case "upcoming": return "bg-accent text-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleNewCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleDeleteCourse = (id: string) => {
    fetch(`http://localhost:8081/api/admin/courses/${id}`, { method: "DELETE" })
      .then(() => setCourses(courses => courses.filter(c => c.id !== id && c.courseId?.toString() !== id)));
  };

  const handleAssignTrainer = (course: Course) => {
    setSelectedCourse(course);
    setShowTrainerModal(true);
  };

  const handleTrainerAssigned = (trainerId: number) => {
    // Refresh the courses list to show the updated trainer assignment
    console.log(`Trainer ${trainerId} assigned to course ${selectedCourse?.id}`);
    // Trigger a refresh of the courses list
    fetch("http://localhost:8081/api/admin/courses/with-trainers")
      .then(res => res.json())
      .then(data => setCourses(data.map((c: any) => ({
        id: c[0]?.toString() ?? "",
        courseId: c[0], // course_id
        title: c[1], // title
        description: c[2], // description
        startDate: c[3], // start_date
        endDate: c[4], // end_date
        enrolledCount: 0, // You may need to fetch this separately
        maxCapacity: c[5], // max_capacity
        status: c[6], // status
        courseLinks: [], // You may need to fetch materials separately
        assignedTrainer: c[7] ? { // Check if trainer exists
          firstName: c[7], // first_name
          lastName: c[8], // last_name
          email: c[9] // email
        } : undefined
      }))))
      .catch(() => setCourses([]));
  };

  if (showForm) {
    return (
      <CourseForm
        course={editingCourse}
        onCancel={() => {
          setShowForm(false);
          setEditingCourse(null);
        }}
        onSave={courseData => {
          const method = editingCourse ? "PUT" : "POST";
          const url = editingCourse
            ? `http://localhost:8081/api/admin/courses/${editingCourse.courseId || editingCourse.id}`
            : "http://localhost:8081/api/admin/courses";
          fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseData)
          })
            .then(res => res.json())
            .then(() => {
              setShowForm(false);
              setEditingCourse(null);
            });
        }}
      />
    );
  }

  return (
    <div className="space-y-6 px-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-text-secondary mt-2">
            Manage your published courses and create new ones.
          </p>
        </div>
        <Button onClick={handleNewCourse} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-foreground">{course.title}</CardTitle>
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-text-secondary line-clamp-3">
                {course.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-text-secondary">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Users className="w-4 h-4 mr-2" />
                  {course.enrolledCount}/{course.maxCapacity} enrolled
                </div>
                {course.assignedTrainer && (
                  <div className="flex items-center text-sm text-primary">
                    <Users className="w-4 h-4 mr-2" />
                    Trainer: {course.assignedTrainer.firstName} {course.assignedTrainer.lastName}
                  </div>
                )}
              </div>

              {course.courseLinks.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Course Materials:</p>
                  {course.courseLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Link {index + 1}
                    </a>
                  ))}
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCourse(course)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleAssignTrainer(course)}
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {course.assignedTrainer ? "Change Trainer" : "Assign"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedCourse && (
        <TrainerAssignmentModal
          courseId={parseInt(selectedCourse.courseId?.toString() || selectedCourse.id)}
          courseTitle={selectedCourse.title}
          isOpen={showTrainerModal}
          onClose={() => {
            setShowTrainerModal(false);
            setSelectedCourse(null);
          }}
          onAssign={handleTrainerAssigned}
        />
      )}
    </div>
  );
};