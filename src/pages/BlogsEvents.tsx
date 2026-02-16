import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";

const blogs = [
  { title: "Mastering the React Tech Scene: The 2026 Developer Roadmap", date: "Feb 12, 2026", category: "Development", excerpt: "A comprehensive guide for Nepali developers looking to break into the international tech market with React and modern JavaScript.", img: heroBg },
  { title: "Why Cybersecurity Skills Are in High Demand in Nepal", date: "Feb 5, 2026", category: "Cybersecurity", excerpt: "With digital transformation accelerating across Nepal, cybersecurity professionals are more needed than ever. Here's what you should learn.", img: aboutBg },
  { title: "From Zero to Cloud: A Nepali Student's AWS Journey", date: "Jan 28, 2026", category: "Cloud", excerpt: "How one of our students went from knowing nothing about cloud computing to becoming an AWS certified solutions architect in 6 months.", img: heroBg },
  { title: "Hardware Repair Skills: Still Relevant in 2026?", date: "Jan 20, 2026", category: "Hardware", excerpt: "In an era of cloud computing, we explore why hands-on hardware skills remain invaluable for IT professionals in Nepal.", img: aboutBg },
];

const events = [
  { title: "Free Python Workshop for Beginners", date: "March 15, 2026", time: "10:00 AM - 1:00 PM", location: "Main Campus, Putalisadak", type: "Workshop" },
  { title: "Tech Career Fair 2026", date: "March 25, 2026", time: "9:00 AM - 5:00 PM", location: "Hyatt Regency, Kathmandu", type: "Career Fair" },
  { title: "AI/ML Hackathon Nepal", date: "April 5-6, 2026", time: "24 Hours", location: "Online + Offline", type: "Hackathon" },
  { title: "Women in Tech: Panel Discussion", date: "April 15, 2026", time: "3:00 PM - 5:00 PM", location: "Main Campus", type: "Panel" },
];

const faqs = [
  { q: "What are the prerequisites for coding bootcamps?", a: "No prior experience needed for beginner-level courses. Intermediate courses require basic programming knowledge." },
  { q: "Do you provide certificates?", a: "Yes! All our programs include industry-recognized certificates upon completion. We also prepare students for international certifications like AWS, CCNA, CEH, etc." },
  { q: "What is the class schedule?", a: "We offer morning (7-9 AM), day (10 AM-1 PM), and evening (5-7 PM) batches. Weekend classes are also available." },
  { q: "Do you help with job placement?", a: "Absolutely. We have partnerships with 50+ IT companies in Nepal and provide dedicated job placement assistance including resume building, mock interviews, and referrals." },
];

const BlogsEvents = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="gradient-navy pt-16">
      <div className="container mx-auto px-4 py-20 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <h1 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
            <span className="text-gradient">Knowledge Hub</span>
          </h1>
          <p className="text-lg text-muted-foreground">Stay updated with the latest tech trends, training insights, upcoming events, and career tips from Nepal's IT industry.</p>
        </motion.div>
      </div>
    </section>

    {/* Blogs */}
    <SectionWrapper>
      <h2 className="mb-8 font-display text-2xl font-bold text-foreground">Latest Articles</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((b, i) => (
          <motion.article
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group gradient-card overflow-hidden rounded-xl border border-border transition-all hover:border-primary/30"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={b.img} alt={b.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground">
                <Tag className="h-3 w-3" /> {b.category}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" /> {b.date}
              </div>
              <h3 className="mb-2 font-display font-semibold text-foreground transition-colors group-hover:text-primary">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.excerpt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>

    {/* Events */}
    <SectionWrapper className="bg-card/30">
      <h2 className="mb-8 font-display text-2xl font-bold text-foreground">Upcoming Events</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {events.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 rounded-xl border border-border bg-secondary/30 p-5 transition-all hover:border-primary/30"
          >
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="mb-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{e.type}</span>
              <h4 className="font-display font-semibold text-foreground">{e.title}</h4>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {e.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{e.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>

    {/* FAQ */}
    <SectionWrapper>
      <h2 className="mb-8 text-center font-display text-2xl font-bold text-foreground">
        Frequently Asked <span className="text-gradient">Questions</span>
      </h2>
      <div className="mx-auto max-w-2xl space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-border bg-secondary/30 p-5">
            <h4 className="mb-2 font-display font-semibold text-foreground">{f.q}</h4>
            <p className="text-sm text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default BlogsEvents;
