import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Cpu, Cloud, Shield, BarChart3, Users, Database, Smartphone, Globe, ArrowRight, Clock, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";

const services = [
  { icon: Code, title: "Full Stack Web Development", duration: "6 Months", level: "Beginner to Advanced", desc: "Master HTML, CSS, JavaScript, React, Node.js, MongoDB, PostgreSQL. Build production-grade web applications.", features: ["MERN & PERN Stack", "REST APIs & GraphQL", "DevOps & Deployment", "Portfolio Projects"] },
  { icon: Smartphone, title: "Mobile App Development", duration: "4 Months", level: "Intermediate", desc: "Build cross-platform mobile apps using React Native and Flutter with real-world projects.", features: ["React Native / Flutter", "State Management", "API Integration", "App Store Deployment"] },
  { icon: Cloud, title: "Cloud Computing & DevOps", duration: "5 Months", level: "Intermediate", desc: "AWS, Azure, GCP certifications. Docker, Kubernetes, CI/CD pipelines, infrastructure as code.", features: ["AWS/Azure Certification", "Docker & Kubernetes", "Terraform & Ansible", "CI/CD Pipelines"] },
  { icon: Shield, title: "Cybersecurity & Ethical Hacking", duration: "5 Months", level: "Intermediate to Advanced", desc: "CEH, CompTIA Security+, penetration testing, SOC operations, and incident response.", features: ["Ethical Hacking (CEH)", "Network Security", "Penetration Testing", "SOC & SIEM Tools"] },
  { icon: BarChart3, title: "Data Science & AI/ML", duration: "6 Months", level: "Intermediate", desc: "Python, Pandas, NumPy, Scikit-learn, TensorFlow, deep learning, and NLP.", features: ["Python for Data Science", "Machine Learning", "Deep Learning & NLP", "Real-world Projects"] },
  { icon: Database, title: "Database Administration", duration: "3 Months", level: "Beginner to Intermediate", desc: "MySQL, PostgreSQL, MongoDB, Oracle DB — design, optimization, and administration.", features: ["SQL & NoSQL", "Performance Tuning", "Backup & Recovery", "Database Security"] },
  { icon: Cpu, title: "Hardware & Networking", duration: "4 Months", level: "Beginner", desc: "Computer hardware assembly, repair, troubleshooting, CCNA networking, and system administration.", features: ["PC Assembly & Repair", "CCNA Certification", "Network Administration", "Server Management"] },
  { icon: Globe, title: "Digital Marketing & SEO", duration: "3 Months", level: "Beginner", desc: "Google Ads, Facebook Ads, SEO, content marketing, and social media strategy for businesses.", features: ["Google Ads & Analytics", "SEO & SEM", "Social Media Marketing", "Content Strategy"] },
  { icon: Users, title: "Professional Development", duration: "2 Months", level: "All Levels", desc: "Communication skills, project management (PMP/Agile), leadership, and workplace readiness.", features: ["PMP & Agile/Scrum", "Soft Skills Training", "Interview Preparation", "Leadership Skills"] },
];

const Services = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 gradient-navy" />
      <div className="container relative mx-auto px-4 py-24 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Master the <span className="text-gradient">Future of Tech</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Industry-aligned training programs designed to equip Nepali students and professionals with cutting-edge IT skills. Choose from 50+ courses across coding, hardware, cloud, and more.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Services Grid */}
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

    {/* CTA */}
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
