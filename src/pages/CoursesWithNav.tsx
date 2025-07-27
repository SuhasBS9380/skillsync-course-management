import { Navigation } from "@/components/Navigation";
import { CoursesPage } from "@/components/CoursesPage";

const CoursesWithNav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full px-4 py-8">
        <CoursesPage />
      </main>
    </div>
  );
};

export default CoursesWithNav;