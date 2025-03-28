"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { GraduationCap, Star, Briefcase, User, Heart } from "lucide-react";
import Navbar from "../navbar/page";
import ThemeToggle from "@/app/components/ThemeToggle"; // Komponen Theme Toggle
import { useTheme } from "@/app/context/ThemeContext"; // Import ThemeContext

export default function Services() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const services = [
    {
      title: "✨ Desain UI/UX",
      description: "Membuat desain antarmuka aplikasi yang estetis dan user-friendly dengan Figma.",
      extraImage: "/figma.png"
    },
    {
      title: "🎨 Desain Grafis",
      description: "Mendesain logo, poster, banner, dan berbagai kebutuhan visual dengan Photoshop, Corel Draw, dan Canva.",
      extraImage: "/ps.png"
    },
    {
      title: "🖥️ Pembuatan Website", 
      description: "Membangun website responsif dan interaktif dengan teknologi modern.",
      extraImage: "/web.png"
    },
    {
      title: "🏢 Desain Denah",
      description: "Membuat denah ruangan atau sistem dengan presisi tinggi menggunakan MS Visio.",
      extraImage: "/denah.png"
    }
  ];

  return (
    <section className={`min-h-screen flex flex-col items-center overflow-hidden transition-all duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-6 py-20 text-center"
      >
        <motion.h1 
          className="text-4xl font-extrabold mb-6" 
          data-aos="fade-down"
        >Layanan yang Saya Tawarkan</motion.h1>
        <motion.p 
          className="text-gray-500 dark:text-gray-300 text-xs md:text-sm mb-12" 
          data-aos="fade-up"
        >
          Saya menyediakan berbagai layanan profesional mulai dari desain UI/UX, pembuatan website, hingga desain grafis dan denah.
        </motion.p>

        {/* Services List */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {services.map((service, index) => (
            <motion.div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center text-center border border-gray-300 dark:border-gray-700 relative bg-gray-200 dark:bg-gray-800"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-4">{service.description}</p>
              {/* Gambar tambahan dengan animasi saat di hover */}
              <motion.img
                src={service.extraImage}
                alt="Extra"
                className="w-full h-auto rounded-lg mt-2"
                whileHover={{ scale: 1.1 }} // Efek membesar saat hover
                transition={{ duration: 0.3, ease: "easeInOut" }} // Animasi smooth
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

     <div className="fixed bottom-4 left-4 z-50">
             <ThemeToggle />
           </div>
    </section>
  );
}
