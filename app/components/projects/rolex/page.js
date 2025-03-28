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

export default function RolexImitation() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const { theme } = useTheme();

  const images = [
    "/rolex.png",
    "/rolex2.png",
    "/rolex3.png",
    "/rolex1.png"
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
        >Rolex Luxury Collection</motion.h1>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm mb-8" 
          data-aos="fade-up"
        >
          Koleksi jam tangan mewah Rolex dengan desain elegan dan material berkualitas tinggi. 
          Tersedia berbagai model eksklusif yang mencerminkan status dan gaya hidup premium.
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
            <Image src={images[currentImage]} alt="Rolex Showcase" layout="fill" objectFit="cover" />
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
            { title: "Landing Page Elegan", description: "Desain mewah dengan kombinasi warna hitam, emas, dan putih. Animasi smooth." },
            { title: "Carousel Gambar Produk", description: "Slideshow interaktif dengan efek fade-in dan zoom-in saat berpindah." },
            { title: "Katalog Produk Stylish", description: "Grid responsif dengan hover effect yang menarik." },
            { title: "Halaman Detail Produk", description: "Deskripsi lengkap produk dengan gambar high-resolution." },
            { title: "Sistem Admin Produk", description: "CRUD produk, upload gambar dengan preview real-time." },
            { title: "Shopping Cart & Checkout", description: "Pengguna bisa menambahkan produk ke keranjang dan melakukan pembayaran dengan aman." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-base font-medium mb-2">
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
