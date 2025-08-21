import { Navigation } from "@/components/Navigation";
import { TrainersPage } from "@/components/TrainersPage";

const TrainersWithNav = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full px-4 py-8">
        <TrainersPage />
      </main>
    </div>
  );
};

export default TrainersWithNav;


