import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, label: "Visit Us", value: "Together for Nepal Main Office" },
  { icon: Phone, label: "Call Us", value: "9744465510" },
  { icon: Mail, label: "Email Us", value: "laxmikathariya2002@gmail.com" },
  { icon: Clock, label: "Office Hours", value: "9:00 AM - 4:00 PM" },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Open mailto link to send message
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("fullName") as HTMLInputElement)?.value || "";
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value || "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
    
    const mailtoLink = `mailto:laxmikathariya2002@gmail.com?subject=${encodeURIComponent(subject || "Website Inquiry")}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink, "_blank");
    
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Prepared!", description: "Your email client should open with the message. You can also email us directly at laxmikathariya2002@gmail.com." });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="gradient-navy pt-16">
        <div className="container mx-auto px-4 py-20 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">Have questions about our courses? Want to schedule a visit? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground">{c.label}</h4>
                  <p className="whitespace-pre-line text-sm text-muted-foreground">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="gradient-card space-y-5 rounded-xl border border-border p-6 lg:col-span-3">
            <h3 className="font-display text-xl font-semibold text-foreground">Send a Message</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="fullName" placeholder="Full Name" required className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground" />
              <Input name="email" placeholder="Email Address" type="email" required className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground" />
            </div>
            <Input name="phone" placeholder="Phone Number" className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground" />
            <Input name="subject" placeholder="Subject (e.g., Python Course Inquiry)" className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground" />
            <Textarea name="message" placeholder="Your message..." rows={5} required className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground" />
            <Button type="submit" disabled={loading} className="w-full gradient-primary border-0 text-primary-foreground glow-red-sm hover:opacity-90">
              {loading ? "Sending..." : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
            </Button>
          </form>
        </div>
      </SectionWrapper>

      {/* Map */}
      <section className="border-t border-border">
        <iframe
          title="Together for Nepal Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3!2d85.319!3d27.705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzE4LjAiTiA4NcKwMTknMDguNiJF!5e0!3m2!1sen!2snp!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="grayscale"
        />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
