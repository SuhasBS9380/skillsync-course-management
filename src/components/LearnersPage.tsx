import { useState } from "react";
import { Search, Mail, Phone, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Learner {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentCourse: string;
  score: number;
  enrollmentDate: string;
  status: "active" | "completed" | "paused";
  personalDetails: {
    age: number;
    location: string;
    experience: string;
  };
}

export const LearnersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real app this would come from API
  const [learners] = useState<Learner[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 234-567-8900",
      currentCourse: "React Fundamentals",
      score: 85,
      enrollmentDate: "2024-01-15",
      status: "active",
      personalDetails: {
        age: 28,
        location: "New York, USA",
        experience: "2 years in web development"
      }
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com", 
      phone: "+1 234-567-8901",
      currentCourse: "Advanced JavaScript",
      score: 92,
      enrollmentDate: "2024-01-20",
      status: "active",
      personalDetails: {
        age: 25,
        location: "California, USA",
        experience: "Fresh graduate in Computer Science"
      }
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 234-567-8902", 
      currentCourse: "React Fundamentals",
      score: 78,
      enrollmentDate: "2024-01-10",
      status: "active",
      personalDetails: {
        age: 32,
        location: "Texas, USA",
        experience: "5 years in backend development"
      }
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 234-567-8903",
      currentCourse: "Node.js Backend Development",
      score: 88,
      enrollmentDate: "2024-02-01",
      status: "active",
      personalDetails: {
        age: 29,
        location: "Florida, USA", 
        experience: "3 years in frontend development"
      }
    }
  ]);

  const filteredLearners = learners.filter(learner =>
    learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.currentCourse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Learner["status"]) => {
    switch (status) {
      case "active": return "bg-success text-white";
      case "completed": return "bg-primary text-white";
      case "paused": return "bg-accent text-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-accent";
    return "text-destructive";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learners</h1>
        <p className="text-text-secondary mt-2">
          Manage and monitor all enrolled learners and their progress.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
          <Input
            placeholder="Search learners by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-text-secondary">
          {filteredLearners.length} learner{filteredLearners.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLearners.map((learner) => (
          <Card key={learner.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(learner.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">{learner.name}</CardTitle>
                  <Badge className={getStatusColor(learner.status)}>
                    {learner.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-text-secondary" />
                  <span className="text-text-secondary">{learner.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-text-secondary" />
                  <span className="text-text-secondary">{learner.phone}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Current Course:</span>
                  </div>
                  <p className="text-sm text-primary font-medium">{learner.currentCourse}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">Score:</span>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-accent" />
                    <span className={`text-sm font-bold ${getScoreColor(learner.score)}`}>
                      {learner.score}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Personal Details:</h4>
                <div className="space-y-1 text-sm text-text-secondary">
                  <p><span className="font-medium">Age:</span> {learner.personalDetails.age}</p>
                  <p><span className="font-medium">Location:</span> {learner.personalDetails.location}</p>
                  <p><span className="font-medium">Experience:</span> {learner.personalDetails.experience}</p>
                  <p><span className="font-medium">Enrolled:</span> {new Date(learner.enrollmentDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLearners.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text-secondary">No learners found matching your search criteria.</div>
        </div>
      )}
    </div>
  );
};