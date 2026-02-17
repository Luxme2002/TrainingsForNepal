import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, Clock, GraduationCap, LogOut, FileText, Settings, Bell, Star, CheckCircle2, Search, Video, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const myCourses = [
  { title: "Basic to Intermediate Python", students: 42, progress: 18, tag: "IN PROGRESS", color: "bg-primary" },
  { title: "Digital Marketing", students: 35, progress: 45, tag: "IN PROGRESS", color: "bg-blue-500" },
  { title: "Digital Literacy", students: 28, progress: 100, tag: "COMPLETED", color: "bg-emerald-500" },
];

const todaysSessions = [
  { time: "10:00 AM", course: "Python Workshop", topic: "Data Structures & Algorithms", tag: "LIVE NOW" },
  { time: "2:00 PM", course: "Digital Marketing", topic: "SEO Fundamentals", tag: "" },
];

const gradingQueue = [
  { student: "Arish Sharma", assignment: "Final Project - Data Viz", course: "Python", submitted: "Today" },
  { student: "Priya Lamichhane", assignment: "Hooks Practice Lab", course: "Python", submitted: "Yesterday" },
];

const recentActivity = [
  { text: "Rahul Thapa asked a question in Python Forum", time: "2h ago" },
  { text: "Sita Rai completed the Python Basics Quiz", time: "3h ago" },
  { text: "New announcement: Arish Sharma uploaded project files.", time: "5h ago" },
];

const TrainerDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-primary">NepalTrain</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: BarChart3, label: "Dashboard", active: true },
          { icon: BookOpen, label: "My Courses" },
          { icon: Calendar, label: "Schedule" },
          { icon: CheckCircle2, label: "Student Grading" },
          { icon: FileText, label: "Resources" },
          { icon: Settings, label: "Settings" },
        ].map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              item.active ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Users className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Sandip Lamichhane</p>
          <Link to="/" className="text-[10px] text-primary hover:underline">View Profile</Link>
        </div>
      </div>
    </aside>

    <main className="flex-1 overflow-auto">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search courses, students, or tasks..." className="w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground"><Bell className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Users, label: "Total Students", value: "1,240", change: "+5%" },
            { icon: BookOpen, label: "Active Courses", value: "4", change: "+1" },
            { icon: Star, label: "Batch Progress", value: "88%", change: "+3%" },
            { icon: Clock, label: "Teaching Hours", value: "450h", change: "+12h" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="gradient-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-medium text-primary">{s.change}</span>
              </div>
              <div className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            {/* Active Courses */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground">Active Courses</h3>
                <button className="text-xs text-primary hover:underline">Show All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {myCourses.map((c) => (
                  <div key={c.title} className="min-w-[220px] gradient-card rounded-xl border border-border p-4">
                    <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-primary-foreground ${c.color}`}>{c.tag}</span>
                    <h4 className="mb-1 text-sm font-medium text-foreground">{c.title}</h4>
                    <p className="mb-2 text-xs text-muted-foreground">Batch Progress: {c.progress}%</p>
                    <Progress value={c.progress} className="h-1.5" />
                    <p className="mt-2 text-xs text-muted-foreground">{c.students} Students</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grading Queue */}
            <div className="gradient-card rounded-xl border border-border p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground">Grading Queue</h3>
                <span className="text-xs text-muted-foreground">10 Pending</span>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                  <span>Student</span><span>Assignment</span><span>Submitted</span><span>Action</span>
                </div>
                {gradingQueue.map((g) => (
                  <div key={g.student} className="grid grid-cols-4 items-center text-sm">
                    <span className="text-foreground">{g.student}</span>
                    <div>
                      <p className="text-xs text-foreground">{g.assignment}</p>
                      <p className="text-[10px] text-muted-foreground">{g.course}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{g.submitted}</span>
                    <Button size="sm" variant="ghost" className="text-xs text-primary">Grade</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6 lg:col-span-2">
            {/* Today's Sessions */}
            <div className="gradient-card rounded-xl border border-border p-5">
              <h3 className="mb-3 font-display font-semibold text-foreground">Today's Sessions</h3>
              <div className="space-y-3">
                {todaysSessions.map((s) => (
                  <div key={s.time} className="rounded-lg bg-secondary/30 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{s.time}</span>
                      {s.tag && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">{s.tag}</span>}
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{s.course}</p>
                    <p className="text-xs text-muted-foreground">{s.topic}</p>
                  </div>
                ))}
                <Button size="sm" className="w-full gradient-primary border-0 text-primary-foreground text-xs">
                  <Video className="mr-1 h-3 w-3" /> Join Live Session
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="gradient-card rounded-xl border border-border p-5">
              <h3 className="mb-3 font-display font-semibold text-foreground">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="text-xs text-foreground">{a.text}</p>
                      <p className="text-[10px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
                <button className="text-xs text-primary hover:underline">View Activity Log →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default TrainerDashboard;
