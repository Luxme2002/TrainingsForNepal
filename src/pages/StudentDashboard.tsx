import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Clock, Award, GraduationCap, LogOut, Calendar, FileText,
  Settings, Bell, User, MessageSquare, HelpCircle, ChevronRight, Video,
  Download, CheckCircle2, Star, X, Menu, Upload, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const enrolledCourses = [
  { title: "Basic to Intermediate Python", progress: 65, lessons: "42/65 Lessons", instructor: "Sandip Lamichhane", icon: "🐍", nextLesson: "OOP Concepts", deadline: "Mar 10, 2026" },
  { title: "Digital Marketing", progress: 20, lessons: "8/40 Lessons", instructor: "Priya Sharma", icon: "📢", nextLesson: "Google Ads Basics", deadline: "Apr 5, 2026" },
];

const upcomingSessions = [
  { title: "Python Advanced OOP", time: "10:00 AM - 12:00 PM (NPT)", type: "LIVE LAB", date: "24 Feb", course: "Python" },
  { title: "Digital Literacy Workshop", time: "2:00 PM - 4:00 PM (NPT)", type: "WORKSHOP", date: "26 Feb", course: "Digital Literacy" },
];

const initialAssignments = [
  { title: "Python Data Structures Project", course: "Python", due: "Feb 25, 2026", status: "Submitted", grade: "Pending" },
  { title: "SEO Audit Report", course: "Digital Marketing", due: "Mar 2, 2026", status: "Pending", grade: "-" },
  { title: "Basic Algorithm Challenge", course: "Python", due: "Feb 28, 2026", status: "Graded", grade: "88/100" },
];

const certificates = [
  { title: "Digital Literacy Certificate", issued: "Jan 15, 2026", issuer: "Trainings for Nepal", id: "TFN-DL-2026-001" },
  { title: "Web Design Fundamentals", issued: "Nov 20, 2025", issuer: "Trainings for Nepal", id: "TFN-WD-2025-044" },
];

const resources = [
  { title: "Python Cheat Sheet", type: "PDF", course: "Python", size: "2.4 MB" },
  { title: "Digital Marketing Glossary", type: "PDF", course: "Digital Marketing", size: "1.8 MB" },
  { title: "Practice Problems Set 1", type: "ZIP", course: "Python", size: "5.2 MB" },
  { title: "SEO Toolkit Templates", type: "ZIP", course: "Digital Marketing", size: "3.1 MB" },
];

const initialMessages = [
  { from: "Sandip Lamichhane", subject: "Assignment Feedback", preview: "Great work on the data structures assignment. Your implementation of the binary search tree was excellent. Keep up the good work!", time: "2h ago", read: false },
  { from: "Admin", subject: "Fee Reminder", preview: "Please ensure your next installment is paid by March 1st, 2026. Contact the office if you need any assistance.", time: "1d ago", read: true },
  { from: "Priya Sharma", subject: "Class Rescheduled", preview: "Tomorrow's Digital Marketing class has been moved to 3:00 PM due to a scheduling conflict. Please plan accordingly.", time: "2d ago", read: true },
];

const studentProfile = {
  name: "Aaryan Thapa",
  id: "#5021",
  email: "aaryan.thapa@gmail.com",
  phone: "9800000000",
  address: "Kathmandu, Nepal",
  enrolled: "January 2026",
  courses: 2,
  certificates: 2,
};

type ActiveSection = "Dashboard" | "My Courses" | "Schedule" | "Assignments" | "Certificates" | "Resources" | "Messages" | "My Profile" | "Settings" | "Help Center";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [active, setActive] = useState<ActiveSection>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [messages, setMessages] = useState(initialMessages);
  const [editProfile, setEditProfile] = useState(false);
  const [showCourseDetail, setShowCourseDetail] = useState<typeof enrolledCourses[0] | null>(null);
  const [settingsToggles, setSettingsToggles] = useState<Record<string, boolean>>({
    "Class reminders": true, "Assignment deadlines": true, "New messages": true, "Grade updates": true,
  });
  const [notifications] = useState([
    { text: "Assignment graded: 88/100 - Algorithm Challenge", time: "1h ago", read: false },
    { text: "New message from Sandip Lamichhane", time: "2h ago", read: false },
    { text: "Fee reminder: Installment due Mar 1", time: "1d ago", read: true },
  ]);
  const { toast } = useToast();

  const handleSubmitAssignment = (title: string) => {
    setAssignments(prev => prev.map(a => a.title === title ? { ...a, status: "Submitted" } : a));
    toast({ title: "Assignment Submitted", description: `${title} has been submitted successfully.` });
  };

  const navMain = [
    { icon: BookOpen, label: "Dashboard" },
    { icon: FileText, label: "My Courses" },
    { icon: Calendar, label: "Schedule" },
    { icon: FileText, label: "Assignments" },
    { icon: Award, label: "Certificates" },
    { icon: Download, label: "Resources" },
    { icon: MessageSquare, label: "Messages" },
    { icon: User, label: "My Profile" },
  ];

  const navSupport = [
    { icon: HelpCircle, label: "Help Center" },
    { icon: Settings, label: "Settings" },
  ];

  const Sidebar = () => (
    <aside className={`${sidebarOpen ? "flex" : "hidden"} lg:flex w-64 flex-col border-r border-border bg-card p-4 fixed lg:static inset-y-0 left-0 z-50`}>
      <div className="mb-8 flex items-center justify-between px-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg"><GraduationCap className="h-4 w-4 text-primary-foreground" /></div>
          <div>
            <span className="font-display text-sm font-bold text-foreground block">TRAININGS FOR NEPAL</span>
            <p className="text-[10px] text-muted-foreground">Student Portal</p>
          </div>
        </Link>
        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="h-4 w-4 text-muted-foreground" /></button>
      </div>
      <nav className="flex-1 space-y-1">
        {navMain.map((item) => (
          <button key={item.label} onClick={() => { setActive(item.label as ActiveSection); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active === item.label ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
            <item.icon className="h-4 w-4" />{item.label}
          </button>
        ))}
        <div className="pt-4">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Support</p>
          {navSupport.map((item) => (
            <button key={item.label} onClick={() => { setActive(item.label as ActiveSection); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active === item.label ? "gradient-primary font-medium text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              <item.icon className="h-4 w-4" />{item.label}
            </button>
          ))}
        </div>
      </nav>
      <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2" onClick={async () => { await signOut(); navigate("/login"); }}><LogOut className="h-4 w-4" />Sign Out</Button>
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
            <input placeholder="Search lessons..." className="hidden md:block w-48 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground relative">
                <Bell className="h-4 w-4" />
                {notifications.filter(n => !n.read).length > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{notifications.filter(n => !n.read).length}</span>}
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
            <button onClick={() => { setActive("Messages"); setShowNotifications(false); }} className="rounded-lg bg-secondary p-2 text-muted-foreground hover:text-foreground"><MessageSquare className="h-4 w-4" /></button>
            <button onClick={() => setActive("My Profile")} className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-foreground hover:bg-secondary/80">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-3 w-3" /></div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium">{studentProfile.name}</p>
                <p className="text-[10px] text-muted-foreground">ID: {studentProfile.id}</p>
              </div>
            </button>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* DASHBOARD */}
          {active === "Dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl bg-gradient-to-r from-primary/80 via-primary/60 to-primary/30 p-6">
                <h2 className="mb-1 font-display text-2xl font-bold text-primary-foreground">Namaste, Aaryan! 👋</h2>
                <p className="mb-4 text-sm text-primary-foreground/80">Ready to level up your tech skills today? You've completed <span className="font-bold underline">12 lessons</span> this week!</p>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setActive("My Courses")}>Resume Last Lesson</Button>
                  <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setActive("Schedule")}>View Schedule</Button>
                </div>
              </motion.div>
              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: BookOpen, label: "Courses Enrolled", value: "02", sub: "2 In Progress", color: "text-primary", click: "My Courses" },
                  { icon: Award, label: "Certificates Earned", value: "02", sub: "Verified by TFN", color: "text-emerald-400", click: "Certificates" },
                  { icon: Clock, label: "Learning Hours", value: "120+", sub: "+15% improvement", color: "text-primary", click: "Schedule" },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="gradient-card rounded-xl border border-border p-5 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => setActive(s.click as ActiveSection)}>
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
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="font-display font-semibold text-foreground">Courses In Progress</h3>
                  {enrolledCourses.map((c) => (
                    <div key={c.title} className="gradient-card rounded-xl border border-border p-5 cursor-pointer hover:border-primary/30 transition-colors"
                      onClick={() => setShowCourseDetail(c)}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg">{c.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-semibold text-foreground text-sm">{c.title}</h4>
                            <span className="text-sm font-medium text-primary">{c.progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Mentor: {c.instructor} • {c.lessons}</p>
                          <Progress value={c.progress} className="mt-2 h-2" />
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">Next: {c.nextLesson}</span>
                            <button className="flex items-center gap-1 text-xs text-primary hover:underline" onClick={(e) => { e.stopPropagation(); setActive("My Courses"); }}>Continue <ChevronRight className="h-3 w-3" /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 lg:col-span-2">
                  <h3 className="font-display font-semibold text-foreground">Upcoming Sessions</h3>
                  {upcomingSessions.map((s) => (
                    <div key={s.title} className="gradient-card rounded-xl border border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-secondary text-xs font-bold text-foreground">{s.date.split(" ")[0]}</div>
                        <div>
                          <span className="text-[10px] font-medium text-primary">{s.type}</span>
                          <p className="text-sm font-medium text-foreground">{s.title}</p>
                          <p className="text-[10px] text-muted-foreground">{s.time}</p>
                        </div>
                      </div>
                      <Button size="sm" className="mt-3 w-full gradient-primary border-0 text-primary-foreground text-xs"
                        onClick={() => toast({ title: "Joining Session", description: `Connecting to ${s.title}...` })}>
                        <Video className="mr-1 h-3 w-3" /> Join Live Meeting
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* MY COURSES */}
          {active === "My Courses" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">My Courses</h1>
              <div className="space-y-4">
                {enrolledCourses.map((c) => (
                  <div key={c.title} className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-2xl">{c.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div><h3 className="font-display font-bold text-foreground">{c.title}</h3><p className="text-xs text-muted-foreground">Instructor: {c.instructor} • {c.lessons}</p></div>
                          <span className="text-xl font-bold text-primary">{c.progress}%</span>
                        </div>
                        <Progress value={c.progress} className="h-2 mb-3" />
                        <div className="flex flex-wrap gap-2"><span className="text-xs text-muted-foreground">📖 Next: {c.nextLesson}</span><span className="text-xs text-muted-foreground">⏰ Deadline: {c.deadline}</span></div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs"
                            onClick={() => toast({ title: "Resuming Course", description: `Loading ${c.nextLesson}...` })}>
                            <Video className="mr-1 h-3 w-3" />Continue Learning
                          </Button>
                          <Button size="sm" variant="outline" className="border-border text-xs"
                            onClick={() => setShowCourseDetail(c)}>View Syllabus</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCHEDULE */}
          {active === "Schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">My Schedule</h1>
              <div className="space-y-3">
                {upcomingSessions.map((s, i) => (
                  <motion.div key={s.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-primary/20 text-primary">
                      <span className="text-lg font-bold">{s.date.split(" ")[0]}</span>
                      <span className="text-[8px]">{s.date.split(" ")[1]}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-medium text-primary">{s.type}</span>
                      <h3 className="font-display font-semibold text-foreground text-sm">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.time} • {s.course}</p>
                    </div>
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs"
                      onClick={() => toast({ title: "Joining Session", description: `Connecting to ${s.title}...` })}>
                      <Video className="mr-1 h-3 w-3" />Join
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ASSIGNMENTS */}
          {active === "Assignments" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Assignments</h1>
              <div className="space-y-3">
                {assignments.map((a, i) => (
                  <motion.div key={a.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div><h3 className="font-display font-semibold text-foreground text-sm">{a.title}</h3><p className="text-xs text-muted-foreground">{a.course} • Due: {a.due}</p></div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        a.status === "Graded" ? "bg-emerald-500/10 text-emerald-400" :
                        a.status === "Submitted" ? "bg-blue-500/10 text-blue-400" :
                        "bg-yellow-500/10 text-yellow-400"
                      }`}>{a.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Grade: <span className="font-medium text-foreground">{a.grade}</span></span>
                      {a.status === "Pending" && (
                        <Button size="sm" className="gradient-primary border-0 text-primary-foreground text-xs"
                          onClick={() => handleSubmitAssignment(a.title)}>
                          <Upload className="mr-1 h-3 w-3" /> Submit
                        </Button>
                      )}
                      {a.status === "Graded" && (
                        <Button size="sm" variant="outline" className="border-border text-xs"
                          onClick={() => toast({ title: "Viewing Feedback", description: `Grade: ${a.grade} — Good work on ${a.title}!` })}>
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CERTIFICATES */}
          {active === "Certificates" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">My Certificates</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                {certificates.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="gradient-card rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20"><Award className="h-6 w-6 text-primary" /></div>
                      <div><h3 className="font-display font-semibold text-foreground text-sm">{c.title}</h3><p className="text-xs text-muted-foreground">{c.issuer}</p></div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground mb-4"><p>📅 Issued: {c.issued}</p><p>🔑 ID: {c.id}</p></div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 gradient-primary border-0 text-primary-foreground text-xs"
                        onClick={() => toast({ title: "Certificate Downloaded", description: `${c.title} has been downloaded.` })}>
                        <Download className="mr-1 h-3 w-3" />Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-border text-xs"
                        onClick={() => { navigator.clipboard.writeText(`https://trainingsfornepal.com/verify/${c.id}`); toast({ title: "Link Copied", description: "Certificate verification link copied to clipboard!" }); }}>
                        Share
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 gradient-card rounded-xl border border-border p-5 text-center">
                <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-display font-semibold text-foreground mb-1">Complete Your Courses</h3>
                <p className="text-xs text-muted-foreground mb-3">Finish Python and Digital Marketing to earn 2 more certificates!</p>
                <Button size="sm" variant="outline" className="border-border text-xs" onClick={() => setActive("My Courses")}>Go to Courses</Button>
              </div>
            </motion.div>
          )}

          {/* RESOURCES */}
          {active === "Resources" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Learning Resources</h1>
              <div className="space-y-3">
                {resources.map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className="gradient-card rounded-xl border border-border p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-5 w-5 text-primary" /></div>
                    <div className="flex-1"><h3 className="font-display font-semibold text-foreground text-sm">{r.title}</h3><p className="text-xs text-muted-foreground">{r.course} • {r.type} • {r.size}</p></div>
                    <Button size="sm" variant="outline" className="border-border text-xs"
                      onClick={() => toast({ title: "Downloading", description: `${r.title} (${r.size}) is being downloaded.` })}>
                      <Download className="mr-1 h-3 w-3" />Download
                    </Button>
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
                    <div key={i} className={`gradient-card rounded-xl border p-3 cursor-pointer hover:border-primary/50 transition-colors ${
                      selectedMessage === m ? "border-primary" : !m.read ? "border-primary/30" : "border-border"
                    }`} onClick={() => { setSelectedMessage(m); setMessages(prev => prev.map((msg, idx) => idx === i ? { ...msg, read: true } : msg)); }}>
                      <div className="flex items-start justify-between mb-1">
                        <span className={`text-sm font-medium ${!m.read ? "text-foreground" : "text-muted-foreground"}`}>{m.from}</span>
                        <span className="text-[10px] text-muted-foreground">{m.time}</span>
                      </div>
                      <p className={`text-xs ${!m.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{m.subject}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{m.preview}</p>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  {selectedMessage ? (
                    <div className="gradient-card rounded-xl border border-border p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{selectedMessage.subject}</h3>
                          <p className="text-xs text-muted-foreground">From: {selectedMessage.from} • {selectedMessage.time}</p>
                        </div>
                        <button onClick={() => setSelectedMessage(null)}><X className="h-4 w-4 text-muted-foreground" /></button>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed mb-4">{selectedMessage.preview}</p>
                      <div className="border-t border-border pt-4">
                        <label className="text-xs text-muted-foreground">Reply</label>
                        <textarea rows={3} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Type your reply..." />
                        <Button size="sm" className="mt-2 gradient-primary border-0 text-primary-foreground"
                          onClick={() => { setSelectedMessage(null); toast({ title: "Reply Sent", description: `Your reply to ${selectedMessage.from} has been sent.` }); }}>
                          <Send className="mr-1 h-3 w-3" />Send Reply
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="gradient-card rounded-xl border border-border p-5">
                      <h3 className="font-display font-semibold text-foreground mb-4">Compose Message</h3>
                      <div className="space-y-3">
                        <div><label className="text-xs text-muted-foreground">To</label><input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Trainer or Admin..." /></div>
                        <div><label className="text-xs text-muted-foreground">Subject</label><input className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                        <div><label className="text-xs text-muted-foreground">Message</label><textarea rows={5} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                        <Button size="sm" className="gradient-primary border-0 text-primary-foreground"
                          onClick={() => toast({ title: "Message Sent", description: "Your message has been sent successfully." })}>
                          <Send className="mr-1 h-3 w-3" />Send Message
                        </Button>
                      </div>
                    </div>
                  )}
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
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary"><User className="h-10 w-10" /></div>
                  <h2 className="font-display font-bold text-foreground text-lg">{studentProfile.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">Student ID: {studentProfile.id}</p>
                  <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">Active Student</span>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-secondary/30 p-2 text-center cursor-pointer hover:bg-secondary/50" onClick={() => setActive("My Courses")}>
                      <p className="text-lg font-bold text-foreground">{studentProfile.courses}</p><p className="text-[10px] text-muted-foreground">Courses</p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-2 text-center cursor-pointer hover:bg-secondary/50" onClick={() => setActive("Certificates")}>
                      <p className="text-lg font-bold text-foreground">{studentProfile.certificates}</p><p className="text-[10px] text-muted-foreground">Certificates</p>
                    </div>
                  </div>
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground w-full mt-4" onClick={() => setEditProfile(true)}>Edit Profile</Button>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="gradient-card rounded-xl border border-border p-5">
                    <h3 className="font-display font-semibold text-foreground mb-4">Personal Information</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        { label: "Full Name", value: studentProfile.name },
                        { label: "Email", value: studentProfile.email },
                        { label: "Phone", value: studentProfile.phone },
                        { label: "Address", value: studentProfile.address },
                        { label: "Enrolled", value: studentProfile.enrolled },
                        { label: "Student ID", value: studentProfile.id },
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
                      {["🏆 Top Learner", "⚡ Quick Starter", "📚 Course Completer x2", "🎯 Assignment Master"].map((a) => (
                        <span key={a} className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() => toast({ title: "Achievement", description: a })}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* HELP CENTER */}
          {active === "Help Center" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="font-display text-xl font-bold text-foreground mb-6">Help Center</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { q: "How do I join a live session?", a: "Click 'Join Live Meeting' in your schedule or dashboard when the session is live." },
                  { q: "How do I submit an assignment?", a: "Go to Assignments, find your pending task and click the 'Submit' button to upload your work." },
                  { q: "How can I download my certificate?", a: "Navigate to Certificates, then click 'Download' on any earned certificate." },
                  { q: "How do I contact my trainer?", a: "Use the Messages section to compose and send messages directly to your trainer." },
                ].map((faq, i) => (
                  <div key={i} className="gradient-card rounded-xl border border-border p-4 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => toast({ title: faq.q, description: faq.a })}>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2 flex items-start gap-2"><HelpCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />{faq.q}</h3>
                    <p className="text-xs text-muted-foreground pl-6">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 gradient-card rounded-xl border border-border p-5 text-center">
                <h3 className="font-display font-semibold text-foreground mb-2">Still need help?</h3>
                <p className="text-xs text-muted-foreground mb-4">Contact our support team during office hours (9:00 AM - 4:00 PM)</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="sm" className="gradient-primary border-0 text-primary-foreground"
                    onClick={() => { window.open("tel:9744465510"); toast({ title: "Calling Support", description: "Dialing 9744465510..." }); }}>Call: 9744465510</Button>
                  <Button size="sm" variant="outline" className="border-border"
                    onClick={() => { window.open("mailto:laxmikathariya2002@gmail.com"); toast({ title: "Opening Email", description: "Opening email client..." }); }}>Email Support</Button>
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
                  <div className="flex items-center justify-between"><div><p className="text-sm text-foreground">Theme</p><p className="text-xs text-muted-foreground">Switch between light and dark mode</p></div><ThemeToggle /></div>
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3">Notifications</h3>
                  {Object.entries(settingsToggles).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="text-sm text-foreground">{key}</span>
                      <button onClick={() => { setSettingsToggles(prev => ({ ...prev, [key]: !prev[key] })); toast({ title: key, description: `${key} ${!val ? "enabled" : "disabled"}.` }); }}
                        className={`w-10 h-5 rounded-full border relative transition-colors ${val ? "bg-primary/20 border-primary/30" : "bg-secondary border-border"}`}>
                        <div className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${val ? "right-0.5 bg-primary" : "left-0.5 bg-muted-foreground"}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="gradient-card rounded-xl border border-border p-5">
                  <h3 className="font-display font-semibold text-foreground mb-3">Change Password</h3>
                  <div className="space-y-3">
                    {["Current Password", "New Password", "Confirm Password"].map((l) => (
                      <div key={l}><label className="text-xs text-muted-foreground">{l}</label><input type="password" className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                    ))}
                    <Button size="sm" className="gradient-primary border-0 text-primary-foreground"
                      onClick={() => toast({ title: "Password Updated", description: "Your password has been changed successfully." })}>Update Password</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* MODALS */}
      <AnimatePresence>
        {editProfile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setEditProfile(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">Edit Profile</h2><button onClick={() => setEditProfile(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="space-y-3">
                {[
                  { label: "Full Name", value: studentProfile.name },
                  { label: "Email", value: studentProfile.email },
                  { label: "Phone", value: studentProfile.phone },
                  { label: "Address", value: studentProfile.address },
                ].map(f => (
                  <div key={f.label}><label className="text-xs text-muted-foreground">{f.label}</label><input defaultValue={f.value} className="mt-1 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 gradient-primary border-0 text-primary-foreground" onClick={() => { setEditProfile(false); toast({ title: "Profile Updated", description: "Your profile has been updated successfully." }); }}>Save Changes</Button>
                <Button variant="outline" className="flex-1 border-border" onClick={() => setEditProfile(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCourseDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowCourseDetail(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h2 className="font-display font-bold text-foreground">{showCourseDetail.title}</h2><button onClick={() => setShowCourseDetail(null)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-2xl">{showCourseDetail.icon}</div>
                <div>
                  <p className="text-sm text-muted-foreground">Instructor: {showCourseDetail.instructor}</p>
                  <p className="text-sm text-muted-foreground">{showCourseDetail.lessons}</p>
                </div>
              </div>
              <Progress value={showCourseDetail.progress} className="h-3 mb-3" />
              <p className="text-sm text-foreground mb-1"><strong>{showCourseDetail.progress}%</strong> Complete</p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-secondary/30 p-3"><p className="text-[10px] text-muted-foreground uppercase">Next Lesson</p><p className="text-sm font-medium text-foreground mt-1">{showCourseDetail.nextLesson}</p></div>
                <div className="rounded-lg bg-secondary/30 p-3"><p className="text-[10px] text-muted-foreground uppercase">Deadline</p><p className="text-sm font-medium text-foreground mt-1">{showCourseDetail.deadline}</p></div>
              </div>
              <Button className="w-full mt-4 gradient-primary border-0 text-primary-foreground"
                onClick={() => { setShowCourseDetail(null); toast({ title: "Resuming Course", description: `Loading ${showCourseDetail.nextLesson}...` }); }}>
                Continue Learning
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
