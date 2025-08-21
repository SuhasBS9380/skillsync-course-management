import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, BookOpen, Mail, Phone, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Trainer = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  experience?: string;
};

type Assignment = {
  courseId: number;
  courseTitle: string;
  startDate: string;
  endDate: string;
};

export const TrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [assignmentsByTrainer, setAssignmentsByTrainer] = useState<Record<number, Assignment[]>>({});
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("http://localhost:8081/api/admin/trainers");
      const data = await res.json();
      const ts: Trainer[] = data.map((t: any) => ({
        userId: t[0],
        firstName: t[1],
        lastName: t[2],
        email: t[3],
        phoneNumber: t[4],
        // age: t[5], // available if needed later
        // location: t[6], // available if needed later
        experience: t[7],
      }));
      setTrainers(ts);
      // fetch assignments per trainer
      const entries = await Promise.all(ts.map(async (t) => {
        const resp = await fetch(`http://localhost:8081/api/admin/trainers-courses/trainer/${t.userId}`);
        const raw = await resp.json();
        // Need title and dates; fetch courses for titles and dates
        const enriched: Assignment[] = await Promise.all(raw.map(async (a: any) => {
          const cId = a.courseId;
          const cRes = await fetch(`http://localhost:8081/api/admin/courses/${cId}`);
          const c = await cRes.json();
          return {
            courseId: cId,
            courseTitle: c?.title ?? `Course ${cId}`,
            startDate: c?.startDate ?? "",
            endDate: c?.endDate ?? "",
          };
        }));
        return [t.userId, enriched] as const;
      }));
      const map: Record<number, Assignment[]> = {};
      entries.forEach(([id, list]) => { map[id] = list; });
      setAssignmentsByTrainer(map);
    };
    load();
  }, []);

  const getActiveCount = (list: Assignment[] | undefined) => {
    if (!list || list.length === 0) return 0;
    const now = new Date();
    return list.filter(a => {
      const s = a.startDate ? new Date(a.startDate) : null;
      const e = a.endDate ? new Date(a.endDate) : null;
      if (!s || !e || Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return false;
      return now >= s && now <= e;
    }).length;
  };

  const openSchedule = (t: Trainer) => {
    setSelectedTrainer(t);
    setScheduleOpen(true);
  };

  const deriveStatus = (start: string, end: string): { label: "Active" | "Upcoming" | "Completed"; order: number; className: string } => {
    const now = new Date();
    const s = start ? new Date(start) : null;
    const e = end ? new Date(end) : null;
    if (!s || !e || Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) {
      return { label: "Upcoming", order: 1, className: "bg-accent text-accent-foreground" };
    }
    if (now < s) return { label: "Upcoming", order: 1, className: "bg-accent text-accent-foreground" };
    if (now > e) return { label: "Completed", order: 2, className: "bg-muted text-muted-foreground" };
    return { label: "Active", order: 0, className: "bg-primary text-primary-foreground" };
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Trainers</h1>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {trainers.map((t) => {
          const assignments = assignmentsByTrainer[t.userId] || [];
          const activeNow = getActiveCount(assignments);
          const initials = `${t.firstName?.[0] ?? "?"}${t.lastName?.[0] ?? "?"}`;
          return (
            <Card key={t.userId} className="relative overflow-hidden border border-border/60 bg-card/90 backdrop-blur-sm shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className="bg-accent text-accent-foreground font-medium">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground leading-snug">{t.firstName} {t.lastName}</CardTitle>
                    <div className="flex items-center text-sm text-text-secondary">
                      <Mail className="w-4 h-4 mr-2" />
                      {t.email}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="text-sm text-text-secondary space-y-1">
                  <div className="flex items-center"><Mail className="w-4 h-4 mr-2" />{t.email || "—"}</div>
                  <div className="flex items-center"><Phone className="w-4 h-4 mr-2" />{t.phoneNumber || "—"}</div>
                  <div className="flex items-center"><Briefcase className="w-4 h-4 mr-2" />{t.experience || "—"}</div>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-foreground font-medium mr-1">{assignments.length}</span>
                  total assigned •
                  <span className="ml-1 text-foreground font-medium">{activeNow}</span>
                  active now
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="w-full" onClick={() => openSchedule(t)}>
                    View Schedules
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={scheduleOpen} onOpenChange={(v) => { if(!v){ setScheduleOpen(false); setSelectedTrainer(null);} }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule {selectedTrainer ? `— ${selectedTrainer.firstName} ${selectedTrainer.lastName}` : ""}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {selectedTrainer && (assignmentsByTrainer[selectedTrainer.userId]?.length ? (
              [...assignmentsByTrainer[selectedTrainer.userId]]
                .map((a) => ({
                  a,
                  status: deriveStatus(a.startDate, a.endDate),
                }))
                .sort((x, y) => {
                  if (x.status.order !== y.status.order) return x.status.order - y.status.order;
                  const sx = x.a.startDate ? new Date(x.a.startDate).getTime() : 0;
                  const sy = y.a.startDate ? new Date(y.a.startDate).getTime() : 0;
                  return sx - sy;
                })
                .map(({ a, status }) => (
                  <div key={`${selectedTrainer.userId}-${a.courseId}`} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">{a.courseTitle}</div>
                      <div className="text-sm text-text-secondary flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {a.startDate ? new Date(a.startDate).toLocaleDateString() : "--"} - {a.endDate ? new Date(a.endDate).toLocaleDateString() : "--"}
                      </div>
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                ))
            ) : (
              <div className="text-sm text-text-secondary">No assigned courses.</div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


