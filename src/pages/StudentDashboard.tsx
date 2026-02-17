import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, Award, GraduationCap, LogOut, Calendar, FileText, Settings, Bell, User, MessageSquare, HelpCircle, ChevronRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const enrolledCourses = [
  { title: "Basic to Intermediate Python", progress: 65, lessons: "42/65 Lessons", instructor: "Rajesh Hamal", icon: "🐍" },
  { title: "Digital Marketing", progress: 20, lessons: "8/40 Lessons", instructor: "Sandip Lamichhane", icon: "📢" },
];

const upcomingSessions = [
  { title: "Python Advanced Hooks", time: "14:00 - 16:00 (NPT)", type: "LIVE LAB", date: "24" },
];

const recentActivities = [
  { title: "Assignment Submitted", desc: "Python Data Structures Project", time: "2 HOURS AGO", type: "submit" },
  { title: "Grading Complete", desc: "Digital Marketing Quiz: 84/100", time: "YESTERDAY", type: "grade" },
  { title: "Upcoming Deadline", desc: "Python Final Project", time: "IN 3 DAYS", type: "deadline" },
];

const StudentDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <span className="font-display text-sm font-bold text-foreground">TRAININGS FOR NEPAL</span>
          <p className="text-[10px] text-muted-foreground">Student Portal</p>
        </div>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: BookOpen, label: "Dashboard", active: true },
          { icon: FileText, label: "My Courses" },
          { icon: Calendar, label: "Schedule" },
          { icon: FileText, label: "Assignments" },
          { icon: Award, label: "Certificates" },
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
        <div className="pt-4">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Support</p>
          {[
            { icon: HelpCircle, label: "Help Center" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      <Link to="/">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </Link>
    </aside>

    <main className="flex-1 overflow-auto">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="relative flex-1 max-w-md">
          <input placeholder="Search lessons, documentation, tasks..." className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="flex items-center gap-3 ml-4">
          <button className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground"><Bell className="h-4 w-4" /></button>
          <button className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground"><MessageSquare className="h-4 w-4" /></button>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Aaryan Thapa</p>
              <p className="text-[10px] text-muted-foreground">Student ID: #5021</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl bg-gradient-to-r from-primary/80 via-primary/60 to-primary/30 p-6"
        >
          <h2 className="mb-1 font-display text-2xl font-bold text-primary-foreground">Namaste, Aaryan! 👋</h2>
          <p className="mb-4 text-sm text-primary-foreground/80">
            Ready to level up your tech skills today? You've completed <span className="font-bold underline">12 lessons</span> this week. Keep the momentum going!
          </p>
          <div className="flex gap-3">
            <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Resume Last Lesson
            </Button>
            <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              View Schedule
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: BookOpen, label: "Courses Completed", value: "04", sub: "+1 this month", color: "text-primary" },
            { icon: Award, label: "Certificates Earned", value: "02", sub: "Verified by NTA", color: "text-emerald-400" },
            { icon: Clock, label: "Learning Hours", value: "120+", sub: "+15% improvement", color: "text-primary" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="gradient-card rounded-xl border border-border p-5">
              <div className="flex items-center gap-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                  <p className="text-[10px] text-primary">{s.sub}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Courses In Progress */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Courses In Progress
              </h3>
              <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((c) => (
                <div key={c.title} className="gradient-card rounded-xl border border-border p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg">{c.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-semibold text-foreground">{c.title}</h4>
                        <span className="text-sm font-medium text-primary">{c.progress}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Mentor: {c.instructor} • {c.lessons}</p>
                      <Progress value={c.progress} className="mt-2 h-2" />
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-secondary text-[8px] text-muted-foreground">
                              <User className="h-3 w-3" />
                            </div>
                          ))}
                        </div>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                          Resume <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Upcoming Sessions */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-display font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Upcoming Sessions
              </h3>
              {upcomingSessions.map((s) => (
                <div key={s.title} className="gradient-card rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-secondary text-xs font-bold text-foreground">
                      {s.date}
                    </div>
                    <div>
                      <span className="text-[10px] font-medium text-primary">{s.type}</span>
                      <p className="text-sm font-medium text-foreground">{s.title}</p>
                      <p className="text-[10px] text-muted-foreground">{s.time}</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 w-full gradient-primary border-0 text-primary-foreground text-xs">
                    <Video className="mr-1 h-3 w-3" /> Join Live Meeting
                  </Button>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-display font-semibold text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Recent Activities
              </h3>
              <div className="space-y-3">
                {recentActivities.map((a) => (
                  <div key={a.title} className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.type === "submit" ? "bg-blue-400" : a.type === "grade" ? "bg-primary" : "bg-yellow-400"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                      <p className="text-[10px] text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default StudentDashboard;
