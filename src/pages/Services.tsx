import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Cpu, Monitor, Megaphone, Users, ArrowRight, Clock, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";

const services = [
  { icon: Monitor, title: "Digital Literacy", duration: "2 Months", level: "Beginner", desc: "Essential computer skills, internet usage, email, office applications, and digital tools for the modern workplace.", features: ["Microsoft Office Suite", "Internet & Email Skills", "Digital Communication", "Online Safety & Security"] },
  { icon: Code, title: "Basic to Intermediate Python", duration: "3 Months", level: "Beginner to Intermediate", desc: "Learn Python programming from scratch — variables, data types, loops, functions, OOP, file handling, and real projects.", features: ["Python Fundamentals", "Object-Oriented Programming", "Data Structures", "Real-World Projects"] },
  { icon: Megaphone, title: "Digital Marketing", duration: "3 Months", level: "Beginner", desc: "Google Ads, Facebook Ads, SEO, content marketing, social media strategy, and analytics for businesses.", features: ["Google Ads & Analytics", "SEO & SEM", "Social Media Marketing", "Content Strategy"] },
  { icon: Cpu, title: "Hardware & Networking", duration: "4 Months", level: "Beginner to Intermediate", desc: "Computer hardware assembly, repair, troubleshooting, CCNA networking, and system administration.", features: ["PC Assembly & Repair", "CCNA Certification", "Network Administration", "Server Management"] },
  { icon: Users, title: "Professional Development", duration: "2 Months", level: "All Levels", desc: "Communication skills, project management, leadership, interview preparation, and workplace readiness.", features: ["Soft Skills Training", "Interview Preparation", "Leadership Skills", "Workplace Readiness"] },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="relative flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-navy" />
      <div className="container relative mx-auto px-4 py-24 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Our <span className="text-gradient">Training Programs</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Industry-aligned training programs designed to equip Nepali students and professionals with in-demand skills.
          </p>
        </motion.div>
      </div>
    </section>

    <SectionWrapper>
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="gradient-card group rounded-xl border border-border p-6 transition-all hover:border-primary/30"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 font-display text-lg font-semibold text-foreground">{s.title}</h3>
            <div className="mb-3 flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {s.duration}</span>
              <span className="flex items-center gap-1"><Award className="h-3 w-3" /> {s.level}</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <ul className="mb-4 space-y-1.5">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3 text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/contact">
              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    <section className="gradient-primary py-16">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">Train Your Entire Team</h2>
        <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
          We offer customized corporate training packages for organizations. Upskill your workforce with tailored programs.
        </p>
        <Link to="/contact">
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
            Request Corporate Training <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;
