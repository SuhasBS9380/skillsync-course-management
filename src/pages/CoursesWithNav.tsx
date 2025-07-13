import { Navigation } from "@/components/Navigation";
import { CoursesPage } from "@/components/CoursesPage";

const CoursesWithNav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CoursesPage />
      </main>
    </div>
  );
};

export default CoursesWithNav;