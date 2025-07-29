import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
}

const StatsCard = ({ title, value, icon: Icon, onClick }: StatsCardProps) => (
  <Card 
    className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-white border-0 shadow-lg hover:shadow-2xl"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl -translate-y-16 translate-x-16" />
    
    <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-4 pt-8">
      <div className="space-y-2">
        <CardTitle className="text-sm font-medium text-text-secondary uppercase tracking-widest">
          {title}
        </CardTitle>
        <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {value}
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="relative p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </CardHeader>
    
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
  </Card>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLearners: "-",
    totalTrainees: "-",
    totalCourses: "-",
    activeCourses: "-"
  });
  useEffect(() => {
    fetch("http://localhost:8081/api/admin/dashboard/summary")
      .then(res => res.json())
      .then(data => setStats({
        totalLearners: data.totalLearners?.toString() ?? "-",
        totalTrainees: data.totalTrainers?.toString() ?? "-",
        totalCourses: data.totalCourses?.toString() ?? "-",
        activeCourses: data.activeCourses?.toString() ?? "-"
      }))
      .catch(() => setStats({
        totalLearners: "-",
        totalTrainees: "-",
        totalCourses: "-",
        activeCourses: "-"
      }));
  }, []);
  
  // Background Design
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-secondary/35 to-accent/35 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-accent/30 to-primary/30 rounded-full blur-2xl" />
      
      {/* Content */}
      <div className="relative space-y-12 py-12 px-4 w-full">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Admin Dashboard
          </h1>
          <p className="text-gray-700 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Welcome back! Here's an overview of your course management platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 w-full">
          <StatsCard
            title="Total Learners"
            value={stats.totalLearners}
            icon={Users}
            onClick={() => navigate('/learners')}
          />
          <StatsCard
            title="Total Trainees"
            value={stats.totalTrainees}
            icon={GraduationCap}
            onClick={() => navigate('/learners')}
          />
          <StatsCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            onClick={() => navigate('/courses')}
          />
          <StatsCard
            title="Active Courses"
            value={stats.activeCourses}
            icon={TrendingUp}
            onClick={() => navigate('/courses')}
          />
        </div>
      </div>
    </div>
  );
};