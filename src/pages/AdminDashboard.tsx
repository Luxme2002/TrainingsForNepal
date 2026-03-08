import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BookOpen, DollarSign, TrendingUp, BarChart3, Settings, LogOut,
  GraduationCap, Bell, Search, UserPlus, FileText, Calendar, Plus, Download,
  X, ChevronRight, Edit, Trash2, Eye, CheckCircle, Clock, AlertCircle,
  Star, Award, Menu, User, MessageSquare, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCourses, useAllProfiles, useAllEnrollments, useMessages } from "@/hooks/useDashboardData";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Users, label: "User Management" },
  { icon: BookOpen, label: "Courses" },
  { icon: UserPlus, label: "Enrollments" },
  { icon: MessageSquare, label: "Messages" },
  { icon: DollarSign, label: "Revenue & Finance" },
  { icon: FileText, label: "Reports" },
  { icon: Calendar, label: "Schedule" },
  { icon: User, label: "My Profile" },
  { icon: Settings, label: "Settings" },
];

const recentTransactions = [
  { name: "Arish Koirala", email: "arish@gmail.com", course: "Python", date: "Oct 17, 2025", amount: "NPR 25,000", status: "COMPLETED" },
  { name: "Sunita Dahal", email: "sunita.d@gmail.com", course: "Hardware & Networking", date: "Oct 11, 2025", amount: "NPR 22,000", status: "COMPLETED" },
  { name: "Binod Poudel", email: "binod.p@gmail.com", course: "Digital Marketing", date: "Oct 05, 2025", amount: "NPR 18,000", status: "COMPLETED" },
  { name: "Ramesh Jha", email: "ramesh.jha@gmail.com", course: "Professional Dev", date: "Oct 09, 2025", amount: "NPR 15,000", status: "PENDING" },
];

type ActiveSection =
  | "Dashboard" | "User Management" | "Courses" | "Enrollments" | "Messages"
  | "Revenue & Finance" | "Reports" | "Trainers" | "Schedule" | "My Profile" | "Settings";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, fullName, signOut } = useAuth();
  const { toast } = useToast();

  const { data: courses = [], isLoading: loadingCourses, refetch: refetchCourses } = useCourses();
  const { data: allProfilesData = [], isLoading: loadingProfiles } = useAllProfiles();
  const { data: allEnrollments = [], refetch: refetchEnrollments } = useAllEnrollments();
  const { data: messages = [], refetch: refetchMessages } = useMessages(user?.id);

  const students = allProfilesData.filter(p => p.role === "student");
  const trainers = allProfilesData.filter(p => p.role === "trainer");
  const admins = allProfilesData.filter(p => p.role === "admin");

  const displayName = fullName || user?.email?.split("@")[0] || "Admin";

  const [active, setActive] = useState<ActiveSection>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStudent, setViewStudent] = useState<any>(null);
  const [viewTrainer, setViewTrainer] = useState<any>(null);
  const [editCourse, setEditCourse] = useState<any>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [composeMessage, setComposeMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [notifications] = useState([
    { text: "New enrollment: Student signed up", time: "10m ago", read: false },
    { text: "Payment received: NPR 25,000", time: "1h ago", read: false },
    { text: "Trainer report submitted", time: "3h ago", read: true },
  ]);
  const [settingsToggles, setSettingsToggles] = useState<Record<string, boolean>>({
    "Email Notifications": true, "SMS Alerts": true, "Two-Factor Auth": false, "Auto Backup": true,
  });

  // New course form with extended fields
  const [newCourse, setNewCourse] = useState({
    name: "", trainer: "", fee: "", duration: "", totalLessons: "",
    classTime: "", location: "", abstract: ""
  });

  // Edit course form
  const [editCourseForm, setEditCourseForm] = useState({
    title: "", trainer_name: "", fee: "", duration: "", total_lessons: "",
    class_time: "", location: "", abstract: ""
  });

  // Enrollment form
  const [enrollForm, setEnrollForm] = useState({ studentId: "", courseId: "" });

  // Message compose form
  const [msgForm, setMsgForm] = useState({ recipientId: "", subject: "", body: "" });

  useEffect(() => {
    if (editCourse) {
      setEditCourseForm({
        title: editCourse.title || "",
        trainer_name: editCourse.trainer_name || "",
        fee: editCourse.fee || "",
        duration: editCourse.duration || "",
        total_lessons: editCourse.total_lessons?.toString() || "",
        class_time: editCourse.class_time || "",
        location: editCourse.location || "",
        abstract: editCourse.abstract || "",
      });
    }
  }, [editCourse]);

  // Realtime messages subscription
  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel('admin-messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        refetchMessages();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, refetchMessages]);

  const handleAddCourse = async () => {
    if (!newCourse.name) return;
    const { error } = await supabase.from("courses").insert({
      title: newCourse.name,
      trainer_name: newCourse.trainer || null,
      fee: newCourse.fee ? `NPR ${newCourse.fee}` : "NPR 0",
      total_lessons: parseInt(newCourse.totalLessons) || 0,
      duration: newCourse.duration || null,
      class_time: newCourse.classTime || null,
      location: newCourse.location || null,
      abstract: newCourse.abstract || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Course Added", description: `${newCourse.name} has been added.` });
      setShowAddCourse(false);
      setNewCourse({ name: "", trainer: "", fee: "", duration: "", totalLessons: "", classTime: "", location: "", abstract: "" });
      refetchCourses();
    }
  };

  const handleUpdateCourse = async () => {
    if (!editCourse) return;
    const { error } = await supabase.from("courses").update({
      title: editCourseForm.title,
      trainer_name: editCourseForm.trainer_name || null,
      fee: editCourseForm.fee || "NPR 0",
      total_lessons: parseInt(editCourseForm.total_lessons) || 0,
      duration: editCourseForm.duration || null,
      class_time: editCourseForm.class_time || null,
      location: editCourseForm.location || null,
      abstract: editCourseForm.abstract || null,
    }).eq("id", editCourse.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Course Updated", description: `${editCourseForm.title} has been updated.` });
      setEditCourse(null);
      refetchCourses();
    }
  };

  const handleDeleteCourse = async (id: string, name: string) => {
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Course Deleted", description: `${name} has been removed.` });
      refetchCourses();
    }
  };

  const handleEnrollStudent = async () => {
    if (!enrollForm.studentId || !enrollForm.courseId) {
      toast({ title: "Error", description: "Please select both student and course.", variant: "destructive" });
      return;
    }
    // Check if already enrolled
    const { data: existing } = await supabase
      .from("enrollments")
      .select("id")
      .eq("student_id", enrollForm.studentId)
      .eq("course_id", enrollForm.courseId)
      .maybeSingle();
    if (existing) {
      toast({ title: "Already Enrolled", description: "This student is already enrolled in this course.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("enrollments").insert({
      student_id: enrollForm.studentId,
      course_id: enrollForm.courseId,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student Enrolled", description: "Student has been enrolled successfully." });
      setShowEnrollModal(false);
      setEnrollForm({ studentId: "", courseId: "" });
      refetchEnrollments();
    }
  };

  const handleRemoveEnrollment = async (id: string) => {
    const { error } = await supabase.from("enrollments").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Enrollment Removed" });
      refetchEnrollments();
    }
  };

  const handleSendMessage = async () => {
    if (!msgForm.recipientId || !msgForm.body) {
      toast({ title: "Error", description: "Please select recipient and write a message.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("messages").insert({
      sender_id: user!.id,
      recipient_id: msgForm.recipientId,
      subject: msgForm.subject || "No Subject",
      body: msgForm.body,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Message Sent" });
      setComposeMessage(false);
      setMsgForm({ recipientId: "", subject: "", body: "" });
      refetchMessages();
    }
  };

  const handleMarkRead = async (msgId: string) => {
    await supabase.from("messages").update({ read: true }).eq("id", msgId);
    refetchMessages();
  };

  const filteredStudents = students.filter(s =>
    (s.full_name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { icon: DollarSign, label: "Total Revenue", value: "NPR 12,50,000", change: "+18%", color: "from-primary/20 to-primary/5" },
    { icon: Users, label: "Total Students", value: loadingProfiles ? "..." : students.length.toString(), change: "+12%", color: "from-blue-500/20 to-blue-500/5" },
    { icon: BookOpen, label: "Active Courses", value: loadingCourses ? "..." : courses.length.toString(), change: `${courses.length}`, color: "from-emerald-500/20 to-emerald-500/5" },
    { icon: TrendingUp, label: "Trainers", value: loadingProfiles ? "..." : trainers.length.toString(), change: "Active", color: "from-yellow-500/20 to-yellow-500/5" },
  ];

  const unreadMessages = messages.filter(m => !m.read && m.recipient_id === user?.id);

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
          <button key={item.label} onClick={() => { setActive(item.label as ActiveSection); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active === item.label ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}>
            <item.icon className="h-4 w-4" />
            {item.label}
            {item.label === "Messages" && unreadMessages.length > 0 && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{unreadMessages.length}</span>
            )}
          </button>
        ))}
      </nav>
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2" onClick={async () => { await signOut(); navigate("/login"); }}><LogOut className="h-4 w-4" /> Sign Out</Button>
    </aside>
  );

  const InputField = ({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) => (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none h-20" />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
      )}
    </div>
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
              <input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-48 rounded-lg border border-border bg-secondary/50 pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{notifications.filter(n => !n.read).length}</span>
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-12 w-72 rounded-xl border border-border bg-card shadow-xl z-50 p-3">
                    <h4 className="font-display font-semibold text-foreground text-sm mb-2">Notifications</h4>
                    {notifications.map((n, i) => (
                      <div key={i} className={`rounded-lg p-2 mb-1 text-xs cursor-pointer hover:bg-secondary/50 ${!n.read ? "bg-primary/5" : ""}`}
                        onClick={() => { setShowNotifications(false); toast({ title: "Notification", description: n.text }); }}>
                        <p className={`${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.text}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setActive("My Profile")} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground hover:bg-secondary/80">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-3 w-3" /></div>
              <span className="hidden sm:inline">{displayName}</span>
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
                  <p className="text-xs text-muted-foreground">Welcome back, {displayName}. Here's what's happening today.</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border text-muted-foreground hidden sm:flex"
                    onClick={() => toast({ title: "Export Started", description: "Dashboard data is being exported as CSV." })}>
                    <Download className="mr-1 h-3 w-3" /> Export
                  </Button>
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setShowAddCourse(true)}>
                    <Plus className="mr-1 h-3 w-3" /> Add Course
                  </Button>
                </div>
              </div>
              <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border border-border bg-gradient-to-br ${s.color} p-5 cursor-pointer hover:border-primary/30 transition-colors`}
                    onClick={() => {
                      if (s.label === "Total Revenue") setActive("Revenue & Finance");
                      else if (s.label === "Total Students") setActive("User Management");
                      else if (s.label === "Active Courses") setActive("Courses");
                      else setActive("User Management");
                    }}>
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
                      <div key={i} className="flex flex-1 flex-col items-center gap-1 cursor-pointer group"
                        onClick={() => toast({ title: `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]} Revenue`, description: `NPR ${(h * 1250).toLocaleString()}` })}>
                        <div className="w-full rounded-t bg-primary/60 group-hover:bg-primary transition-colors" style={{ height: `${h}%` }} />
                        <span className="text-[8px] text-muted-foreground">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="mb-4 font-display font-semibold text-foreground">Courses Overview</h3>
                  <div className="space-y-3">
                    {courses.slice(0, 5).map((c) => (
                      <div key={c.id} className="cursor-pointer hover:bg-secondary/20 rounded-lg p-1 transition-colors"
                        onClick={() => setActive("Courses")}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{c.icon} {c.title}</span>
                          <span className="text-xs font-medium text-foreground">{c.fee}</span>
                        </div>
                        <div className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /><span className="text-xs text-muted-foreground">{c.rating}</span></div>
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
                        <th className="pb-3 font-medium">Student</th><th className="pb-3 font-medium">Course</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t) => (
                        <tr key={t.name} className="border-b border-border/50 last:border-0 cursor-pointer hover:bg-secondary/20">
                          <td className="py-3"><div className="font-medium text-foreground">{t.name}</div><div className="text-[10px] text-muted-foreground">{t.email}</div></td>
                          <td className="py-3 text-muted-foreground text-xs">{t.course}</td>
                          <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                          <td className="py-3 font-medium text-foreground text-xs">{t.amount}</td>
                          <td className="py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "COMPLETED" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>{t.status}</span></td>
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
              </div>
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Students", value: students.length.toString(), icon: Users, color: "text-blue-400" },
                  { label: "Active Trainers", value: trainers.length.toString(), icon: UserPlus, color: "text-primary" },
                  { label: "Admins", value: admins.length.toString(), icon: Award, color: "text-yellow-400" },
                ].map((s) => (
                  <div key={s.label} className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                    <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="font-display text-2xl font-bold text-foreground">{s.value}</p></div>
                  </div>
                ))}
              </div>
              <div className="gradient-card rounded-xl border border-border p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">All Students</h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                    <input placeholder="Filter students..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                      className="w-40 rounded-lg border border-border bg-secondary/50 pl-7 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                {loadingProfiles ? (
                  <p className="text-center text-muted-foreground py-4">Loading...</p>
                ) : filteredStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No students found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                          <th className="pb-3 font-medium">Name</th><th className="pb-3 font-medium">Role</th><th className="pb-3 font-medium">Joined</th><th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((s) => (
                          <tr key={s.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
                            <td className="py-3"><div className="font-medium text-foreground">{s.full_name || "Unnamed"}</div><div className="text-[10px] text-muted-foreground">ID: {s.user_id.slice(0, 8)}</div></td>
                            <td className="py-3"><span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-medium">{s.role}</span></td>
                            <td className="py-3 text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                            <td className="py-3">
                              <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" onClick={() => setViewStudent(s)}><Eye className="h-3 w-3" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
              {loadingCourses ? (
                <p className="text-center text-muted-foreground py-10">Loading courses...</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((c, i) => (
                    <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className="gradient-card rounded-xl border border-border p-5 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-display font-semibold text-foreground text-sm">{c.icon} {c.title}</h3>
                        <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-medium">{c.status}</span>
                      </div>
                      {c.abstract && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{c.abstract}</p>}
                      <div className="space-y-1 text-xs text-muted-foreground mb-3">
                        <p>👤 Trainer: {c.trainer_name || "TBA"}</p>
                        <p>📚 Lessons: <span className="text-foreground font-medium">{c.total_lessons}</span></p>
                        <p>💰 Fee: <span className="text-primary font-medium">{c.fee}</span></p>
                        {c.duration && <p>⏱ Duration: {c.duration}</p>}
                        {c.class_time && <p>🕐 Time: {c.class_time}</p>}
                        {c.location && <p>📍 Location: {c.location}</p>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-400 fill-yellow-400" /><span className="text-xs font-medium text-foreground">{c.rating}</span></div>
                        <div className="flex gap-1">
                          <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground" onClick={() => setEditCourse(c)}><Edit className="h-3 w-3" /></button>
                          <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-primary" onClick={() => handleDeleteCourse(c.id, c.title)}><Trash2 className="h-3 w-3" /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ENROLLMENTS */}
          {active === "Enrollments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Enrollment Management</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setShowEnrollModal(true)}>
                  <Plus className="mr-1 h-3 w-3" /> Enroll Student
                </Button>
              </div>
              <div className="gradient-card rounded-xl border border-border p-5">
                {allEnrollments.length === 0 ? (
                  <div className="text-center py-10">
                    <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No enrollments yet. Click "Enroll Student" to get started.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                          <th className="pb-3 font-medium">Student ID</th><th className="pb-3 font-medium">Course</th><th className="pb-3 font-medium">Progress</th><th className="pb-3 font-medium">Enrolled</th><th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allEnrollments.map((e: any) => (
                          <tr key={e.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
                            <td className="py-3 text-xs text-foreground">{e.student_id?.slice(0, 8)}...</td>
                            <td className="py-3 text-xs text-foreground">{e.course?.icon} {e.course?.title || "Unknown"}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <Progress value={e.progress || 0} className="h-2 w-20" />
                                <span className="text-xs text-muted-foreground">{e.progress || 0}%</span>
                              </div>
                            </td>
                            <td className="py-3 text-xs text-muted-foreground">{e.enrolled_at ? new Date(e.enrolled_at).toLocaleDateString() : ""}</td>
                            <td className="py-3">
                              <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-primary" onClick={() => handleRemoveEnrollment(e.id)}><Trash2 className="h-3 w-3" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* MESSAGES */}
          {active === "Messages" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Messages</h1>
                <Button size="sm" className="gradient-primary border-0 text-primary-foreground" onClick={() => setComposeMessage(true)}>
                  <Plus className="mr-1 h-3 w-3" /> Compose
                </Button>
              </div>
              <div className="grid gap-4 lg:grid-cols-5">
                <div className="lg:col-span-2 space-y-2">
                  {messages.length === 0 ? (
                    <div className="gradient-card rounded-xl border border-border p-6 text-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No messages yet.</p>
                    </div>
                  ) : messages.map((m) => {
                    const isSent = m.sender_id === user?.id;
                    const otherUserId = isSent ? m.recipient_id : m.sender_id;
                    const otherProfile = allProfilesData.find(p => p.user_id === otherUserId);
                    return (
                      <div key={m.id}
                        className={`gradient-card rounded-xl border border-border p-3 cursor-pointer hover:border-primary/30 transition-colors ${selectedMessage?.id === m.id ? "border-primary/50" : ""} ${!m.read && !isSent ? "bg-primary/5" : ""}`}
                        onClick={() => { setSelectedMessage(m); if (!m.read && !isSent) handleMarkRead(m.id); }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{isSent ? `To: ${otherProfile?.full_name || "User"}` : `From: ${otherProfile?.full_name || "User"}`}</span>
                          <span className="text-[10px] text-muted-foreground">{new Date(m.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs font-medium text-foreground">{m.subject}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{m.body}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="lg:col-span-3">
                  {selectedMessage ? (() => {
                    const isSent = selectedMessage.sender_id === user?.id;
                    const otherUserId = isSent ? selectedMessage.recipient_id : selectedMessage.sender_id;
                    const otherProfile = allProfilesData.find((p: any) => p.user_id === otherUserId);
                    return (
                      <div className="gradient-card rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-display font-semibold text-foreground">{selectedMessage.subject}</h3>
                            <p className="text-xs text-muted-foreground">{isSent ? `To: ${otherProfile?.full_name || "User"}` : `From: ${otherProfile?.full_name || "User"}`} • {new Date(selectedMessage.created_at).toLocaleString()}</p>
                          </div>
                          <button onClick={() => setSelectedMessage(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
                        </div>
                        <p className="text-sm text-foreground whitespace-pre-wrap">{selectedMessage.body}</p>
                        {!isSent && (
                          <Button size="sm" className="mt-4 gradient-primary border-0 text-primary-foreground" onClick={() => {
                            setMsgForm({ recipientId: selectedMessage.sender_id, subject: `Re: ${selectedMessage.subject}`, body: "" });
                            setComposeMessage(true);
                          }}>
                            <Send className="mr-1 h-3 w-3" /> Reply
                          </Button>
                        )}
                      </div>
                    );
                  })() : (
                    <div className="gradient-card rounded-xl border border-border p-10 text-center">
                      <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Select a message to read</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* REVENUE & FINANCE */}
          {active === "Revenue & Finance" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-6 flex items-center justify-between">
                <h1 className="font-display text-xl font-bold text-foreground">Revenue & Finance</h1>
                <Button size="sm" variant="outline" className="border-border text-muted-foreground"
                  onClick={() => toast({ title: "Exporting Finance Data", description: "Your finance report is being generated as PDF." })}>
                  <Download className="mr-1 h-3 w-3" /> Export
                </Button>
              </div>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Revenue", value: "NPR 12,50,000", icon: DollarSign, change: "+18%", color: "text-primary" },
                  { label: "This Month", value: "NPR 1,85,000", icon: TrendingUp, change: "+12%", color: "text-emerald-400" },
                  { label: "Pending Fees", value: "NPR 45,000", icon: AlertCircle, change: "4 Students", color: "text-yellow-400" },
                ].map((s) => (
                  <div key={s.label} className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-2"><s.icon className={`h-5 w-5 ${s.color}`} /><span className="text-[10px] text-primary font-medium">{s.change}</span></div>
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
                        <th className="pb-3 font-medium">Student</th><th className="pb-3 font-medium">Course</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((t) => (
                        <tr key={t.name} className="border-b border-border/50 last:border-0 hover:bg-secondary/20">
                          <td className="py-3"><div className="font-medium text-foreground">{t.name}</div><div className="text-[10px] text-muted-foreground">{t.email}</div></td>
                          <td className="py-3 text-muted-foreground text-xs">{t.course}</td>
                          <td className="py-3 text-muted-foreground text-xs">{t.date}</td>
                          <td className="py-3 font-medium text-foreground text-xs">{t.amount}</td>
                          <td className="py-3"><span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${t.status === "COMPLETED" ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-500"}`}>{t.status}</span></td>
                          <td className="py-3"><button className="text-xs text-primary hover:underline flex items-center gap-1"
                            onClick={() => toast({ title: "Receipt Downloaded", description: `Receipt for ${t.name} - ${t.amount}` })}><Download className="h-3 w-3" /> PDF</button></td>
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
                  { title: "Monthly Enrollment Report", desc: "Student enrollment trends", icon: Users },
                  { title: "Revenue Report", desc: "Financial summary for Q1 2026", icon: DollarSign },
                  { title: "Course Performance", desc: "Completion rates and ratings", icon: Star },
                  { title: "Trainer Activity", desc: "Sessions taught and ratings", icon: Award },
                  { title: "Batch Progress", desc: "Current batch completion status", icon: BarChart3 },
                  { title: "Annual Summary", desc: "Year-over-year growth", icon: TrendingUp },
                ].map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-5 cursor-pointer hover:border-primary/50 transition-colors">
                    <r.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-display font-semibold text-foreground text-sm mb-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{r.desc}</p>
                    <Button size="sm" variant="outline" className="w-full border-border text-muted-foreground text-xs"
                      onClick={() => toast({ title: "Downloading Report", description: `${r.title} is being generated.` })}>
                      <Download className="mr-1 h-3 w-3" /> Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCHEDULE */}
          {active === "Schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Class Schedule</h1>
              <div className="space-y-4">
                {courses.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex flex-wrap items-center gap-4 hover:border-primary/30 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20"><Calendar className="h-5 w-5 text-primary" /></div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm">{c.icon} {c.title}</h3>
                      <p className="text-xs text-muted-foreground">{c.trainer_name || "TBA"}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {c.class_time && <p>🕐 {c.class_time}</p>}
                      {c.location && <p>📍 {c.location}</p>}
                      {c.duration && <p>⏱ {c.duration}</p>}
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
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-10 w-10" /></div>
                  <h2 className="font-display font-bold text-foreground text-lg">{displayName}</h2>
                  <p className="text-sm text-muted-foreground mb-2">System Administrator</p>
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">Administrator</span>
                  <div className="mt-4">
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground w-full" onClick={() => setEditProfile(true)}>Edit Profile</Button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4">Account Details</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: displayName },
                        { label: "Email", value: user?.email || "" },
                        { label: "Role", value: "Admin" },
                        { label: "Joined", value: user?.created_at ? new Date(user.created_at).toLocaleDateString() : "" },
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
                      {["User Management", "Course Control", "Finance Access", "Reports", "System Settings"].map((p) => (
                        <span key={p} className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"><CheckCircle className="h-3 w-3" /> {p}</span>
                      ))}
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
                    className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => toast({ title: s.title, description: `${s.desc} — Opening settings panel...` })}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
                    <div className="flex-1"><h3 className="font-display font-semibold text-foreground text-sm">{s.title}</h3><p className="text-xs text-muted-foreground">{s.desc}</p></div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))}
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-4">Theme</h3>
                  <div className="flex items-center gap-3"><span className="text-sm text-muted-foreground">Toggle between light and dark mode:</span><ThemeToggle /></div>
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3">Quick Toggles</h3>
                  {Object.entries(settingsToggles).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-foreground">{key}</span>
                      <button onClick={() => { setSettingsToggles(prev => ({ ...prev, [key]: !prev[key] })); toast({ title: key, description: `${key} has been ${!val ? "enabled" : "disabled"}.` }); }}
                        className={`w-10 h-5 rounded-full border relative transition-colors ${val ? "bg-primary/20 border-primary/30" : "bg-secondary border-border"}`}>
                        <div className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${val ? "right-0.5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {showAddCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowAddCourse(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Add New Course</h2><button onClick={() => setShowAddCourse(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                <InputField label="Course Name *" value={newCourse.name} onChange={v => setNewCourse(p => ({ ...p, name: v }))} placeholder="e.g. Python Programming" />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Duration" value={newCourse.duration} onChange={v => setNewCourse(p => ({ ...p, duration: v }))} placeholder="e.g. 3 Months" />
                  <InputField label="Fee (NPR)" value={newCourse.fee} onChange={v => setNewCourse(p => ({ ...p, fee: v }))} placeholder="e.g. 25000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Class Time" value={newCourse.classTime} onChange={v => setNewCourse(p => ({ ...p, classTime: v }))} placeholder="e.g. Mon-Fri 10AM" />
                  <InputField label="Location" value={newCourse.location} onChange={v => setNewCourse(p => ({ ...p, location: v }))} placeholder="e.g. Lab A" />
                </div>
                <InputField label="Trainer Name" value={newCourse.trainer} onChange={v => setNewCourse(p => ({ ...p, trainer: v }))} placeholder="e.g. Sandip Lamichhane" />
                <InputField label="Total Lessons" value={newCourse.totalLessons} onChange={v => setNewCourse(p => ({ ...p, totalLessons: v }))} placeholder="e.g. 30" />
                <InputField label="Course Abstract" value={newCourse.abstract} onChange={v => setNewCourse(p => ({ ...p, abstract: v }))} placeholder="Brief course description..." textarea />
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={handleAddCourse}>Add Course</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setShowAddCourse(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {editCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditCourse(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Edit Course</h2><button onClick={() => setEditCourse(null)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                <InputField label="Course Name" value={editCourseForm.title} onChange={v => setEditCourseForm(p => ({ ...p, title: v }))} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Duration" value={editCourseForm.duration} onChange={v => setEditCourseForm(p => ({ ...p, duration: v }))} placeholder="e.g. 3 Months" />
                  <InputField label="Fee" value={editCourseForm.fee} onChange={v => setEditCourseForm(p => ({ ...p, fee: v }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Class Time" value={editCourseForm.class_time} onChange={v => setEditCourseForm(p => ({ ...p, class_time: v }))} placeholder="e.g. Mon-Fri 10AM" />
                  <InputField label="Location" value={editCourseForm.location} onChange={v => setEditCourseForm(p => ({ ...p, location: v }))} placeholder="e.g. Lab A" />
                </div>
                <InputField label="Trainer" value={editCourseForm.trainer_name} onChange={v => setEditCourseForm(p => ({ ...p, trainer_name: v }))} />
                <InputField label="Total Lessons" value={editCourseForm.total_lessons} onChange={v => setEditCourseForm(p => ({ ...p, total_lessons: v }))} />
                <InputField label="Course Abstract" value={editCourseForm.abstract} onChange={v => setEditCourseForm(p => ({ ...p, abstract: v }))} textarea />
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={handleUpdateCourse}>Save Changes</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setEditCourse(null)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEnrollModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowEnrollModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Enroll Student</h2><button onClick={() => setShowEnrollModal(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Select Student</label>
                  <select value={enrollForm.studentId} onChange={e => setEnrollForm(p => ({ ...p, studentId: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">-- Choose Student --</option>
                    {students.map(s => <option key={s.user_id} value={s.user_id}>{s.full_name || s.user_id.slice(0, 8)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Select Course</label>
                  <select value={enrollForm.courseId} onChange={e => setEnrollForm(p => ({ ...p, courseId: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">-- Choose Course --</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.icon} {c.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={handleEnrollStudent}>Enroll</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setShowEnrollModal(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {composeMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setComposeMessage(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Compose Message</h2><button onClick={() => setComposeMessage(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Recipient</label>
                  <select value={msgForm.recipientId} onChange={e => setMsgForm(p => ({ ...p, recipientId: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                    <option value="">-- Choose Recipient --</option>
                    {allProfilesData.filter(p => p.user_id !== user?.id).map(p => <option key={p.user_id} value={p.user_id}>{p.full_name || p.user_id.slice(0, 8)} ({p.role})</option>)}
                  </select>
                </div>
                <InputField label="Subject" value={msgForm.subject} onChange={v => setMsgForm(p => ({ ...p, subject: v }))} placeholder="Message subject" />
                <InputField label="Message" value={msgForm.body} onChange={v => setMsgForm(p => ({ ...p, body: v }))} placeholder="Write your message..." textarea />
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={handleSendMessage}><Send className="mr-1 h-3 w-3" /> Send</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setComposeMessage(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewStudent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewStudent(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Student Details</h2><button onClick={() => setViewStudent(null)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary text-lg font-bold">{(viewStudent.full_name || "S").charAt(0)}</div>
                <div><p className="font-bold text-foreground">{viewStudent.full_name || "Unnamed"}</p><p className="text-xs text-muted-foreground">Student</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Role", value: viewStudent.role },
                  { label: "Joined", value: new Date(viewStudent.created_at).toLocaleDateString() },
                  { label: "User ID", value: viewStudent.user_id.slice(0, 12) + "..." },
                  { label: "Status", value: "Active" },
                ].map(d => (
                  <div key={d.label} className="rounded-lg bg-secondary/30 p-3"><p className="text-[10px] text-muted-foreground uppercase">{d.label}</p><p className="text-sm font-medium text-foreground mt-1">{d.value}</p></div>
                ))}
              </div>
              <Button className="w-full mt-4 gradient-primary border-0 text-primary-foreground" onClick={() => setViewStudent(null)}>Close</Button>
            </motion.div>
          </motion.div>
        )}

        {viewTrainer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewTrainer(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Trainer Details</h2><button onClick={() => setViewTrainer(null)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary text-lg font-bold">{(viewTrainer.full_name || "T").charAt(0)}</div>
                <div><p className="font-bold text-foreground">{viewTrainer.full_name || "Unnamed"}</p><p className="text-xs text-muted-foreground">Trainer</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Role", value: viewTrainer.role },
                  { label: "Joined", value: new Date(viewTrainer.created_at).toLocaleDateString() },
                ].map(d => (
                  <div key={d.label} className="rounded-lg bg-secondary/30 p-3"><p className="text-[10px] text-muted-foreground uppercase">{d.label}</p><p className="text-sm font-medium text-foreground mt-1">{d.value}</p></div>
                ))}
              </div>
              <Button className="w-full mt-4 gradient-primary border-0 text-primary-foreground" onClick={() => setViewTrainer(null)}>Close</Button>
            </motion.div>
          </motion.div>
        )}

        {editProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditProfile(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Edit Profile</h2><button onClick={() => setEditProfile(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: displayName },
                  { label: "Email", value: user?.email || "" },
                ].map(f => (
                  <div key={f.label}><label className="text-xs text-muted-foreground">{f.label}</label><input defaultValue={f.value} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={() => { setEditProfile(false); toast({ title: "Profile Updated", description: "Your profile has been updated." }); }}>Save Changes</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setEditProfile(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
