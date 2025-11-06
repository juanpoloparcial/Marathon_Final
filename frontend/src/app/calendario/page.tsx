"use client";
import React, { useRef } from "react";
import Image from "next/image";
import GesportCalendarView from "@/gesport/views/Home";
import { motion, useInView } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

export default function CalendarioPage() {
  const contactRef = useRef<HTMLElement | null>(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  return (
    <div className="bg-black text-white pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Calendario</h1>
        {/* Shell oscuro coherente con Marathon */}
        <div className="bg-black rounded-lg p-4 md:p-6 border border-gray-800">
          {/* Forzamos colores compatibles dentro si fuese necesario con utilidades */}
          <div className="[&_button.bg-blue-600]:bg-[#009624] [&_button.bg-blue-600:hover]:bg-[#007E33] [&_.text-blue-600]:text-[#00B248] [&_.dark\:text-blue-400]:dark:text-[#7CFF9E]">
            <GesportCalendarView />
          </div>
        </div>
      </div>

      {/* Contact Section (copied from 2025/2026 pages) */}
      <motion.section
        id="contacto"
        ref={contactRef}
        className="py-20 bg-black"
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-5xl font-bold mb-8 uppercase">CONTACTO</h2>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-gray-400 text-sm uppercase mb-2">Teléfono:</p>
                  <p className="text-2xl font-bold">+549 3704123456</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm uppercase mb-2">Email:</p>
                  <p className="text-2xl">registro.gesport@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/Gesport" className="w-14 h-14 rounded-full bg-[#007E33] flex items-center justify-center hover:bg-[#00B248] transition-colors">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/Gesport" className="w-14 h-14 rounded-full bg-[#007E33] flex items-center justify-center hover:bg-[#00B248] transition-colors">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 pt-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <Image
                  src="/gesport2.SVG"
                  alt="GESPORT Logo"
                  width={120}
                  height={100}
                  className="mb-4"
                />
                <p className="text-gray-400 text-sm mb-4">
                  Descubrí la única maratón oficial del Formosa: un evento inolvidable que une pasión y deporte.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/Gesport" className="text-gray-400 hover:text-[#00B248] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/Gesport" className="text-gray-400 hover:text-[#00B248] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 uppercase">Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://pmcpy.org/" className="hover:text-white transition-colors">PMC</a></li>
                  <li><a href="https://eventrid.com.py/" className="hover:text-white transition-colors">Eventrid</a></li>
                  <li><a href="https://www.runningtime.org/" className="hover:text-white transition-colors">Running Time</a></li>
                  <li><a href="https://megafinisher.com/" className="hover:text-white transition-colors">Mega Finisher</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 uppercase">Página</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Inscripciones</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GESPORT</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-4 uppercase">Contacto</h3>
                <div className="space-y-3 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Image src="https://ext.same-assets.com/1514348712/2036263267.svg" alt="Phone" width={16} height={16} />
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="text-white font-semibold">+549 3704123456</p>
                    </div>
                  </div>
                  <p className="text-xs">
                    Instituto Politécnico. Formosa, Argentina.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
              ©2025 GESPORT. Derechos Reservados.
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
