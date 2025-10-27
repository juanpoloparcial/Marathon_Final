"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, Clock, MapPin, Activity, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useEffect, useState } from "react";


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  useEffect(() => {
    document.title = "GESPORT";
  }, []);
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/gesport2.SVG"
                alt="GeSport Logo"
                width={100}
                height={80}
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold tracking-wide">
                INICIO
              </Link>
              <Link href="/2026" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold tracking-wide">
                2026
              </Link>
              <Link href="/2025" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold tracking-wide">
                2025
              </Link>
              <Link href="#contacto" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold tracking-wide">
                CONTACTO
              </Link>
            </nav>

            {/* Quick Access Button */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setQuickAccessOpen(!quickAccessOpen)}
                className="bg-[#d14536] hover:bg-[#b83a2d] text-white px-6 py-3 flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide"
              >
                ACCESO RÁPIDO
                <ChevronDown className="w-4 h-4" />
              </button>
              {quickAccessOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg text-black">
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Infromación</a>
                  <a href="#ubicacion" onClick={() => setQuickAccessOpen(false)} className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Ubicación</a>
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Trayecto</a>
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Mega Finisher</a>
                  <a href="/2026" className="block px-4 py-3 hover:bg-gray-100 text-sm"> Resultados</a>
                  <a href="#" className="block px-4 py-3 hover:bg-gray-100 text-sm"> Fotos </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold">
                  INICIO
                </Link>
                <Link href="/2026" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold">
                  2026
                </Link>
                <Link href="/2025" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold">
                  2025
                </Link>
                <Link href="#contacto" className="text-white hover:text-[#e27552] transition-colors uppercase font-semibold">
                  CONTACTO
                </Link>
                <button className="bg-[#e27552] text-black px-6 py-3 font-bold uppercase hover:bg-[#c15b40] transition-colors">
                  ACCESO RÁPIDO
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/maraton_portada_gente.jpg"
          alt="Marathon runners"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#e27552] mb-6 font-oswald animate-fade-in">
            GeSPORT 2025
          </h1>
          <div className="flex items-center justify-center gap-2 text-white text-base md:text-lg">
            <Link href="/" className="hover:text-[#e27552] transition-colors">Inicio</Link>
            <span>&gt;</span>
            <span>GeSPORT 2025</span>
          </div>
        </div>
      </section>

      {/* Event Information Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 uppercase">Información del Evento</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Event Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://ext.same-assets.com/1514348712/407749727.jpeg"
                alt="Marathon Event"
                fill
                className="object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="space-y-8">
              {/* Marathon */}
              <div>
                <h3 className="text-3xl font-bold text-[#e27552] mb-2">Maratón | 21Km</h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <Image src="https://ext.same-assets.com/1514348712/1991134511.svg" alt="Clock" width={20} height={20} />
                  <span>LARGADA 07:30 AM</span>
                </div>
              </div>

              {/* Half Marathon */}
              <div>
                <h3 className="text-3xl font-bold text-[#e27552] mb-2">Media Maratón | 10Km</h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <Image src="https://ext.same-assets.com/1514348712/4003222529.svg" alt="Clock" width={20} height={20} />
                  <span>LARGADA 07:30 AM</span>
                </div>
              </div>

              {/* 7K Run */}
              <div>
                <h3 className="text-3xl font-bold text-[#e27552] mb-2">Corrida | 5Km</h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <Image src="https://ext.same-assets.com/1514348712/3705523418.svg" alt="Clock" width={20} height={20} />
                  <span>LARGADA 08:00 AM</span>
                </div>
              </div>

              {/* Date & Location */}
              <div>
                <h3 className="text-3xl font-bold text-[#e27552] mb-4">Fecha | Lugar</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Image src="https://ext.same-assets.com/1514348712/500474807.svg" alt="Calendar" width={20} height={20} />
                    <span>31 DE AGOSTO, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Image src="https://ext.same-assets.com/1514348712/2465361752.svg" alt="Location" width={20} height={20} />
                    <span>COSTANERA DE FORMOSA | FORMOSA, ARGENTINA</span>
                  </div>
                </div>
              </div>

              {/* Kit Pickup */}
              <div>
                <h3 className="text-3xl font-bold text-[#e27552] mb-4">Entrega De Kits</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2 text-gray-300">
                    <Image src="https://ext.same-assets.com/1514348712/1001471554.svg" alt="Schedule" width={20} height={20} />
                    <div className="text-sm">
                      <p>MIÉRCOLES 27 DE 13:00HS A 21:00HS</p>
                      <p>JUEVES 28 DE 13:00HS A 21:00HS</p>
                      <p>VIERNES 29 DE 13:00HS A 21:00HS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Image src="https://ext.same-assets.com/1514348712/2436230186.svg" alt="Location" width={20} height={20} />
                    <span>GALPON G | FORMOSA, ARGENTINA</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                  INSCRIPCIONES
                </button>
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                  INSCRIPCIONES SIN KIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Regulations Section */}
      <section className="py-20 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://ext.same-assets.com/1514348712/407749727.jpeg"
                alt="Runners"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Ubicación y Reglamento</h2>
              <p className="text-gray-400 mb-6">Haga click para ver más</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  UBICACIÓN
                </button>
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  REGLAMENTO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/corredores_ByN.jpg"
                alt="Route Maps"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Trayecto</h2>
              <p className="text-gray-400 mb-6">Haga click para ver los trayectos</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  21 KM
                </button>
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  10 KM
                </button>
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  5 KM
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mega Finisher Section */}
      <section className="py-20 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/podio.jpg"
                alt="Mega Finisher"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Mega Finisher</h2>
              <p className="text-gray-400 mb-6">Haga click para ser parte</p>
              <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                REGISTRO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/resultados.jpg"
                alt="Winners Podium"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Resultados</h2>
              <p className="text-gray-400 mb-6">Haga click para ver los resultados</p>
              <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                RESULTADOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-20 bg-[#141414]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/fotos_costa.jpg"
                alt="Event Photos"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-4">Fotografías</h2>
              <p className="text-gray-400 mb-6">Haga click para ver las fotos del evento</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  FOTOS 
                </button>
                <button className="bg-[#e27552] text-black px-8 py-4 font-bold uppercase hover:bg-[#c15b40] transition-all hover:scale-105">
                  FOTOS GE SPORT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-black">
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
                <a href="https://www.instagram.com/PyMarathonClub" className="w-14 h-14 rounded-full bg-[#e27552] flex items-center justify-center hover:bg-[#c15b40] transition-colors">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/PyMarathonClub" className="w-14 h-14 rounded-full bg-[#e27552] flex items-center justify-center hover:bg-[#c15b40] transition-colors">
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
                  <a href="https://www.facebook.com/PyMarathonClub" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/PyMarathonClub" className="text-gray-400 hover:text-white transition-colors">
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
                  <li><a href="/mia" className="hover:text-white transition-colors">GESPORT</a></li>
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
      </section>
    </div>
  );
}
