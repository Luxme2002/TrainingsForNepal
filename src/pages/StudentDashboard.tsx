import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Award, TrendingUp, GraduationCap, LogOut, Calendar, FileText, Settings, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const enrolledCourses = [
  { title: "Full Stack Web Development", progress: 65, nextClass: "Tomorrow, 10 AM", instructor: "Bikash Thapa" },
  { title: "Data Science with Python", progress: 30, nextClass: "Wed, 2 PM", instructor: "Anisha Rai" },
];

const assignments = [
  { title: "React Component Architecture", course: "Full Stack Dev", due: "Feb 18, 2026", status: "Pending" },
  { title: "Pandas Data Analysis", course: "Data Science", due: "Feb 20, 2026", status: "Submitted" },
  { title: "Node.js REST API", course: "Full Stack Dev", due: "Feb 22, 2026", status: "Pending" },
];

const StudentDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-foreground">Student Portal</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: TrendingUp, label: "Dashboard", active: true },
          { icon: BookOpen, label: "My Courses" },
          { icon: FileText, label: "Assignments" },
          { icon: Calendar, label: "Schedule" },
          { icon: Award, label: "Certificates" },
          { icon: User, label: "Profile" },
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
          <h1 className="font-display text-xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome, Aarav Shrestha</p>
        </div>
        <button className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: BookOpen, label: "Enrolled Courses", value: "2" },
            { icon: Clock, label: "Hours Completed", value: "120" },
            { icon: FileText, label: "Assignments Due", value: "3" },
            { icon: Award, label: "Certificates", value: "1" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="gradient-card rounded-xl border border-border p-5">
              <s.icon className="mb-2 h-5 w-5 text-primary" />
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="mb-8">
          <h3 className="mb-4 font-display font-semibold text-foreground">My Courses</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {enrolledCourses.map((c) => (
              <div key={c.title} className="gradient-card rounded-xl border border-border p-5">
                <h4 className="mb-1 font-display font-semibold text-foreground">{c.title}</h4>
                <p className="mb-3 text-xs text-muted-foreground">Instructor: {c.instructor}</p>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-primary">{c.progress}%</span>
                </div>
                <Progress value={c.progress} className="h-2" />
                <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Next: {c.nextClass}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="gradient-card rounded-xl border border-border p-5">
          <h3 className="mb-4 font-display font-semibold text-foreground">Upcoming Assignments</h3>
          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.title} className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                <div>
                  <div className="text-sm font-medium text-foreground">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.course} • Due: {a.due}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.status === "Submitted" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default StudentDashboard;
