import { Navigation } from "@/components/Navigation";
import LearnersPage from "./LearnersPage";

const LearnersWithNav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full px-4 py-8">
        <LearnersPage />
      </main>
    </div>
  );
};

export default LearnersWithNav;