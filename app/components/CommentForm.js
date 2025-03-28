"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FaStar } from "react-icons/fa";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ContactForm({ onFeedbackAdded }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!name || !comment || rating === 0) {
      setMessage("Harap isi semua bidang dengan benar.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("feedbacks").insert([
      { name, rating, comment },
    ]);

    if (error) {
      setMessage("Terjadi kesalahan, coba lagi.");
    } else {
      setMessage("Komentar berhasil dikirim!");
      setName("");
      setRating(0);
      setComment("");
      // Ganti bagian ini
      if (!onFeedbackAdded) {
        console.warn("onFeedbackAdded tidak tersedia.");
      } else {
        onFeedbackAdded(); // Panggil hanya jika fungsi tersedia
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded text-black dark:text-black"
      />

      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer text-2xl ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </div>

      <textarea
        placeholder="Komentar Anda"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-2 border rounded text-black dark:text-black"
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading ? "Mengirim..." : "Kirim Komentar"}
      </button>

      {message && (
        <p className={message === "Komentar berhasil dikirim!" ? "text-blue-500" : "text-red-500"}>
          {message}
        </p>
      )}
    </form>
  );
}
