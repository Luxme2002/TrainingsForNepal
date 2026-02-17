import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, Shield, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Role = "student" | "trainer" | "admin";

const roles = [
  { key: "student" as Role, label: "Student", icon: BookOpen, color: "bg-primary/10 text-primary border-primary/30" },
  { key: "trainer" as Role, label: "Trainer", icon: Users, color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { key: "admin" as Role, label: "Admin", icon: Shield, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
];

const dashboardRoutes: Record<Role, string> = {
  student: "/student",
  trainer: "/trainer",
  admin: "/admin",
};

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(dashboardRoutes[selectedRole]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="absolute inset-0 gradient-navy opacity-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="gradient-card rounded-2xl border border-border p-8">
          <div className="mb-6 text-center">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Trainings<span className="text-gradient">forNepal</span>
              </span>
            </Link>
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isSignup ? "Start your tech journey today" : "Access your tech training dashboard"}
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Continue as a</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => setSelectedRole(role.key)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all ${
                    selectedRole === role.key
                      ? `${role.color} border-2`
                      : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
                  }`}
                >
                  <role.icon className="h-4 w-4" />
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Full Name" className="border-border bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Email or Username" type="email" className="border-border bg-secondary/50 pl-10 text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="border-border bg-secondary/50 pl-10 pr-10 text-foreground placeholder:text-muted-foreground"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {!isSignup && (
              <div className="text-right">
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground glow-red-sm hover:opacity-90">
              {isSignup ? "Create Account" : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
              Google
            </Button>
            <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
              LinkedIn
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="font-medium text-primary hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to Home</Link>
          </div>

          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            By accessing Trainings for Nepal, you agree to our Code of Conduct and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
