import { NavLink } from "react-router-dom";
import { LayoutDashboard, BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

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
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Leftmost position */}
          <div className="flex-shrink-0">
            <Logo size="lg" />
          </div>
          
          {/* Navigation Items - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-2">
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