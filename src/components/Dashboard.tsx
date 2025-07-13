import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
}

const StatsCard = ({ title, value, icon: Icon, onClick }: StatsCardProps) => (
  <Card 
    className="shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer hover:scale-105 bg-gradient-to-br from-surface to-background border-0"
    onClick={onClick}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
        {title}
      </CardTitle>
      <div className="p-2 rounded-lg bg-gradient-primary">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}</div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from API
  const stats = {
    totalLearners: "324",
    totalTrainees: "156", 
    totalCourses: "28",
    activeCourses: "18"
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-text-secondary text-lg">
          Welcome back! Here's an overview of your course management platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
  );
};