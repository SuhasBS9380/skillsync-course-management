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
    className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-white border-0 shadow-lg hover:shadow-2xl"
    onClick={onClick}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />
    
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
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
  
  // Mock data - in real app this would come from API
  const stats = {
    totalLearners: "324",
    totalTrainees: "156", 
    totalCourses: "28",
    activeCourses: "18"
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-secondary/8 to-accent/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-2xl" />
      
      {/* Content */}
      <div className="relative space-y-12 py-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
            Welcome back! Here's an overview of your course management platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4">
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