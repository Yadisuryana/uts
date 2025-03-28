"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Navbar from "../../navbar/page";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";

export default function HafalanQuran() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const { theme } = useTheme();

  const images = [
    "/hafalan1.png",
    "/hafalan2.png",
    "/hafalan3.png",
    "/hafalan4.png"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className={`min-h-screen flex flex-col items-center overflow-hidden transition-all duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
    }`}>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-6xl px-6 py-20 text-center"
      >
        <motion.h1 
          className="text-3xl font-semibold mb-4" 
          data-aos="fade-down"
        >Sistem Input Hafalan Al-Qur'an</motion.h1>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm mb-8" 
          data-aos="fade-up"
        >
          Aplikasi berbasis Java untuk mencatat hafalan guru, dilengkapi dengan ekspor PDF,
          laporan perkembangan, serta input jadwal murojaah. Data dapat dimodifikasi sesuai kebutuhan.
        </motion.p>

        {/* Image Carousel */}
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center mb-8 overflow-hidden">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            <Image src={images[currentImage]} alt="Hafalan Showcase" layout="fill" objectFit="contain" />
          </motion.div>
          <motion.button 
            onClick={prevImage} 
            className="absolute left-4 bg-gray-700 p-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowLeft size={18} className="text-white" />
          </motion.button>
          <motion.button 
            onClick={nextImage} 
            className="absolute right-4 bg-gray-700 p-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowRight size={18} className="text-white" />
          </motion.button>
        </div>

        {/* Feature List */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 text-left text-xs"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
          }}
        >
          {[ 
            { title: "Input Data Hafalan", description: "Mencatat hafalan guru dengan informasi juz, surat, ayat, dan tanggal setor." },
            { title: "Ekspor Laporan ke PDF", description: "Memungkinkan penyimpanan laporan perkembangan hafalan dalam format PDF." },
            { title: "Laporan Perkembangan", description: "Menampilkan statistik hafalan dan perkembangan dari waktu ke waktu." },
            { title: "Input Jadwal Murojaah", description: "Mengatur jadwal murojaah untuk memastikan hafalan tetap kuat." },
            { title: "Modifikasi Data", description: "Mengedit dan menghapus data hafalan yang sudah dimasukkan." },
            { title: "Tampilan User-Friendly", description: "Antarmuka responsif dan mudah digunakan dengan animasi yang menarik." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-base font-medium mb-2 text-black dark:text-white">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Theme Toggle */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
