"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Navbar from "../navbar/page";
import Link from "next/link";
import ThemeToggle from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";

export default function MyProjects() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const { theme } = useTheme();

  const projects = [
    {
      title: "TradeHaven",
      description: "Website e-commerce yang memungkinkan pengguna untuk membeli dan menjual barang.",
      image: "/TradeHaven.png",
      tags: ["Html", "phpMyAdmin", "MySQL", "javascript", "css", "php"],
      link: "/components/projects/tradehaven",
    },
    {
      title: "Sistem Input Hafalan Al-Qur'an",
      description: "Input hafalan Al-Qur'an untuk guru dengan framework java.",
      image: "/hafalan.png",
      tags: ["Java", "MySQL", "SQL/Plus", "NetBeans"],
      link: "/components/projects/javainput",
    },
    {
      title: "Rolex E-Commerce (Imitation)",
      description: "Website jual beli jam tangan Rolex.",
      image: "/rolex.png",
      tags: ["css", "Html", "Javasript", "phpMyAdmin", "php"],
      link: "/components/projects/rolex",
    },
  ];

  return (
    <section
      className={`transition-all duration-300 py-20 px-4 flex flex-col items-center ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />
      <h2 className="text-2xl font-bold text-center mb-10" data-aos="fade-up">
        My Projects Timeline
      </h2>

      <div className="relative w-full max-w-4xl">
        {/* Garis Timeline */}
        <div className="absolute top-0 left-1/2 w-1 bg-gray-600 h-full transform -translate-x-1/2"></div>

        {projects.map((project, index) => (
          <div key={index} className="relative flex items-center justify-between w-full my-10">
            {/* Judul (sejajar vertikal dengan kotak proyek, di sisi yang berlawanan) */}
            <div
              className={`w-5/12 text-center font-bold text-lg px-3 py-1 ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } ${index % 2 === 0 ? "order-1" : "order-3"}`}
              data-aos="fade-up"
            >
              {project.title}
            </div>

            {/* Titik Timeline */}
            <div className="w-6 h-6 bg-gray-600 rounded-full flex-shrink-0 order-2"></div>

            {/* Kotak Proyek */}
            <div
              className={`p-6 rounded-lg shadow-lg w-5/12 flex flex-col gap-4 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } ${index % 2 === 0 ? "order-3" : "order-1"}`}
              data-aos="fade-up"
            >
              {/* Gambar dengan efek hover (rotate ke bawah) */}
              <motion.div
                className="relative w-full h-40 rounded-lg overflow-hidden"
                whileHover={{ rotate: -3, translateY: 10 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </motion.div>

              {/* Deskripsi */}
              <p className="text-gray-400 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-700 px-3 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={project.link}>
                <span className="block text-blue-400 hover:underline text-sm cursor-pointer">
                  Visit Project →
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Theme Toggle di Sudut Kiri Bawah */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
