import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Learners",
    href: "/learners",
    icon: Users,
  },
];

export const Navigation = () => {
  return (
    <nav className="bg-surface border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CourseAdmin
              </h1>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) =>
                      cn(
                        "inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-muted hover:text-primary"
                      )
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <span className="text-sm text-text-secondary px-3 py-1 bg-muted rounded-full">
                Admin Panel
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};