"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../navbar/page";
import { useTheme } from "@/app/context/ThemeContext";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function About() {
  const { theme, toggleTheme } = useTheme();
  const [showChatbot, setShowChatbot] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [loading, setLoading] = useState(true);

  const faq = [
    { question: "Apa website ini?", answer: "Website ini adalah portofolio, skill, pengalaman dan informasi seputar pribadi Yadi Suryana." },
    { question: "Teknologi apa yang digunakan?", answer: "Saya menggunakan Next.js, React, Tailwind CSS, dan Supabase untuk backend." },
    { question: "Bagaimana cara menghubungi saya?", answer: "Anda bisa menghubungi saya melalui halaman Contact atau media sosial yang tersedia." }
  ];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await supabase.from("feedbacks").select("*").order("created_at", { ascending: false });
      if (!error) {
        setFeedbacks(data);
        const total = data.length;
        const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating(total > 0 ? (sum / total).toFixed(1) : 0);
        setTotalVoters(total);
      }
      setLoading(false);
    };
    fetchFeedbacks();
  }, []);


  return (
    <motion.section
      id="about"
      className="relative text-center py-0"
      style={{ overflow: "hidden", height: "100vh" }} // Menyembunyikan scrollbar
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />

      {/* Efek Blur Saat FAQ atau Komentar Dibuka */}
      <div className={`min-h-screen flex flex-col items-center justify-center px-6 
          bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 
          ${showChatbot || showComments ? "blur-md" : ""}`}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="rounded-full border-4 border-gray-700 overflow-hidden"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            width={160}
            height={160}
            className="w-32 h-32 md:w-40 md:h-40 object-cover"
          />
        </motion.div>

        <motion.h1
          className="text-2xl md:text-3xl font-bold mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hello I'm <span className="text-blue-400">Suryana</span>.
        </motion.h1>
        <motion.p
          className="text-gray-600 text-lg mt-2 dark:text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Saya seorang pengembang front-end dengan pengalaman dalam HTML, CSS, JavaScript, dan framework seperti React dan Next.js.
        </motion.p>
      </div>

      {/* Tombol Chatbot */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed top-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-all"
      >
        💬
      </button>

      {/* FAQ Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed top-16 right-4 w-80 h-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-300"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h3 className="font-bold mb-2 text-center">Chatbot FAQ</h3>
            <div className="h-40 overflow-y-auto border p-2 mb-2">
              {selectedQuestion ? (
                <div>
                  <p className="font-semibold">{selectedQuestion.question}</p>
                  <p>{selectedQuestion.answer}</p>
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    ⬅ Kembali ke daftar
                  </button>
                </div>
              ) : (
                <ul>
                  {faq.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedQuestion(item)}
                      className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      ❓ {item.question}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Komentar */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="fixed bottom-4 right-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition-all flex items-center gap-2"
      >
        💬 <span className="hidden md:inline">Komentar</span>
      </button>

      {/* Komentar dan Rating */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold mb-2 text-center">Komentar & Rating</h3>

            {/* Average Rating */}
            <div className="text-center mb-3">
            <p className="text-lg font-semibold text-black dark:text-white">
              ⭐ {averageRating} / 5
            </p>
            <p className="text-sm text-black dark:text-gray-400">{totalVoters} ulasan</p>

            </div>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : feedbacks.length > 0 ? (
              <ul className="max-h-52 overflow-y-auto text-black dark:text-white">
                {feedbacks.slice(0, 5).map((f) => (
                  <li key={f.id} className="border-b border-gray-300 pb-2 mb-2 text-sm">
                    <p className="font-semibold">{f.name} ⭐ {f.rating}</p>
                    <p>{f.comment}</p>
                    <small className="text-gray-500">{new Date(f.created_at).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">Belum ada komentar.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Dark Mode */}
      <button onClick={toggleTheme} className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg shadow-md transition-all duration-300 bg-gray-800 text-white hover:bg-gray-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300 flex items-center gap-2">
        <span className="text-xl">{theme === "dark" ? "🌞" : "🌙"}</span>
        <span className="hidden md:inline">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
      </button>
    </motion.section>
  );
}
