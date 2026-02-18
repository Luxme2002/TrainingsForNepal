import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, Calendar, Clock, GraduationCap, LogOut, FileText, Settings,
  Bell, Star, CheckCircle2, Search, Video, BarChart3, X, Menu, User, Plus,
  Send, Download, Edit, MessageSquare, ChevronRight, Award, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";

const myCourses = [
  { title: "Basic to Intermediate Python", students: 42, progress: 65, tag: "IN PROGRESS", color: "bg-primary", nextLesson: "OOP Concepts", rating: 4.9 },
  { title: "Digital Marketing", students: 35, progress: 45, tag: "IN PROGRESS", color: "bg-blue-500", nextLesson: "Google Ads", rating: 4.7 },
  { title: "Digital Literacy", students: 28, progress: 100, tag: "COMPLETED", color: "bg-emerald-500", nextLesson: "N/A", rating: 4.8 },
];

const allStudents = [
  { name: "Aaryan Thapa", course: "Python", progress: 65, grade: "A", submissions: 8, lastActive: "Today" },
  { name: "Sita Rai", course: "Digital Marketing", progress: 40, grade: "B+", submissions: 5, lastActive: "Yesterday" },
  { name: "Rahul Hamal", course: "Python", progress: 80, grade: "A+", submissions: 10, lastActive: "Today" },
  { name: "Priya Lamichhane", course: "Python", progress: 55, grade: "B", submissions: 7, lastActive: "2 days ago" },
  { name: "Bikash Shrestha", course: "Digital Marketing", progress: 20, grade: "C+", submissions: 3, lastActive: "Today" },
];

const gradingQueue = [
  { student: "Arish Sharma", assignment: "Final Project - Data Viz", course: "Python", submitted: "Today", priority: "high" },
  { student: "Priya Lamichhane", assignment: "Hooks Practice Lab", course: "Python", submitted: "Yesterday", priority: "medium" },
  { student: "Bikash Shrestha", assignment: "SEO Audit Report", course: "Digital Marketing", submitted: "2 days ago", priority: "low" },
];

const todaysSessions = [
  { time: "10:00 AM", course: "Python Workshop", topic: "Data Structures & Algorithms", tag: "LIVE NOW", students: 42 },
  { time: "2:00 PM", course: "Digital Marketing", topic: "SEO Fundamentals", tag: "", students: 35 },
];

const schedule = [
  { course: "Python", day: "Mon, Wed, Fri", time: "10:00 AM - 12:00 PM", room: "Lab A", batch: "Batch 12", students: 42 },
  { course: "Digital Marketing", day: "Tue, Thu", time: "2:00 PM - 4:00 PM", room: "Room 3", batch: "Batch 8", students: 35 },
];

const resources = [
  { title: "Python Lecture Slides - OOP", type: "PDF", uploaded: "Feb 15, 2026", downloads: 38 },
  { title: "Data Structures Exercises", type: "ZIP", uploaded: "Feb 12, 2026", downloads: 35 },
  { title: "Digital Marketing Templates", type: "ZIP", uploaded: "Feb 10, 2026", downloads: 28 },
];

const messages = [
  { from: "Aaryan Thapa", subject: "Assignment Question", preview: "I had a question about the OOP assignment...", time: "1h ago", read: false },
  { from: "Admin", subject: "New Batch Assignment", preview: "You have been assigned a new batch starting...", time: "3h ago", read: true },
  { from: "Rahul Hamal", subject: "Certificate Request", preview: "I'd like to request my completion certificate...", time: "1d ago", read: true },
];

const trainerProfile = {
  name: "Sandip Lamichhane",
  role: "Senior Python & IT Trainer",
  email: "sandip.l@trainingsfornepal.com",
  phone: "9744465510",
  experience: "5 Years",
  specialization: "Python, Digital Marketing",
  rating: 4.9,
  totalStudents: 420,
  coursesCompleted: 8,
};

type ActiveSection = "Dashboard" | "My Courses" | "Students" | "Schedule" | "Grading" | "Resources" | "Messages" | "My Profile" | "Settings";

const TrainerDashboard = () => {
  const [active, setActive] = useState<ActiveSection>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gradingStudent, setGradingStudent] = useState<string | null>(null);

  const navItems = [
    { icon: BarChart3, label: "Dashboard" },
    { icon: BookOpen, label: "My Courses" },
    { icon: Users, label: "Students" },
    { icon: Calendar, label: "Schedule" },
    { icon: CheckCircle2, label: "Grading" },
    { icon: FileText, label: "Resources" },
    { icon: MessageSquare, label: "Messages" },
    { icon: User, label: "My Profile" },
    { icon: Settings, label: "Settings" },
  ];

  const Sidebar = () => (
    <aside className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-64 flex-col border-r border-border bg-card p-4 fixed lg:static inset-y-0 left-0 z-50`}>
      <div className="mb-8 flex items-center justify-between px-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-bold text-primary">NepalTrain</span>
        </Link>
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button key={item.label} onClick={() => { setActive(item.label as ActiveSection); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === item.label ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary"><Users className="h-4 w-4" /></div>
        <div>
          <p className="text-sm font-medium text-foreground">{trainerProfile.name}</p>
          <button onClick={() => setActive("My Profile")} className="text-[10px] text-primary hover:underline">View Profile</button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between border-b border-border px-4 py-3 sticky top-0 bg-background z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5 text-muted-foreground" /></button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search courses, students..." className="w-48 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground"><Bell className="h-4 w-4" /></button>
            <button onClick={() => setActive("My Profile")} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground hover:bg-secondary/80">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-3 w-3" /></div>
              <span className="hidden sm:inline">Trainer</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* DASHBOARD */}
          {active === "Dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6"><h1 className="font-display text-xl font-bold text-foreground">Trainer Dashboard</h1><p className="text-xs text-muted-foreground">Welcome back, {trainerProfile.name}</p></div>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: Users, label: "Total Students", value: "105", change: "+5" },
                  { icon: BookOpen, label: "Active Courses", value: "2", change: "+0" },
                  { icon: Star, label: "Avg. Rating", value: "4.8", change: "⭐" },
                  { icon: Clock, label: "Teaching Hours", value: "450h", change: "+12h" },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="gradient-card rounded-xl border border-border p-5">
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
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-display font-semibold text-foreground">Active Courses</h3>
                      <button className="text-xs text-primary hover:underline" onClick={() => setActive("My Courses")}>Show All</button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {myCourses.map((c) => (
                        <div key={c.title} className="min-w-[220px] gradient-card rounded-xl border border-border p-4">
                          <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-primary-foreground ${c.color}`}>{c.tag}</span>
                          <h4 className="mb-1 text-sm font-medium text-foreground">{c.title}</h4>
                          <p className="mb-2 text-xs text-muted-foreground">Progress: {c.progress}%</p>
                          <Progress value={c.progress} className="h-1.5" />
                          <p className="mt-2 text-xs text-muted-foreground">{c.students} Students</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-display font-semibold text-foreground">Grading Queue</h3>
                      <button className="text-xs text-primary hover:underline" onClick={() => setActive("Grading")}>View All</button>
                    </div>
                    <div className="space-y-3">
                      {gradingQueue.slice(0, 2).map((g) => (
                        <div key={g.student} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{g.student}</p>
                            <p className="text-xs text-muted-foreground">{g.assignment} • {g.course}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-xs text-primary" onClick={() => setGradingStudent(g.student)}>Grade</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6 lg:col-span-2">
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
                      <Button size="sm" className="w-full gradient-primary border-0 text-primary-foreground text-xs"><Video className="mr-1 h-3 w-3" />Join Live Session</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MY COURSES */}
          {active === "My Courses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">My Courses</h1>
              <div className="space-y-4">
                {myCourses.map((c) => (
                  <div key={c.title} className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-foreground">{c.title}</h3>
                        <p className="text-xs text-muted-foreground">{c.students} Students enrolled</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-primary-foreground ${c.color}`}>{c.tag}</span>
                    </div>
                    <Progress value={c.progress} className="h-2 mb-3" />
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span>📖 Next: {c.nextLesson}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />{c.rating} Rating</span>
                      <span>📊 {c.progress}% Complete</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs"><Video className="mr-1 h-3 w-3" />Start Session</Button>
                      <Button size="sm" variant="outline" className="border-border text-xs"><Edit className="mr-1 h-3 w-3" />Edit Content</Button>
                      <Button size="sm" variant="outline" className="border-border text-xs" onClick={() => setActive("Students")}>View Students</Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STUDENTS */}
          {active === "Students" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">My Students</h1>
                <span className="text-sm text-muted-foreground">{allStudents.length} students</span>
              </div>
              <div className="gradient-card rounded-xl border border-border p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="pb-3 font-medium">Student</th>
                        <th className="pb-3 font-medium">Course</th>
                        <th className="pb-3 font-medium">Progress</th>
                        <th className="pb-3 font-medium">Grade</th>
                        <th className="pb-3 font-medium">Last Active</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allStudents.map((s) => (
                        <tr key={s.name} className="border-b border-border/50 last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">{s.name.charAt(0)}</div>
                              <span className="font-medium text-foreground text-sm">{s.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-muted-foreground text-xs">{s.course}</td>
                          <td className="py-3 w-32">
                            <div className="flex items-center gap-2">
                              <Progress value={s.progress} className="h-1.5 flex-1" />
                              <span className="text-xs text-muted-foreground">{s.progress}%</span>
                            </div>
                          </td>
                          <td className="py-3"><span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">{s.grade}</span></td>
                          <td className="py-3 text-muted-foreground text-xs">{s.lastActive}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" onClick={() => setGradingStudent(s.name)}><CheckCircle2 className="h-3 w-3" /></button>
                              <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><MessageSquare className="h-3 w-3" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* SCHEDULE */}
          {active === "Schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">My Schedule</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground"><Plus className="mr-1 h-3 w-3" />Request Class</Button>
              </div>
              <div className="space-y-4">
                {schedule.map((s, i) => (
                  <motion.div key={s.course} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="gradient-card rounded-xl border border-border p-4 flex flex-wrap items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20"><Calendar className="h-6 w-6 text-primary" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground">{s.course}</h3>
                      <p className="text-xs text-muted-foreground">{s.batch} • {s.students} Students</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>📅 {s.day}</p>
                      <p>🕐 {s.time}</p>
                      <p>🏛️ {s.room}</p>
                    </div>
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs"><Video className="mr-1 h-3 w-3" />Start</Button>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 gradient-card rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3">Today's Sessions</h3>
                <div className="space-y-3">
                  {todaysSessions.map((s) => (
                    <div key={s.time} className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                      <div className="text-xs text-muted-foreground w-16">{s.time}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{s.course}</p>
                        <p className="text-xs text-muted-foreground">{s.topic}</p>
                      </div>
                      {s.tag && <span className="rounded-full bg-primary/20 text-primary px-2 py-0.5 text-[10px] font-medium">{s.tag}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* GRADING */}
          {active === "Grading" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Student Grading</h1>
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-sm font-medium">{gradingQueue.length} Pending</span>
              </div>
              <div className="space-y-3">
                {gradingQueue.map((g, i) => (
                  <motion.div key={g.student} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex flex-wrap items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">{g.student.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm">{g.student}</h3>
                      <p className="text-xs text-muted-foreground">{g.assignment} • {g.course}</p>
                      <p className="text-[10px] text-muted-foreground">Submitted: {g.submitted}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      g.priority === "high" ? "bg-primary/10 text-primary" :
                      g.priority === "medium" ? "bg-yellow-500/10 text-yellow-400" :
                      "bg-secondary text-muted-foreground"
                    }`}>{g.priority.toUpperCase()}</span>
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs" onClick={() => setGradingStudent(g.student)}>
                      <CheckCircle2 className="mr-1 h-3 w-3" />Grade
                    </Button>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 gradient-card rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3">Recently Graded</h3>
                {[
                  { student: "Rahul Hamal", assignment: "Algorithms Challenge", grade: "92/100", graded: "Today" },
                  { student: "Sita Rai", assignment: "SEO Basics Quiz", grade: "85/100", graded: "Yesterday" },
                ].map((g) => (
                  <div key={g.student} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{g.student}</p>
                      <p className="text-xs text-muted-foreground">{g.assignment}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{g.grade}</p>
                      <p className="text-[10px] text-muted-foreground">{g.graded}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESOURCES */}
          {active === "Resources" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Course Resources</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground"><Upload className="mr-1 h-3 w-3" />Upload</Button>
              </div>
              <div className="space-y-3">
                {resources.map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground text-sm">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.type} • Uploaded: {r.uploaded} • {r.downloads} downloads</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="border-border text-xs"><Download className="mr-1 h-3 w-3" /></Button>
                      <Button size="sm" variant="outline" className="border-border text-xs"><Edit className="h-3 w-3" /></Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MESSAGES */}
          {active === "Messages" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Messages</h1>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-2">
                  {messages.map((m, i) => (
                    <div key={i} className={`gradient-card rounded-xl border p-3 cursor-pointer hover:border-primary/50 transition-colors ${!m.read ? "border-primary/30" : "border-border"}`}>
                      <div className="flex items-start justify-between mb-1">
                        <span className={`text-sm font-medium ${!m.read ? "text-foreground" : "text-muted-foreground"}`}>{m.from}</span>
                        <span className="text-[10px] text-muted-foreground">{m.time}</span>
                      </div>
                      <p className={`text-xs ${!m.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{m.subject}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{m.preview}</p>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2 gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">Compose Message</h3>
                  <div className="space-y-3">
                    <div><label className="text-xs text-muted-foreground">To (Student/Admin)</label><input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="text-xs text-muted-foreground">Subject</label><input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <div><label className="text-xs text-muted-foreground">Message</label><textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground"><Send className="mr-1 h-3 w-3" />Send Message</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* MY PROFILE */}
          {active === "My Profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">My Profile</h1>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="gradient-card rounded-xl border border-border p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <User className="h-10 w-10" />
                  </div>
                  <h2 className="font-display font-bold text-foreground text-lg">{trainerProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{trainerProfile.role}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-foreground">{trainerProfile.rating}</span>
                    <span className="text-xs text-muted-foreground">/ 5.0</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg bg-secondary/30 p-2 text-center">
                      <p className="text-lg font-bold text-foreground">{trainerProfile.totalStudents}</p>
                      <p className="text-[10px] text-muted-foreground">Students</p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-2 text-center">
                      <p className="text-lg font-bold text-foreground">{trainerProfile.coursesCompleted}</p>
                      <p className="text-[10px] text-muted-foreground">Courses</p>
                    </div>
                  </div>
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground w-full">Edit Profile</Button>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4">Profile Details</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: trainerProfile.name },
                        { label: "Email", value: trainerProfile.email },
                        { label: "Phone", value: trainerProfile.phone },
                        { label: "Experience", value: trainerProfile.experience },
                        { label: "Specialization", value: trainerProfile.specialization },
                        { label: "Rating", value: `${trainerProfile.rating} / 5.0` },
                      ].map((d) => (
                        <div key={d.label} className="rounded-lg bg-secondary/30 p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                          <p className="text-sm font-medium text-foreground mt-1">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {["🏆 Top Rated Trainer", "⭐ 5-Star Instructor", "📚 8 Courses Completed", "👥 420+ Students Trained", "🎯 Expert Python Trainer"].map((a) => (
                        <span key={a} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Change Password</h3>
                    <div className="space-y-3">
                      {["Current Password", "New Password", "Confirm Password"].map((l) => (
                        <div key={l}><label className="text-xs text-muted-foreground">{l}</label><input type="password" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                      ))}
                      <Button size="sm" className="gradient-primary border-0 text-primary-foreground">Update Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SETTINGS */}
          {active === "Settings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Settings</h1>
              <div className="space-y-4">
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">Appearance</h3>
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-foreground">Theme</p><p className="text-xs text-muted-foreground">Switch between light and dark mode</p></div>
                    <ThemeToggle />
                  </div>
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3">Notification Preferences</h3>
                  {["New student enrollments", "Assignment submissions", "Class reminders", "Admin announcements"].map((n) => (
                    <div key={n} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-foreground">{n}</span>
                      <div className="w-10 h-5 rounded-full bg-primary/20 border border-primary/30 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Grade Modal */}
      <AnimatePresence>
        {gradingStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Grade: {gradingStudent}</h2>
                <button onClick={() => setGradingStudent(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                <div><label className="text-xs text-muted-foreground">Score (out of 100)</label><input type="number" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. 85" /></div>
                <div><label className="text-xs text-muted-foreground">Feedback</label><textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Write your feedback..." /></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={() => setGradingStudent(null)}>Submit Grade</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setGradingStudent(null)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrainerDashboard;
