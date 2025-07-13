import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  trend?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {trend && (
        <p className="text-xs text-success mt-1">
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalLearners: "324",
    totalTrainees: "156", 
    totalCourses: "28",
    activeCourses: "18"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-text-secondary mt-2">
          Welcome back! Here's an overview of your course management platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Learners"
          value={stats.totalLearners}
          icon={Users}
          trend="+12% from last month"
        />
        <StatsCard
          title="Total Trainees"
          value={stats.totalTrainees}
          icon={GraduationCap}
          trend="+8% from last month"
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          trend="+3 new courses"
        />
        <StatsCard
          title="Active Courses"
          value={stats.activeCourses}
          icon={TrendingUp}
          trend="64% engagement rate"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    New learner enrolled in "React Fundamentals"
                  </p>
                  <p className="text-xs text-text-secondary">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Course "Advanced JavaScript" published
                  </p>
                  <p className="text-xs text-text-secondary">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Assignment submitted by John Doe
                  </p>
                  <p className="text-xs text-text-secondary">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">Create New Course</div>
                <div className="text-sm text-text-secondary">Start building your next course</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">Add Learner</div>
                <div className="text-sm text-text-secondary">Enroll a new student</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">View Reports</div>
                <div className="text-sm text-text-secondary">Analyze learning progress</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};