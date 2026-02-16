import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper = ({ children, className = "", id }: Props) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`py-20 lg:py-28 ${className}`}
  >
    <div className="container mx-auto px-4 lg:px-8">{children}</div>
  </motion.section>
);

export default SectionWrapper;
