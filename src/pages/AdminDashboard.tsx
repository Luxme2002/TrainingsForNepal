import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, DollarSign, TrendingUp, BarChart3, Settings, LogOut,
  GraduationCap, Bell, Search, UserPlus, FileText, Calendar, Plus, Download,
  X, ChevronRight, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle,
  Star, Award, Menu, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Users, label: "User Management" },
  { icon: BookOpen, label: "Courses" },
  { icon: DollarSign, label: "Revenue & Finance" },
  { icon: FileText, label: "Reports" },
  { icon: UserPlus, label: "Trainers" },
  { icon: Calendar, label: "Schedule" },
  { icon: User, label: "My Profile" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "NPR 12,50,000", change: "+18%", color: "from-primary/20 to-primary/5" },
  { icon: Users, label: "Total Students", value: "1,420", change: "+12%", color: "from-blue-500/20 to-blue-500/5" },
  { icon: BookOpen, label: "Active Batches", value: "32", change: "+3", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: TrendingUp, label: "New Inquiries", value: "48", change: "+8", color: "from-yellow-500/20 to-yellow-500/5" },
];

const courses = [
  { name: "Digital Literacy", students: 280, batches: 8, trainer: "Rajan Thapa", fee: "NPR 8,000", status: "Active", rating: 4.8 },
  { name: "Basic to Intermediate Python", students: 420, batches: 12, trainer: "Sandip Lamichhane", fee: "NPR 25,000", status: "Active", rating: 4.9 },
  { name: "Digital Marketing", students: 350, batches: 10, trainer: "Priya Sharma", fee: "NPR 18,000", status: "Active", rating: 4.7 },
  { name: "Hardware & Networking", students: 245, batches: 7, trainer: "Bikash Karki", fee: "NPR 22,000", status: "Active", rating: 4.6 },
  { name: "Professional Development", students: 125, batches: 4, trainer: "Anjali Rai", fee: "NPR 15,000", status: "Active", rating: 4.5 },
];

const allStudents = [
  { name: "Aaryan Thapa", email: "aaryan@gmail.com", course: "Python", enrolled: "Jan 10, 2026", status: "Active", fee: "NPR 25,000" },
  { name: "Sita Rai", email: "sita.rai@gmail.com", course: "Digital Marketing", enrolled: "Jan 12, 2026", status: "Active", fee: "NPR 18,000" },
  { name: "Rahul Hamal", email: "rahul.h@gmail.com", course: "Hardware & Networking", enrolled: "Dec 5, 2025", status: "Active", fee: "NPR 22,000" },
  { name: "Priya Lamichhane", email: "priya.l@gmail.com", course: "Digital Literacy", enrolled: "Nov 20, 2025", status: "Completed", fee: "NPR 8,000" },
  { name: "Bikash Shrestha", email: "bikash.s@gmail.com", course: "Professional Dev", enrolled: "Feb 1, 2026", status: "Active", fee: "NPR 15,000" },
];

const trainers = [
  { name: "Sandip Lamichhane", course: "Python", students: 420, rating: 4.9, experience: "5 yrs", status: "Active" },
  { name: "Priya Sharma", course: "Digital Marketing", students: 350, rating: 4.7, experience: "4 yrs", status: "Active" },
  { name: "Bikash Karki", course: "Hardware & Networking", students: 245, rating: 4.6, experience: "6 yrs", status: "Active" },
  { name: "Rajan Thapa", course: "Digital Literacy", students: 280, rating: 4.8, experience: "3 yrs", status: "Active" },
  { name: "Anjali Rai", course: "Professional Dev", students: 125, rating: 4.5, experience: "7 yrs", status: "Active" },
];

const schedule = [
  { course: "Python Workshop", trainer: "Sandip Lamichhane", day: "Mon, Wed, Fri", time: "10:00 AM - 12:00 PM", room: "Lab A", batch: "Batch 12" },
  { course: "Digital Marketing", trainer: "Priya Sharma", day: "Tue, Thu", time: "2:00 PM - 4:00 PM", room: "Room 3", batch: "Batch 8" },
  { course: "Hardware & Networking", trainer: "Bikash Karki", day: "Mon, Wed", time: "9:00 AM - 11:00 AM", room: "Lab B", batch: "Batch 5" },
  { course: "Digital Literacy", trainer: "Rajan Thapa", day: "Tue, Fri", time: "11:00 AM - 1:00 PM", room: "Room 2", batch: "Batch 10" },
];

const recentTransactions = [
  { name: "Arish Koirala", email: "arish@gmail.com", course: "Python", date: "Oct 17, 2025", amount: "NPR 25,000", status: "COMPLETED" },
  { name: "Sunita Dahal", email: "sunita.d@gmail.com", course: "Hardware & Networking", date: "Oct 11, 2025", amount: "NPR 22,000", status: "COMPLETED" },
  { name: "Binod Poudel", email: "binod.p@gmail.com", course: "Digital Marketing", date: "Oct 05, 2025", amount: "NPR 18,000", status: "COMPLETED" },
  { name: "Ramesh Jha", email: "ramesh.jha@gmail.com", course: "Professional Dev", date: "Oct 09, 2025", amount: "NPR 15,000", status: "PENDING" },
];

const enrollmentDistribution = [
  { name: "Python", percent: 30, color: "bg-primary" },
  { name: "Digital Marketing", percent: 25, color: "bg-blue-500" },
  { name: "Hardware & Networking", percent: 17, color: "bg-emerald-500" },
  { name: "Digital Literacy", percent: 20, color: "bg-yellow-500" },
  { name: "Professional Dev", percent: 9, color: "bg-purple-500" },
];

const adminProfile = {
  name: "Admin User",
  role: "System Administrator",
  email: "admin@trainingsfornepal.com",
  phone: "9744465510",
  joined: "January 2024",
  permissions: ["User Management", "Course Control", "Finance Access", "Reports", "System Settings"],
};

type ActiveSection =
  | "Dashboard"
  | "User Management"
  | "Courses"
  | "Revenue & Finance"
  | "Reports"
  | "Trainers"
  | "Schedule"
  | "My Profile"
  | "Settings";

const AdminDashboard = () => {
  const [active, setActive] = useState<ActiveSection>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);

  const Sidebar = () => (
    <aside className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-64 flex-col border-r border-border bg-card p-4 fixed lg:static inset-y-0 left-0 z-50`}>
      <div className="mb-8 flex items-center justify-between px-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-sm font-bold text-foreground">Trainings for Nepal</span>
        </Link>
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => { setActive(item.label as ActiveSection); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === item.label ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <Link to="/">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </Link>
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
              <input placeholder="Search..." className="w-48 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
            </button>
            <button onClick={() => setActive("My Profile")} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground hover:bg-secondary/80">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-3 w-3" /></div>
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* DASHBOARD OVERVIEW */}
          {active === "Dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="font-display text-xl font-bold text-foreground">Overview Dashboard</h1>
                  <p className="text-xs text-muted-foreground">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border text-muted-foreground hidden sm:flex"><Download className="mr-1 h-3 w-3" /> Export</Button>
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddCourse(true)}>
                    <Plus className="mr-1 h-3 w-3" /> Add Course
                  </Button>
                </div>
              </div>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border border-border bg-gradient-to-br ${s.color} p-5`}>
                    <div className="mb-2 flex items-center justify-between">
                      <s.icon className="h-5 w-5 text-primary" />
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{s.change}</span>
                    </div>
                    <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="mb-4 font-display font-semibold text-foreground">Revenue Growth (Monthly)</h3>
                  <div className="flex h-40 items-end gap-1">
                    {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div className="w-full rounded-t bg-primary/60 hover:bg-primary transition-colors" style={{ height: `${h}%` }} />
                        <span className="text-[8px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="mb-4 font-display font-semibold text-foreground">Enrollment Distribution</h3>
                  <div className="space-y-3">
                    {enrollmentDistribution.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                          <span className="text-xs font-medium text-foreground">{item.percent}%</span>
                        </div>
                        <Progress value={item.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 gradient-card rounded-xl border border-border p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">Recent Transactions</h3>
                  <button onClick={() => setActive("Revenue & Finance")} className="text-xs text-primary hover:underline flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="pb-3 font-medium">Student</th>
                        <th className="pb-3 font-medium">Course</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t) => (
                        <tr key={t.name} className="border-b border-border/50 last:border-0">
                          <td className="py-3"><div className="font-medium text-foreground">{t.name}</div><div className="text-[10px] text-muted-foreground">{t.email}</div></td>
                          <td className="py-3 text-muted-foreground text-xs">{t.course}</td>
                          <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                          <td className="py-3 font-medium text-foreground text-xs">{t.amount}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "COMPLETED" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>{t.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* USER MANAGEMENT */}
          {active === "User Management" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">User Management</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddStudent(true)}>
                  <Plus className="mr-1 h-3 w-3" /> Add Student
                </Button>
              </div>
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Students", value: "1,420", icon: Users, color: "text-blue-400" },
                  { label: "Active Trainers", value: "5", icon: UserPlus, color: "text-primary" },
                  { label: "Admins", value: "2", icon: Award, color: "text-yellow-400" },
                ].map((s) => (
                  <div key={s.label} className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                    <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="font-display text-2xl font-bold text-foreground">{s.value}</p></div>
                  </div>
                ))}
              </div>
              <div className="gradient-card rounded-xl border border-border p-5">
                <h3 className="mb-4 font-display font-semibold text-foreground">All Students</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Course</th>
                        <th className="pb-3 font-medium">Enrolled</th>
                        <th className="pb-3 font-medium">Fee Paid</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allStudents.map((s) => (
                        <tr key={s.name} className="border-b border-border/50 last:border-0">
                          <td className="py-3"><div className="font-medium text-foreground">{s.name}</div><div className="text-[10px] text-muted-foreground">{s.email}</div></td>
                          <td className="py-3 text-muted-foreground text-xs">{s.course}</td>
                          <td className="py-3 text-muted-foreground text-xs">{s.enrolled}</td>
                          <td className="py-3 text-xs font-medium text-foreground">{s.fee}</td>
                          <td className="py-3">
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"}`}>{s.status}</span>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Eye className="h-3 w-3" /></button>
                              <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit className="h-3 w-3" /></button>
                              <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-primary"><Trash2 className="h-3 w-3" /></button>
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

          {/* COURSES */}
          {active === "Courses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Course Management</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddCourse(true)}>
                  <Plus className="mr-1 h-3 w-3" /> Add Course
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((c, i) => (
                  <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display font-semibold text-foreground text-sm">{c.name}</h3>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-medium">{c.status}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground mb-3">
                      <p>👤 Trainer: {c.trainer}</p>
                      <p>🎓 Students: <span className="text-foreground font-medium">{c.students}</span></p>
                      <p>📅 Batches: {c.batches}</p>
                      <p>💰 Fee: <span className="text-primary font-medium">{c.fee}</span></p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-foreground">{c.rating}</span>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit className="h-3 w-3" /></button>
                        <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-primary"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* REVENUE & FINANCE */}
          {active === "Revenue & Finance" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Revenue & Finance</h1>
                <Button size="sm" variant="outline" className="border-border text-muted-foreground"><Download className="mr-1 h-3 w-3" /> Export</Button>
              </div>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Revenue", value: "NPR 12,50,000", icon: DollarSign, change: "+18%", color: "text-primary" },
                  { label: "This Month", value: "NPR 1,85,000", icon: TrendingUp, change: "+12%", color: "text-emerald-400" },
                  { label: "Pending Fees", value: "NPR 45,000", icon: AlertCircle, change: "4 Students", color: "text-yellow-400" },
                ].map((s) => (
                  <div key={s.label} className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-2">
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                      <span className="text-[10px] text-primary font-medium">{s.change}</span>
                    </div>
                    <div className="font-display text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="gradient-card rounded-xl border border-border p-5">
                <h3 className="mb-4 font-display font-semibold text-foreground">All Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="pb-3 font-medium">Student</th>
                        <th className="pb-3 font-medium">Course</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t) => (
                        <tr key={t.name} className="border-b border-border/50 last:border-0">
                          <td className="py-3"><div className="font-medium text-foreground">{t.name}</div><div className="text-[10px] text-muted-foreground">{t.email}</div></td>
                          <td className="py-3 text-muted-foreground text-xs">{t.course}</td>
                          <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                          <td className="py-3 font-medium text-foreground text-xs">{t.amount}</td>
                          <td className="py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "COMPLETED" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>{t.status}</span></td>
                          <td className="py-3"><button className="text-xs text-primary hover:underline flex items-center gap-1"><Download className="h-3 w-3" /> PDF</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* REPORTS */}
          {active === "Reports" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6"><h1 className="font-display text-xl font-bold text-foreground">Reports</h1></div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: "Monthly Enrollment Report", desc: "Student enrollment trends for Feb 2026", icon: Users },
                  { title: "Revenue Report", desc: "Financial summary for Q1 2026", icon: DollarSign },
                  { title: "Course Performance", desc: "Completion rates and ratings", icon: Star },
                  { title: "Trainer Activity", desc: "Sessions taught and student ratings", icon: Award },
                  { title: "Batch Progress", desc: "Current batch completion status", icon: BarChart3 },
                  { title: "Annual Summary", desc: "Year-over-year growth and insights", icon: TrendingUp },
                ].map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-5 cursor-pointer hover:border-primary/50 transition-colors">
                    <r.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{r.desc}</p>
                    <Button size="sm" variant="outline" className="w-full border-border text-muted-foreground text-xs">
                      <Download className="mr-1 h-3 w-3" /> Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TRAINERS */}
          {active === "Trainers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Trainer Management</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground"><Plus className="mr-1 h-3 w-3" /> Add Trainer</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trainers.map((t, i) => (
                  <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-sm">{t.name}</h3>
                        <p className="text-xs text-muted-foreground">{t.course}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      <div><p className="text-xs font-bold text-foreground">{t.students}</p><p className="text-[10px] text-muted-foreground">Students</p></div>
                      <div><p className="text-xs font-bold text-foreground">{t.rating}⭐</p><p className="text-[10px] text-muted-foreground">Rating</p></div>
                      <div><p className="text-xs font-bold text-foreground">{t.experience}</p><p className="text-[10px] text-muted-foreground">Exp.</p></div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="flex-1 text-xs border-border"><Eye className="mr-1 h-3 w-3" />View</Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs border-border"><Edit className="mr-1 h-3 w-3" />Edit</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCHEDULE */}
          {active === "Schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Class Schedule</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground"><Plus className="mr-1 h-3 w-3" /> Add Class</Button>
              </div>
              <div className="space-y-4">
                {schedule.map((s, i) => (
                  <motion.div key={s.course} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex flex-wrap items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm">{s.course}</h3>
                      <p className="text-xs text-muted-foreground">{s.trainer} • {s.batch}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>📅 {s.day}</p>
                      <p>🕐 {s.time}</p>
                      <p>🏛️ {s.room}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit className="h-3 w-3" /></button>
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </motion.div>
                ))}
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
                  <h2 className="font-display font-bold text-foreground text-lg">{adminProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{adminProfile.role}</p>
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">Administrator</span>
                  <div className="mt-4">
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground w-full">Edit Profile</Button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4">Account Details</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: adminProfile.name },
                        { label: "Email", value: adminProfile.email },
                        { label: "Phone", value: adminProfile.phone },
                        { label: "Joined", value: adminProfile.joined },
                      ].map((d) => (
                        <div key={d.label} className="rounded-lg bg-secondary/30 p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                          <p className="text-sm font-medium text-foreground mt-1">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Permissions</h3>
                    <div className="flex flex-wrap gap-2">
                      {adminProfile.permissions.map((p) => (
                        <span key={p} className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                          <CheckCircle className="h-3 w-3" /> {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-3">Change Password</h3>
                    <div className="space-y-3">
                      {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                        <div key={label}>
                          <label className="text-xs text-muted-foreground">{label}</label>
                          <input type="password" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>
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
                {[
                  { title: "General Settings", desc: "Organization name, logo, contact info", icon: Settings },
                  { title: "Notification Settings", desc: "Email and SMS notification preferences", icon: Bell },
                  { title: "Security Settings", desc: "Two-factor auth, session management", icon: CheckCircle },
                  { title: "Backup & Export", desc: "Database backups and data export", icon: Download },
                ].map((s, i) => (
                  <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground text-sm">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))}
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">Theme</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Toggle between light and dark mode:</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add Course Modal */}
      <AnimatePresence>
        {showAddCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Add New Course</h2>
                <button onClick={() => setShowAddCourse(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                {["Course Name", "Trainer Name", "Course Fee (NPR)", "Duration (weeks)", "Max Students"].map((label) => (
                  <div key={label}>
                    <label className="text-xs text-muted-foreground">{label}</label>
                    <input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddCourse(false)}>Add Course</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddCourse(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showAddStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-foreground">Add New Student</h2>
                <button onClick={() => setShowAddStudent(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
              </div>
              <div className="space-y-3">
                {["Full Name", "Email Address", "Phone Number", "Course Enrolled", "Fee Amount (NPR)"].map((label) => (
                  <div key={label}>
                    <label className="text-xs text-muted-foreground">{label}</label>
                    <input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddStudent(false)}>Add Student</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddStudent(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
