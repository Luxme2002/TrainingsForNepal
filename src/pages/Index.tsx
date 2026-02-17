import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Cpu, Cloud, BarChart3, Users, Star, CheckCircle2, Monitor, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import heroBg from "@/assets/hero-bg.jpg";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";

const stats = [
  { value: "5K+", label: "Students Trained" },
  { value: "98%", label: "Placement Rate" },
  { value: "50+", label: "Expert Trainers" },
  { value: "100+", label: "Courses Offered" },
];

const courses = [
  { icon: Monitor, title: "Digital Literacy", desc: "Master essential computer skills, internet navigation, and digital tools for the modern workplace.", tag: "Essential" },
  { icon: Code, title: "Basic to Intermediate Python", desc: "Learn Python programming from scratch — variables, loops, functions, OOP, and real-world projects.", tag: "Most Popular" },
  { icon: Megaphone, title: "Digital Marketing", desc: "Google Ads, SEO, social media marketing, content strategy, and analytics for business growth.", tag: "In Demand" },
  { icon: Cpu, title: "Hardware & Networking", desc: "Hands-on PC assembly, repair, troubleshooting, CCNA networking, and system administration.", tag: "Practical" },
  { icon: Users, title: "Professional Development", desc: "Soft skills, project management, leadership training, interview prep, and workplace readiness.", tag: "Career Boost" },
];

const testimonials = [
  { name: "Aarav Shrestha", role: "Full Stack Developer at Fusemachines", text: "Trainings for Nepal transformed my career. The hands-on approach and industry-relevant curriculum gave me the skills to land my dream job.", avatar: trainer1 },
  { name: "Priya Maharjan", role: "Cloud Engineer at Deerwalk", text: "The training was exceptional. The instructors are experienced professionals who make complex concepts easy to understand.", avatar: trainer2 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="IT Training Center Nepal" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Star className="h-3 w-3" /> #1 IT Training Center in Nepal
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Empowering Nepal Through{" "}
              <span className="text-gradient">High-Tech Education.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Join thousands of students and industry experts building the future of technology in the heart of the Himalayas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/services">
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground glow-red hover:opacity-90">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Book Free Counseling
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <SectionWrapper>
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
            Our <span className="text-gradient">Training Programs</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            From digital literacy to professional development — comprehensive training programs for Nepal's growing workforce.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group gradient-card rounded-xl border border-border p-6 transition-all hover:border-primary/30 hover:glow-red-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{c.tag}</span>
              </div>
              <h3 className="mb-2 font-display font-semibold text-foreground">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-card/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground lg:text-4xl">
              Why <span className="text-gradient">Trainings for Nepal?</span>
            </h2>
            <p className="mb-8 text-muted-foreground">
              We don't just teach technology — we build careers. Our training methodology combines international standards with Nepal-specific industry needs.
            </p>
            <ul className="space-y-4">
              {[
                "Industry-certified trainers with 10+ years experience",
                "Hands-on projects with real-world scenarios",
                "Job placement assistance & career counseling",
                "Flexible schedules — morning, day & evening batches",
                "Affordable fees with EMI options",
                "Modern labs with latest hardware & software",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="gradient-card rounded-xl border border-border p-6 text-center">
                <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
            What Our <span className="text-gradient">Students Say</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="gradient-card rounded-xl border border-border p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground lg:text-4xl">
            Ready to Start Your Tech Career?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
            Join thousands of Nepali students who have transformed their careers through our training programs. Enroll today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
