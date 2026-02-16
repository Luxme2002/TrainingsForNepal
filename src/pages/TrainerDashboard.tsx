import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, Clock, GraduationCap, LogOut, FileText, Settings, Bell, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const myCourses = [
  { title: "Full Stack Web Development", students: 42, nextClass: "Tomorrow, 10 AM", rating: 4.8 },
  { title: "Advanced React & TypeScript", students: 28, nextClass: "Wed, 3 PM", rating: 4.9 },
  { title: "Node.js Masterclass", students: 35, nextClass: "Thu, 11 AM", rating: 4.7 },
];

const schedule = [
  { time: "10:00 AM", course: "Full Stack Web Dev", topic: "React Hooks & Context API", room: "Lab A" },
  { time: "2:00 PM", course: "Advanced React", topic: "TypeScript Generics", room: "Lab B" },
  { time: "5:00 PM", course: "Node.js Masterclass", topic: "Authentication & JWT", room: "Lab A" },
];

const TrainerDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-foreground">Trainer Portal</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: BookOpen, label: "Dashboard", active: true },
          { icon: Users, label: "My Students" },
          { icon: FileText, label: "Course Materials" },
          { icon: Calendar, label: "Schedule" },
          { icon: CheckCircle2, label: "Assignments" },
          { icon: Star, label: "Reviews" },
          { icon: Settings, label: "Settings" },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              item.active ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <Link to="/">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </Link>
    </aside>

    <main className="flex-1 overflow-auto">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Trainer Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome, Bikash Thapa</p>
        </div>
        <button className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: BookOpen, label: "Active Courses", value: "3" },
            { icon: Users, label: "Total Students", value: "105" },
            { icon: Star, label: "Avg Rating", value: "4.8" },
            { icon: Clock, label: "Hours This Month", value: "64" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="gradient-card rounded-xl border border-border p-5">
              <s.icon className="mb-2 h-5 w-5 text-primary" />
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Courses */}
          <div className="gradient-card rounded-xl border border-border p-5">
            <h3 className="mb-4 font-display font-semibold text-foreground">My Courses</h3>
            <div className="space-y-3">
              {myCourses.map((c) => (
                <div key={c.title} className="rounded-lg bg-secondary/30 p-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-foreground">{c.title}</h4>
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Star className="h-3 w-3 fill-primary" /> {c.rating}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {c.students} students</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.nextClass}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="gradient-card rounded-xl border border-border p-5">
            <h3 className="mb-4 font-display font-semibold text-foreground">Today's Schedule</h3>
            <div className="space-y-3">
              {schedule.map((s) => (
                <div key={s.time} className="flex gap-4 rounded-lg bg-secondary/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-xs font-medium text-primary">
                    {s.time.split(" ")[0]}
                    <span className="text-[10px]">{s.time.split(" ")[1]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{s.course}</div>
                    <div className="text-xs text-muted-foreground">{s.topic}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Room: {s.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default TrainerDashboard;
