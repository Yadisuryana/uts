"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { GraduationCap, Star, Briefcase, User, Heart } from "lucide-react";
import Navbar from "../navbar/page";
import ThemeToggle from "@/app/components/ThemeToggle"; // Komponen Theme Toggle
import { useTheme } from "@/app/context/ThemeContext"; // Import ThemeContext

export default function Profile() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  const { theme } = useTheme(); // Gunakan tema dari context

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
        <motion.h1 className="text-3xl font-extrabold mb-6" data-aos="fade-down">
          Profil Saya
        </motion.h1>

        {/* Foto Profil */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          whileHover={{ scale: 1.2 }} 
          transition={{ duration: 0.3 }}
          className="relative mx-auto w-40 h-40 rounded-full overflow-hidden border-4 border-gray-500 shadow-lg"
        >
          <img src="/images/profile.jpg" alt="Foto Profil" className="w-full h-full object-cover" />
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col items-center before:absolute before:w-1 before:bg-gray-600 before:h-full before:left-1/2 before:-translate-x-1/2 mt-8">
          
          {/* Data Pribadi */}
          <motion.div data-aos="fade-up" className={`relative w-2/3 p-4 rounded-lg shadow-md mb-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className="text-lg font-semibold flex items-center"><User className="mr-2" /> Data Pribadi</h2>
            <p className="text-sm mt-2"><strong>Nama:</strong> Yadi Suryana</p>
            <p className="text-sm"><strong>TTL:</strong> Sumedang, 29 Agustus 2004</p>
            <p className="text-sm"><strong>Jenis Kelamin:</strong> Laki-Laki</p>
            <p className="text-sm"><strong>Alamat:</strong> Ds. Cibulakan, Kec. Cimanggung, Kab. Sumedang</p>
            <p className="text-sm"><strong>Kewarganegaraan:</strong> Indonesia</p>
            <p className="text-sm"><strong>Status:</strong> Belum Menikah</p>
          </motion.div>

          {/* Pendidikan */}
          <motion.div data-aos="fade-up" className={`relative w-2/3 p-4 rounded-lg shadow-md mb-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className="text-lg font-semibold flex items-center"><GraduationCap className="mr-2" /> Pendidikan</h2>
            <p className="text-sm mt-2">SDN Cikandang (2012 - 2017)</p>
            <p className="text-sm">SMP 314 Parakanmuncang (2017 - 2020)</p>
            <p className="text-sm">MA Wasilatul Huda (2020 - 2023)</p>
            <p className="text-sm">Universitas Ma’soem (2023 - Sekarang)</p>
          </motion.div>

          {/* Keahlian */}
          <motion.div data-aos="fade-up" className={`relative w-2/3 p-4 rounded-lg shadow-md mb-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className="text-lg font-semibold flex items-center"><Star className="mr-2" /> Keahlian</h2>
            <p className="text-sm mt-2">HTML & CSS, JavaScript, React & Next.js, Node.js, MySQL, Java, Git & GitHub</p>
          </motion.div>

          {/* Organisasi */}
          <motion.div data-aos="fade-up" className={`relative w-2/3 p-4 rounded-lg shadow-md mb-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <h2 className="text-lg font-semibold flex items-center"><Briefcase className="mr-2" /> Organisasi</h2>
            <p className="text-sm mt-2">Sekretaris OSIS MA Wasilatul Huda</p>
            <p className="text-sm">Anggota Pramuka MA Wasilatul Huda</p>
            <p className="text-sm">Pengurus Karsawasa (Karya Santri Wasilatul Huda)</p>
            <p className="text-sm">Anggota UKM Badminton Universitas Ma’soem</p>
          </motion.div>

        </div>
      </motion.div>

      {/* Tombol Theme Toggle di Sudut Kiri Bawah */}
      <div className="fixed bottom-4 left-4 z-50">
        <ThemeToggle />
      </div>
    </section>
  );
}
