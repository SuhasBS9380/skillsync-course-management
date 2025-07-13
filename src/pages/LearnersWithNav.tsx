import { Navigation } from "@/components/Navigation";
import { LearnersPage } from "@/components/LearnersPage";

const LearnersWithNav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LearnersPage />
      </main>
    </div>
  );
};

export default LearnersWithNav;