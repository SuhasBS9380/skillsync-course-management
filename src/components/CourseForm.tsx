import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

interface CourseFormProps {
  course?: Course | null;
  onCancel: () => void;
  onSave: (courseData: any) => void;
}

export const CourseForm = ({ course, onCancel, onSave }: CourseFormProps) => {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    startDate: course?.startDate || "",
    endDate: course?.endDate || "",
    maxCapacity: course?.maxCapacity || 20,
    courseLinks: course?.courseLinks || [""]
  });
  const lastLoadedCourseId = useRef<string | undefined>(undefined);

  // Keep formData in sync with course prop
  useEffect(() => {
    setFormData({
      title: course?.title || "",
      description: course?.description || "",
      startDate: course?.startDate || "",
      endDate: course?.endDate || "",
      maxCapacity: course?.maxCapacity || 20,
      courseLinks: course?.courseLinks || [""]
    });
  }, [course]);

  // Fetch course materials if editing and only if course id changes
  useEffect(() => {
    if (course && course.id && lastLoadedCourseId.current !== course.id) {
      lastLoadedCourseId.current = course.id;
      fetch(`http://localhost:8081/api/admin/courses/${course.id}/materials`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setFormData(prev => ({
              ...prev,
              courseLinks: data.map((m: any) => m.materialUrl)
            }));
          }
        });
    }
  }, [course]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.courseLinks];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      courseLinks: newLinks
    }));
  };

  const addLinkField = () => {
    setFormData(prev => ({
      ...prev,
      courseLinks: [...prev.courseLinks, ""]
    }));
  };

  const removeLinkField = (index: number) => {
    const newLinks = formData.courseLinks.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      courseLinks: newLinks
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredLinks = formData.courseLinks.filter(link => link.trim() !== "");
    // Save course first
    const method = course ? "PUT" : "POST";
    const url = course
      ? `http://localhost:8081/api/admin/courses/${course.id}`
      : "http://localhost:8081/api/admin/courses";
    const courseRes = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        courseLinks: undefined // Don't send links in main course object
      })
    });
    const savedCourse = await courseRes.json();
    // Save materials
    if (filteredLinks.length > 0) {
      await Promise.all(filteredLinks.map(link =>
        fetch(`http://localhost:8081/api/admin/courses/${savedCourse.courseId || savedCourse.id}/materials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ materialUrl: link })
        })
      ));
    }
    onSave({ ...formData, courseLinks: filteredLinks });
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {course ? "Edit Course" : "Create New Course"}
            </h1>
            <p className="text-text-secondary mt-2">
              {course ? "Update course details and settings" : "Fill in the details to create a new course"}
            </p>
          </div>
        </div>

        <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-foreground">Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Course Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe what students will learn in this course"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-foreground">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-foreground">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCapacity" className="text-foreground">Maximum Capacity</Label>
              <Input
                id="maxCapacity"
                type="number"
                value={formData.maxCapacity}
                onChange={(e) => handleInputChange("maxCapacity", parseInt(e.target.value))}
                min="1"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-foreground">Course Links</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLinkField}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Link
                </Button>
              </div>
              
              {formData.courseLinks.map((link, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    placeholder="https://example.com/course-material"
                    className="flex-1"
                  />
                  {formData.courseLinks.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLinkField(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex space-x-4 pt-6">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {course ? "Update Course" : "Create Course"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};