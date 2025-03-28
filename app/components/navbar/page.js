"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const navItems = [
    { name: "About", href: "/components/about" },
    { name: "Skills", href: "/components/skills" },
    { name: "Projects", href: "/components/projects" },
    { name: "Service", href: "/components/service" },
    { name: "Profile", href: "/components/profile" },
    { name: "Contact", href: "/components/contact" },
  ];

  return (
    <>
      {/* Overlay Blur Saat Menu Mobile Dibuka */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-40"
          onClick={() => setMenuOpen(false)} // Klik di luar menu untuk menutup
        />
      )}

      <nav
        className={`fixed top-4 left-4 md:inset-x-0 md:mx-auto md:w-fit z-50 px-6 py-3 rounded-full flex items-center 
        ${theme === "dark" ? "bg-gray-800 text-white shadow-md bg-opacity-80" : "bg-white text-black border border-gray-300 shadow-lg bg-opacity-80"}`}
      >
        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-50"
        >
          {menuOpen ? (
            <X size={24} className={theme === "dark" ? "text-white" : "text-black"} />
          ) : (
            <Menu size={24} className={theme === "dark" ? "text-white" : "text-black"} />
          )}
        </button>

        {/* Mobile Menu */}
        <ul
          className={`absolute top-0 left-20 mt-2 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform
            ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"} md:hidden bg-opacity-90 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          } z-50`}
        >
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`block px-4 py-2 transition-transform duration-500 ease-in-out 
                  ${menuOpen ? `translate-x-0 opacity-100 delay-${index * 100}` : "-translate-x-10 opacity-0"}`}
            >
              <Link
                href={item.href}
                className={`hover:text-blue-500 ${
                  pathname === item.href ? "font-bold border-b-2 border-blue-500" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`hover:text-blue-500 px-3 py-1 rounded transition 
                          ${
                            pathname === item.href
                              ? "font-bold border-b-2 border-blue-500"
                              : ""
                          }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
