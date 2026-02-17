import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-16 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Trainings<span className="text-gradient">forNepal</span>
            </span>
          </Link>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            Nepal's premier IT training center. Empowering the next generation of tech professionals with industry-ready skills.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-foreground">Quick Links</h4>
          <ul className="space-y-2">
            {[["Home", "/"], ["Services", "/services"], ["About Us", "/about"], ["Blogs & Events", "/blogs-events"], ["Contact", "/contact"]].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="text-sm text-muted-foreground transition-colors hover:text-primary">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-foreground">Our Courses</h4>
          <ul className="space-y-2">
            {["Digital Literacy", "Basic to Intermediate Python", "Digital Marketing", "Hardware & Networking", "Professional Development"].map((c) => (
              <li key={c}>
                <span className="text-sm text-muted-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display font-semibold text-foreground">Contact Info</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Together for Nepal Main Office
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              9744465510
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              laxmikathariya2002@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground md:flex-row lg:px-8">
        <p>© 2026 Trainings for Nepal. All rights reserved.</p>
        <p>Empowering Nepal's Tech Future 🇳🇵</p>
      </div>
    </div>
  </footer>
);

export default Footer;
