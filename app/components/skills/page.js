"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { LayoutGrid, PenTool, Code, FileText, Video } from "lucide-react";
import Navbar from "../navbar/page";
import ThemeToggle from "@/app/components/ThemeToggle"; // Komponen Theme Toggle
import { useTheme } from "@/app/context/ThemeContext"; // Import ThemeContext

export default function SkillsPage() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const { theme } = useTheme(); // Gunakan tema dari context

  const skills = [
    { title: "Desain UI/UX", description: "Figma untuk desain antarmuka yang menarik dan user-friendly.", icon: <LayoutGrid /> },
    { title: "Desain Grafis", description: "Photoshop, Corel Draw, dan Canva untuk kebutuhan visual.", icon: <PenTool /> },
    { title: "Pembuatan Website", description: "Membangun website interaktif dan responsif dengan teknologi modern.", icon: <Code /> },
    { title: "Microsoft Word & Excel", description: "Mahir dalam pembuatan dokumen profesional dan pengolahan data.", icon: <FileText /> },
    { title: "Editing Video", description: "Mengedit video dengan efek visual menggunakan Adobe Premiere dan CapCut.", icon: <Video /> },
  ];

  return (
    <section className={`min-h-screen flex flex-col items-center overflow-hidden transition-all duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-4xl px-6 py-20 text-center"
      >
        <h1 className="text-3xl font-bold mb-6" data-aos="fade-down">Keahlian Saya</h1>
        
        {/* Skill List with Zigzag Layout */}
        <div className="relative flex flex-col items-center">
          {/* Vertical Line */}
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-600 transform -translate-x-1/2"></div>
          
          {skills.map((skill, index) => (
            <div key={index} className={`relative flex w-full items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} my-8`}>
              
              {/* Diamond Shape (Belah Ketupat) */}
              <div 
                className="absolute w-5 h-5 border-2 border-gray-500 bg-gray-900 transform rotate-45 left-1/2 -translate-x-1/2"
                style={{ top: "50%" }}
              ></div>

              {/* Skill Card */}
              <motion.div
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                className={`relative p-5 rounded-lg shadow-md w-64 sm:w-80 border border-gray-700 flex flex-col items-center text-center transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-blue-400"
                  whileHover={{ scale: 1.3 }} 
                  transition={{ duration: 0.3 }}
                >
                  {skill.icon}
                </motion.div>
                <h2 className="text-sm font-semibold mt-2">{skill.title}</h2>
                <p className="text-xs mt-1">{skill.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Tombol Theme Toggle di Sudut Kiri Bawah */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
