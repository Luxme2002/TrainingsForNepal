import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, TrendingUp, BarChart3, Settings, LogOut, GraduationCap, Bell, Search, UserPlus, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stats = [
  { icon: Users, label: "Total Students", value: "2,847", change: "+12%", color: "text-primary" },
  { icon: BookOpen, label: "Active Courses", value: "48", change: "+3", color: "text-primary" },
  { icon: DollarSign, label: "Revenue (NPR)", value: "12.5L", change: "+18%", color: "text-primary" },
  { icon: TrendingUp, label: "Enrollment Rate", value: "94%", change: "+5%", color: "text-primary" },
];

const recentStudents = [
  { name: "Ram Bahadur Thapa", course: "Full Stack Dev", date: "Feb 15, 2026", status: "Active" },
  { name: "Srijana Maharjan", course: "Data Science", date: "Feb 14, 2026", status: "Active" },
  { name: "Dipesh Shrestha", course: "Cloud Computing", date: "Feb 13, 2026", status: "Pending" },
  { name: "Kavita Gurung", course: "Cybersecurity", date: "Feb 12, 2026", status: "Active" },
];

const AdminDashboard = () => (
  <div className="flex min-h-screen bg-background">
    {/* Sidebar */}
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-foreground">Admin Panel</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: BarChart3, label: "Dashboard", active: true },
          { icon: Users, label: "Students" },
          { icon: BookOpen, label: "Courses" },
          { icon: UserPlus, label: "Trainers" },
          { icon: FileText, label: "Reports" },
          { icon: Calendar, label: "Schedule" },
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

    {/* Main */}
    <main className="flex-1 overflow-auto">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome back, Administrator</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="w-64 border-border bg-secondary/50 pl-9 text-foreground placeholder:text-muted-foreground" />
          </div>
          <button className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
          </button>
        </div>
      </header>

      <div className="p-6">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gradient-card rounded-xl border border-border p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{s.change}</span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Enrollments */}
        <div className="gradient-card rounded-xl border border-border p-5">
          <h3 className="mb-4 font-display font-semibold text-foreground">Recent Enrollments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Course</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((s) => (
                  <tr key={s.name} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-medium text-foreground">{s.name}</td>
                    <td className="py-3 text-muted-foreground">{s.course}</td>
                    <td className="py-3 text-muted-foreground">{s.date}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.status === "Active" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AdminDashboard;
