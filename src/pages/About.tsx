import { motion } from "framer-motion";
import { Target, Eye, Award, Users, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import aboutBg from "@/assets/about-bg.jpg";
import trainer1 from "@/assets/trainer-1.jpg";
import trainer2 from "@/assets/trainer-2.jpg";

const team = [
  { name: "Rajesh Adhikari", role: "Founder & CEO", bio: "15+ years in IT education. Former Microsoft certified trainer.", img: trainer1 },
  { name: "Sita Gurung", role: "Head of Training", bio: "AWS Solutions Architect. Led training for 3000+ students.", img: trainer2 },
  { name: "Bikash Thapa", role: "Lead Instructor - Development", bio: "Full Stack Developer. Ex-Google, contributed to open source.", img: trainer1 },
  { name: "Anisha Rai", role: "Lead Instructor - Data Science", bio: "PhD in AI/ML. Published researcher and industry consultant.", img: trainer2 },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={aboutBg} alt="Training Lab" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
      </div>
      <div className="container relative mx-auto px-4 py-24 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Empowering Nepal's <span className="text-gradient">Tech Talent</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Since 2018, we've been on a mission to bridge the skills gap in Nepal's IT industry by providing world-class, affordable tech education.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <SectionWrapper>
      <div className="grid gap-8 md:grid-cols-2">
        {[
          { icon: Target, title: "Our Mission", text: "To democratize quality IT education in Nepal by making industry-relevant, hands-on training accessible to every aspiring tech professional — regardless of background or location." },
          { icon: Eye, title: "Our Vision", text: "To be South Asia's most trusted IT training center, recognized for producing job-ready graduates who drive innovation in Nepal's rapidly growing tech ecosystem." },
        ].map((item) => (
          <div key={item.title} className="gradient-card rounded-xl border border-border p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-3 font-display text-xl font-semibold text-foreground">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>

    {/* Achievements */}
    <SectionWrapper className="bg-card/30">
      <h2 className="mb-8 text-center font-display text-3xl font-bold text-foreground">
        Standardizing <span className="text-gradient">Tech Excellence</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Award, label: "ISO 9001:2015 Certified" },
          { icon: Users, label: "5000+ Alumni Network" },
          { icon: CheckCircle2, label: "CTEVT Affiliated" },
          { icon: Target, label: "98% Job Placement" },
        ].map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-3 rounded-xl border border-border bg-secondary/50 p-6 text-center"
          >
            <a.icon className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">{a.label}</span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* Team */}
    <SectionWrapper>
      <h2 className="mb-3 text-center font-display text-3xl font-bold text-foreground">
        Led by <span className="text-gradient">Industry Veterans</span>
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">Our trainers bring real-world experience from leading tech companies.</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="gradient-card group rounded-xl border border-border p-5 text-center transition-all hover:border-primary/30"
          >
            <img src={t.img} alt={t.name} className="mx-auto mb-4 h-24 w-24 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/50" />
            <h4 className="font-display font-semibold text-foreground">{t.name}</h4>
            <p className="mb-2 text-xs text-primary">{t.role}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.bio}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default About;
