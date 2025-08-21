import { useState, useEffect } from "react";
import { Plus, Edit, Users, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [showLearners, setShowLearners] = useState(false);
  const [learners, setLearners] = useState<Array<{userId:number;firstName:string;lastName:string;email:string}>>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/admin/courses/with-trainers");
        const data = await res.json();
        const base = data.map((c: any) => ({
          id: c[0]?.toString() ?? "",
          courseId: c[0],
          title: c[1],
          description: c[2],
          startDate: c[3],
          endDate: c[4],
          enrolledCount: c[10] ?? 0,
          maxCapacity: c[5],
          status: c[6],
          courseLinks: [],
          assignedTrainer: c[7]
            ? { firstName: c[7], lastName: c[8], email: c[9] }
            : undefined,
        } as Course));

        // Fallback: if backend does not populate count, compute via learners endpoint
        const withCounts = await Promise.all(
          base.map(async (course) => {
            if (course.enrolledCount && course.enrolledCount > 0) return course;
            const courseId = parseInt(course.courseId?.toString() || course.id);
            try {
              const lr = await fetch(`http://localhost:8081/api/admin/enrollments/course/${courseId}/learners`);
              const learners = await lr.json();
              const count = Array.isArray(learners) ? learners.length : 0;
              return { ...course, enrolledCount: count } as Course;
            } catch {
              return course;
            }
          })
        );
        setCourses(withCounts);
      } catch {
        setCourses([]);
      }
    };
    load();
  }, [showForm]);

  const computeStatus = (startDate: string, endDate: string): "upcoming" | "active" | "ended" => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "upcoming";
    if (now < start) return "upcoming";
    if (now > end) return "ended";
    return "active";
  };

  const getStatusStyle = (status: "upcoming" | "active" | "ended") => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "upcoming":
        return "bg-accent text-accent-foreground";
      case "ended":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
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

  const handleOpenLearners = async (course: Course) => {
    setSelectedCourse(course);
    setShowLearners(true);
    const courseId = parseInt(course.courseId?.toString() || course.id);
    try {
      const res = await fetch(`http://localhost:8081/api/admin/enrollments/course/${courseId}/learners`);
      const data = await res.json();
      setLearners(data);
    } catch {
      setLearners([]);
    }
  };

  const handleTrainerAssigned = (trainerId: number) => {
    // Refresh the courses list to show the updated trainer assignment
    console.log(`Trainer ${trainerId} assigned to course ${selectedCourse?.id}`);
    // Trigger a refresh of the courses list
    fetch("http://localhost:8081/api/admin/courses/with-trainers")
      .then(res => res.json())
      .then(async data => {
        const base = data.map((c: any) => ({
          id: c[0]?.toString() ?? "",
          courseId: c[0],
          title: c[1],
          description: c[2],
          startDate: c[3],
          endDate: c[4],
          enrolledCount: c[10] ?? 0,
          maxCapacity: c[5],
          status: c[6],
          courseLinks: [],
          assignedTrainer: c[7]
            ? { firstName: c[7], lastName: c[8], email: c[9] }
            : undefined,
        } as Course));
        const withCounts = await Promise.all(
          base.map(async (course) => {
            if (course.enrolledCount && course.enrolledCount > 0) return course;
            const courseId = parseInt(course.courseId?.toString() || course.id);
            try {
              const lr = await fetch(`http://localhost:8081/api/admin/enrollments/course/${courseId}/learners`);
              const learners = await lr.json();
              const count = Array.isArray(learners) ? learners.length : 0;
              return { ...course, enrolledCount: count } as Course;
            } catch {
              return course;
            }
          })
        );
        setCourses(withCounts);
      })
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
    <div className="space-y-8 px-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Courses</h1>
          <p className="text-text-secondary mt-1">
            Manage your published courses and create new ones.
          </p>
        </div>
        <Button onClick={handleNewCourse} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="relative overflow-hidden border border-border/60 bg-card/90 backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            <CardHeader className="pb-3 pt-4">
              <div className="flex justify-between items-start gap-3">
                <CardTitle className="text-lg font-semibold text-foreground leading-snug line-clamp-2">
                  {course.title}
                </CardTitle>
                {(() => {
                  const status = computeStatus(course.startDate, course.endDate);
                  const label = status === 'ended' ? 'Ended' : status === 'active' ? 'Active' : 'Upcoming';
                  return (
                    <Badge className={getStatusStyle(status)}>{label}</Badge>
                  );
                })()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
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

              <div className="flex gap-2 pt-2">
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
                  variant="outline"
                  size="sm"
                  onClick={() => handleAssignTrainer(course)}
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {course.assignedTrainer ? "Change Trainer" : "Assign"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenLearners(course)}
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Learners
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

      <Dialog open={showLearners} onOpenChange={(v) => { if(!v){ setShowLearners(false); setLearners([]);} }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Learners - {selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {learners.length === 0 ? (
              <div className="text-sm text-text-secondary">No learners enrolled.</div>
            ) : (
              learners.map(l => (
                <div key={l.userId} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{l.firstName} {l.lastName}</div>
                    <div className="text-sm text-text-secondary">{l.email}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};