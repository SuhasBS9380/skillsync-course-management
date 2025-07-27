import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="w-full px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
