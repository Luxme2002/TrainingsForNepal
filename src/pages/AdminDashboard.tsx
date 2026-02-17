import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, TrendingUp, BarChart3, Settings, LogOut, GraduationCap, Bell, Search, UserPlus, FileText, Calendar, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "NPR 1,250,000", change: "+18%", color: "from-primary/20 to-primary/5" },
  { icon: Users, label: "Total Students", value: "1,420", change: "+12%", color: "from-blue-500/20 to-blue-500/5" },
  { icon: BookOpen, label: "Active Batches", value: "32", change: "+3", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: TrendingUp, label: "New Inquiries", value: "48", change: "+8", color: "from-yellow-500/20 to-yellow-500/5" },
];

const enrollmentDistribution = [
  { name: "Python (20%)", percent: 60, color: "bg-primary" },
  { name: "Digital Marketing", percent: 24, color: "bg-blue-500" },
  { name: "Hardware & Networking", percent: 24, color: "bg-emerald-500" },
  { name: "Digital Literacy", percent: 20, color: "bg-yellow-500" },
  { name: "Professional Dev", percent: 12, color: "bg-purple-500" },
];

const recentTransactions = [
  { name: "Arish Koirala", email: "arish@gmail.com", course: "Full Stack Python", date: "Oct 17, 2025", amount: "NPR 45,000", status: "COMPLETED" },
  { name: "Sunita Dahal", email: "sunita.d@gmail.com", course: "CCNA Networking", date: "Oct 11, 2025", amount: "NPR 32,000", status: "COMPLETED" },
  { name: "Binod Poudel", email: "binod.p@gmail.com", course: "UI/UX Design", date: "Oct 05, 2025", amount: "NPR 28,000", status: "COMPLETED" },
  { name: "Ramesh Jha", email: "ramesh.jha@gmail.com", course: "Quality Assurance", date: "Oct 09, 2025", amount: "NPR 30,000", status: "PENDING" },
];

const AdminDashboard = () => (
  <div className="flex min-h-screen bg-background">
    <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 lg:flex">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <GraduationCap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display text-sm font-bold text-foreground">Trainings for Nepal</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {[
          { icon: BarChart3, label: "Dashboard Overview", active: true },
          { icon: Users, label: "User Management" },
          { icon: BookOpen, label: "Courses" },
          { icon: DollarSign, label: "Revenue & Finance" },
          { icon: FileText, label: "Reports" },
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
        <div className="pt-4">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Configuration</p>
          {[
            { icon: UserPlus, label: "Trainers" },
            { icon: Calendar, label: "Schedule" },
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Admin</span> <span>›</span> <span className="text-foreground">Dashboard Overview</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search data..." className="w-48 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <button className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
          </button>
          <span className="text-sm text-foreground">Admin Panel</span>
        </div>
      </header>

      <div className="p-6">
        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">Overview Dashboard</h1>
            <p className="text-xs text-muted-foreground">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-border text-muted-foreground">
              <Download className="mr-1 h-3 w-3" /> Generate Report
            </Button>
            <Button size="sm" className="gradient-primary border-0 text-primary-foreground">
              <Plus className="mr-1 h-3 w-3" /> Add New Course
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border border-border bg-gradient-to-br ${s.color} p-5`}
            >
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
          {/* Revenue Growth */}
          <div className="gradient-card rounded-xl border border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display font-semibold text-foreground">Revenue Growth (Annual)</h3>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-[10px] text-primary"><span className="h-2 w-2 rounded-full bg-primary" /> Revenue</span>
                <span className="flex items-center gap-1 text-[10px] text-blue-400"><span className="h-2 w-2 rounded-full bg-blue-400" /> Expenses</span>
              </div>
            </div>
            <div className="flex h-40 items-end gap-2">
              {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t bg-primary/60" style={{ height: `${h}%` }} />
                  <span className="text-[8px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enrollment Distribution */}
          <div className="gradient-card rounded-xl border border-border p-5">
            <h3 className="mb-4 font-display font-semibold text-foreground">Enrollment Distribution</h3>
            <div className="flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                  {enrollmentDistribution.map((item, i) => {
                    const offset = enrollmentDistribution.slice(0, i).reduce((acc, d) => acc + d.percent, 0);
                    const colors = ["#e63946", "#3b82f6", "#10b981", "#eab308", "#a855f7"];
                    return (
                      <circle
                        key={item.name}
                        cx="18" cy="18" r="15.9155"
                        fill="none"
                        stroke={colors[i]}
                        strokeWidth="3"
                        strokeDasharray={`${item.percent} ${100 - item.percent}`}
                        strokeDashoffset={`${-offset}`}
                      />
                    );
                  })}
                </svg>
                <div className="absolute text-center">
                  <div className="font-display text-2xl font-bold text-foreground">1,420</div>
                  <div className="text-[10px] text-muted-foreground">Students</div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {enrollmentDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} /> {item.name}
                  </span>
                  <span className="text-foreground">{item.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6 gradient-card rounded-xl border border-border p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">Recent Transactions & Enrollments</h3>
              <p className="text-[10px] text-muted-foreground">Track the latest transactions from the enrollment pipeline.</p>
            </div>
            <button className="text-xs text-primary hover:underline">View All Activities</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-medium">Student</th>
                  <th className="pb-3 font-medium">Course / Batch</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.name} className="border-b border-border/50 last:border-0">
                    <td className="py-3">
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="text-[10px] text-muted-foreground">{t.email}</div>
                    </td>
                    <td className="py-3 text-muted-foreground">{t.course}</td>
                    <td className="py-3 text-muted-foreground">{t.date}</td>
                    <td className="py-3 font-medium text-foreground">{t.amount}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "COMPLETED" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[10px] text-muted-foreground">
          <p>© 2026 TRAININGS FOR NEPAL. ADMIN CONTROL PANEL.</p>
          <div className="flex gap-4">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>HELP CENTER</span>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default AdminDashboard;
