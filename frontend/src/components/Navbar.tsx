"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  return (
    <motion.header
      className="bg-black text-white fixed top-0 w-full z-50 border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/gesport2.svg" alt="GeSPORT Logo" className="h-12 md:h-16" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">INICIO</Link>
            <Link href="/2026" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">2026</Link>
            <Link href="/2025" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">2025</Link>
            <a href="#contacto" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">CONTACTO</a>
            <Link href="/calendario" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">CALENDARIO</Link>
          </nav>

          {/* Right - User + Quick Access */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="hover:text-[#00B248] transition-colors text-sm font-semibold tracking-wide">
              INICIAR SESIÓN
            </Link>
            <div className="relative">
              <button
                onClick={() => setQuickAccessOpen(!quickAccessOpen)}
                className="bg-[#009624] hover:bg-[#007E33] text-white px-6 py-3 flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide"
              >
                ACCESO RÁPIDO
                <ChevronDown className="w-4 h-4" />
              </button>
              {quickAccessOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg text-black">
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Inscripciones</a>
                  <a href="#ubicacion" onClick={() => setQuickAccessOpen(false)} className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Ubicación</a>
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Trayecto</a>
                  <a href="/2026" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">2026</a>
                  <a href="/register" className="block px-4 py-3 hover:bg-gray-100 text-sm">Registrarse</a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">INICIO</Link>
              <Link href="/2026" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">2026</Link>
              <Link href="/2025" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">2025</Link>
              <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">CONTACTO</a>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-xs text-gray-400 mb-2">ACCESO RÁPIDO</p>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm">Inscripciones</a>
                <a href="#ubicacion" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm">Ubicación</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm">Trayecto</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm">Registro Mega Finisher</a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  );
}
