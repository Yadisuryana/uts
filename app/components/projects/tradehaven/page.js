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

export default function TradeHavenProject() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const images = [
    "/TradeHaven.png",
    "/TradeHaven2.png",
    "/TradeHaven3.png",
    "/TradeHaven4.png"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className={`bg-gradient-to-b ${theme === "dark" ? "from-gray-900 to-gray-800 text-white" : "from-gray-100 to-gray-200 text-black"} min-h-screen flex flex-col items-center`}>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="w-full max-w-6xl px-6 py-20 text-center"
      >
        <motion.h1 
          className="text-4xl font-semibold mb-4" 
          data-aos="fade-down"
        >TradeHaven</motion.h1>
        <motion.p 
          className="text-gray-400 text-base mb-8" 
          data-aos="fade-up"
        >
          TradeHaven adalah platform e-commerce yang menyediakan layanan jual beli online dengan fitur lengkap. Admin dapat mengelola data produk serta melakukan CRUD terhadap data barang dan pembeli. UI yang modern memudahkan navigasi, serta data barang dari admin langsung tersinkronisasi ke dashboard pelanggan.
        </motion.p>

        {/* Image Carousel */}
        <div className="relative w-full h-72 md:h-80 flex items-center justify-center mb-8">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            <Image src={images[currentImage]} alt="TradeHaven Showcase" layout="fill" objectFit="cover" />
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

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImage === index ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Features */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 text-left text-sm"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
          }}
        >
          {[
            { title: "Manajemen Produk", description: "Admin dapat menambahkan, mengedit, menghapus, dan melihat daftar produk dengan mudah.", icon: "🛒" },
            { title: "Keamanan Transaksi", description: "Sistem pembayaran aman dan terpercaya untuk melindungi data pelanggan.", icon: "🔒" },
            { title: "Manajemen Pengguna", description: "Admin dapat mengelola data pembeli, melihat riwayat transaksi, dan memberikan layanan pelanggan.", icon: "👥" },
            { title: "Tampilan Responsif", description: "UI yang menarik dan dapat diakses dari berbagai perangkat seperti desktop, tablet, dan smartphone.", icon: "📱" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className={`p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-lg font-medium mb-2 flex items-center">
                <span className="mr-2 text-xl">{feature.icon}</span>
                {feature.title}
              </h2>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Theme Toggle Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
