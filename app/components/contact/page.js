"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../navbar/page";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext"; // 🔥 Ambil tema dari Context
import CommentForm from "@/app/components/CommentForm";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const { theme, toggleTheme } = useTheme(); // 🔥 Gunakan ThemeContext

  // Data Kontak
  const email = "ydisryna@gmail.com";
  const phone = "+089630024907";
  const location = "Sumedang, Indonesia";

  // Fungsi untuk membuka email
  const handleEmail = () => {
    window.location.href = `mailto:${email}?subject=Halo, saya ingin menghubungi Anda`;
  };

  // Fungsi untuk membuka WhatsApp
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace("+", "")}?text=Halo, saya ingin bertanya tentang ...`, "_blank");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center overflow-auto px-6 
      bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-4xl text-center mt-20"
      >
        <motion.h1 className="text-3xl font-extrabold mb-6 text-black dark:text-white" data-aos="fade-down">
          Hubungi Saya
        </motion.h1>

        {/* Info Kontak */}
        <div className="grid grid-cols-1 md-grid-cols-3 gap-6 text-left mb-10">
          <motion.div data-aos="fade-up" className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center">
            <Mail className="mr-4 text-blue-400" size={24} />
            <p className="text-sm">{email}</p>
          </motion.div>
          <motion.div data-aos="fade-up" className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center">
            <Phone className="mr-4 text-green-400" size={24} />
            <p className="text-sm">{phone}</p>
          </motion.div>
          <motion.div data-aos="fade-up" className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center">
            <MapPin className="mr-4 text-red-400" size={24} />
            <p className="text-sm">{location}</p>
          </motion.div>
        </div>

        {/* Tombol Kontak */}
        <motion.div data-aos="fade-up" className="flex gap-4 justify-center mb-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEmail}
            className="bg-blue-500 px-6 py-3 rounded-lg flex items-center gap-2 text-white font-semibold shadow-md hover:bg-blue-600 transition"
          >
            <Mail size={20} />
            Kirim Email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWhatsApp}
            className="bg-green-500 px-6 py-3 rounded-lg flex items-center gap-2 text-white font-semibold shadow-md hover:bg-green-600 transition"
          >
            <Send size={20} />
            Chat WhatsApp
          </motion.button>
        </motion.div>

        {/* Form Komentar */}
        <div className="w-full max-w-md mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mb-10 mt-10">
          <CommentForm />
        </div>
      </motion.div>
      
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
