import { useState } from "react";
import { Plus, Edit, Users, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseForm } from "./CourseForm";

interface Course {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  enrolledCount: number;
  maxCapacity: number;
  status: "active" | "upcoming" | "completed";
  courseLinks: string[];
}

export const CoursesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Mock data - in real app this would come from API
  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "React Fundamentals",
      description: "Learn the basics of React including components, props, and state management.",
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      enrolledCount: 24,
      maxCapacity: 30,
      status: "active",
      courseLinks: ["https://reactjs.org/docs", "https://github.com/course-materials"]
    },
    {
      id: "2", 
      title: "Advanced JavaScript",
      description: "Deep dive into advanced JavaScript concepts, async programming, and modern ES6+ features.",
      startDate: "2024-02-15",
      endDate: "2024-04-01",
      enrolledCount: 18,
      maxCapacity: 25,
      status: "active",
      courseLinks: ["https://javascript.info", "https://mdn.mozilla.org"]
    },
    {
      id: "3",
      title: "Node.js Backend Development", 
      description: "Build scalable backend applications using Node.js, Express, and databases.",
      startDate: "2024-03-01",
      endDate: "2024-04-30",
      enrolledCount: 0,
      maxCapacity: 20,
      status: "upcoming",
      courseLinks: ["https://nodejs.org/docs"]
    }
  ]);

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

  if (showForm) {
    return (
      <CourseForm
        course={editingCourse}
        onCancel={() => {
          setShowForm(false);
          setEditingCourse(null);
        }}
        onSave={(courseData) => {
          // In real app, this would call API
          console.log("Saving course:", courseData);
          setShowForm(false);
          setEditingCourse(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
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
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};