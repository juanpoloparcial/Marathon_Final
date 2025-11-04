'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Menu, X, ChevronDown, Calendar, Clock, MapPin, Activity, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center">
        <div className="text-2xl md:text-4xl font-bold text-[#007E33]">{timeLeft.days}</div>
        <div className="text-xs md:text-sm uppercase tracking-wide mt-1">Días</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center">
        <div className="text-2xl md:text-4xl font-bold text-[#007E33]">{timeLeft.hours}</div>
        <div className="text-xs md:text-sm uppercase tracking-wide mt-1">Horas</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center">
        <div className="text-2xl md:text-4xl font-bold text-[#007E33]">{timeLeft.minutes}</div>
        <div className="text-xs md:text-sm uppercase tracking-wide mt-1">Min</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center">
        <div className="text-2xl md:text-4xl font-bold text-[#007E33]">{timeLeft.seconds}</div>
        <div className="text-xs md:text-sm uppercase tracking-wide mt-1">Seg</div>
      </div>
    </div>
  );
}

// Sponsor Carousel Component
function SponsorCarousel() {
  const sponsors = [
    { name: 'POLO', logo: '/ipf.png' },
    { name: 'Adidas', logo: '/adidas2.png' },
    { name: 'Powerade', logo: '/Powerade.jpg' },
    { name: 'IPF', logo: '/ipf.png' },
    { name: 'FSA', logo: '/escudo_fsa.png' },
    { name: 'Ias', logo: '/ias2.png' }
  ];

  // Duplicamos la lista para lograr un loop visual continuo
  const repeatedSponsors = [
    { name: 'POLO', logo: '/ipf.png' },
    { name: 'Adidas', logo: '/adidas2.png' },
    { name: 'Powerade', logo: '/power.png' },
    { name: 'IPF', logo: '/ipf.png' },
    { name: 'FSA', logo: '/escudo_fsa.png' },
    { name: 'Ias', logo: '/ias2.png' },
    { name: 'POLO', logo: '/ipf.png' },
    { name: 'Adidas', logo: '/adidas2.png' },
    { name: 'Powerade', logo: '/power.png' },
    { name: 'IPF', logo: '/ipf.png' },
    { name: 'FSA', logo: '/escudo_fsa.png' },
    { name: 'Ias', logo: '/ias2.png' }
  ];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-16"
        animate={{
          x: ["0%", "-25%"], // desplazamos la mitad porque duplicamos la lista
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25, // velocidad de aparacion de los sponsors. + chico + rápido.
            ease: "linear",
          },
        }}
      >
        {repeatedSponsors.map((sponsor, index) => (
          <img
            key={index}
            src={sponsor.logo}
            alt={sponsor.name}
            className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const marathonRef = useRef(null);
  const statsRef = useRef(null);
  const megaRef = useRef(null);
  const recognitionRef = useRef(null);
  const editionsRef = useRef(null);
  const contactRef = useRef(null);

  const marathonInView = useInView(marathonRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const megaInView = useInView(megaRef, { once: true, margin: "-100px" });
  const recognitionInView = useInView(recognitionRef, { once: true, margin: "-100px" });
  const editionsInView = useInView(editionsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  const editions = [
    { year: 'GeSPORT 2025', color: 'bg-red-600', link: '#', image: 'https://ext.same-assets.com/1514348712/2406533449.png' },
    { year: 'GeSPORT 2024', color: 'bg-blue-600', link: '#', image: 'https://ext.same-assets.com/1514348712/72072610.png' },
    { year: 'GeSPORT 2023', color: 'bg-[#00B248]', link: '#', image: 'https://ext.same-assets.com/1514348712/72072610.png' },
    { year: 'GeSPORT 2022', color: 'bg-gray-600', link: '#', image: 'https://ext.same-assets.com/1514348712/72072610.png' },
  ];
  {/* Cuenta regresiva */}
  const eventDate = new Date('2026-03-29T06:30:00');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="bg-black text-white fixed top-0 w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                src="/correr.png"
                alt="GeSPORT Logo"
                className="h-12 md:h-16"
              />
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
                  className="bg-[#009624] hover:bg-[#007E33] text-white px-6 py-3 flex items-center gap-2 transition-colors text-sm font-semibold tracking-wide">
                  ACCESO RÁPIDO
                  <ChevronDown className="w-4 h-4" />
                </button>
                {quickAccessOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg text-black">
                    <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Inscripciones</a>
                    <a href="#ubicacion" onClick={() => setQuickAccessOpen(false)} className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Ubicación</a>
                    <a href="#" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">Trayecto</a>
                    <a href="/2026" className="block px-4 py-3 hover:bg-gray-100 border-b text-sm">2026</a>
                    <Link href="/register" onClick={() => setQuickAccessOpen(false)} className="block px-4 py-3 hover:bg-gray-100 text-sm">Registrarse</Link>
                  </div>
                )}
              </div>
            </div>
          
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4">
              <nav className="flex flex-col space-y-3">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">INICIO</a>
                <a href="/2026" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">2026</a>
                <a href="/2025" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#d14536] transition-colors text-sm font-semibold">2025</a>
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

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 md:pt-24" style={{
        backgroundImage: 'url(/costanera_atardecer.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xs md:text-sm mb-3 md:mb-4 tracking-wider">MARATÓN PROVINCIAL DE FORMOSA</p>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                LA ÚNICA MARATÓN OFICIAL DE FORMOSA
              </h1>
              <p className="text-sm md:text-lg mb-6 md:mb-8 max-w-xl">
                Un evento inolvidable que une pasión, deporte e historia.
              </p>

              {/* Countdown Timer */}
              <CountdownTimer targetDate={eventDate} />

              <Link href="/2026">
                <button className="bg-black hover:bg-[#006A22] text-white px-6 md:px-8 py-3 md:py-4 font-semibold tracking-wide transition-colors text-xs md:text-base">
                  MÁS INFORMACIÓN
                </button>
              </Link>
            </motion.div>

            {/* Event Card */}
            <motion.div
              className="bg-black p-6 md:p-8 max-w-md mx-auto lg:mx-0 lg:ml-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className='flex justify-center'>
              <div className="bg-[#57bb5e] text-black px-4 py-2 inline-block mb-4 text-xs md:text-sm font-bold tracking-wide">
                INSCRIPCIONES 2026 ABIERTAS
              </div>
              </div>
              <div className="mb-6">
                <img
                  src="/gesport2.svg"
                  alt="GeSport 2026"
                  className="w-full"
                />
              </div>
              <h3 className="text-[#007E33] text-2xl md:text-3xl font-bold mb-6">Detalles</h3>
              <div className="space-y-4 text-white">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#009624] flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base">29 DE MARZO, 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#009624] flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base">LARGADA 06:30 AM</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#009624] flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base">COSTANERA DE FORMOSA | FORMOSA, ARGENTINA</span>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-[#009624] flex-shrink-0 mt-1" />
                  <span className="text-sm md:text-base">21KM / 10KM / 5KM</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sponsor Carousel */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-4">
          <div className="container mx-auto px-4">
            <SponsorCarousel />
          </div>
        </div>
      </section>

      {/* Marathon in Formosa Section */}
      <section ref={marathonRef} className="py-16 md:py-24 bg-[#f8f6f5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              className="relative"
              initial="hidden"
              animate={marathonInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32">
                <div className="checker-pattern"></div>
              </div>
              <img
                src="/maraton_tarde.jpg"
                alt="Runner with medal"
                className="relative z-10 w-full shadow-2xl"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              animate={marathonInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-[#006A22] text-sm md:text-base mb-2 tracking-wider font-semibold">EL INICIO DE UNA HISTORIA</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
                MARATÓN EN FORMOSA
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                Descubrí la única maratón oficial del Formosa: un evento inolvidable que une pasión y deporte.
              </p>
              <div className="w-full h-1 bg-[#007E33] mb-8"></div>
              <Link href="/2026">
                <button className="bg-[#006A22] hover:bg-[#007E33] text-white px-8 py-4 font-semibold tracking-wide transition-colors text-sm md:text-base">
                  MÁS INFORMACIÓN
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="py-16 md:py-24 bg-black text-white"
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Stat 1 */}
            <motion.div
              className="text-center border-r-0 md:border-r border-gray-700 last:border-r-0"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-4xl md:text-6xl font-bold text-[#007E33] mb-2">750</div>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400">PREMIOS ENTREGADOS</p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              className="text-center border-r-0 md:border-r border-gray-700 last:border-r-0"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl md:text-6xl font-bold text-[#007E33] mb-2">15000</div>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400">CORREDORES ACTIVOS</p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              className="text-center border-r-0 md:border-r border-gray-700 last:border-r-0"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="text-4xl md:text-6xl font-bold text-[#007E33] mb-2">2°</div>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400">AÑO</p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              className="text-center"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-4xl md:text-6xl font-bold text-[#007E33] mb-2">300</div>
              <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400">KILÓMETROS CORRIDOS</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mega Finisher Section */}
      <section ref={megaRef} className="grid lg:grid-cols-2">
        {/* Left - White Content */}
        <motion.div
          className="bg-[#f8f6f5] py-16 md:py-24 px-6 md:px-12"
          initial="hidden"
          animate={megaInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-black">NEA FINISHER</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            GeSport es parte de NEA FINISHER, un circuito provincial de maratones y medias maratones que se desarrolla en 4 provincias de Argentina (Chaco, Formosa, Misiones y Corrientes).
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <div className="bg-yellow-400 rounded-full p-1 mt-1 flex-shrink-0">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold">Crea Tu Cuenta en GeSPORT</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-yellow-400 rounded-full p-1 mt-1 flex-shrink-0">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold">Regístrese Para Las Pruebas</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-yellow-400 rounded-full p-1 mt-1 flex-shrink-0">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold">Corre Y Registra Tu Resultado</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-yellow-400 rounded-full p-1 mt-1 flex-shrink-0">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-800 font-semibold">Completa Los 4 Eventos</span>
            </li>
          </ul>
          <p className="text-gray-600 mb-8 leading-relaxed">
            En un máximo de 18 meses, gana tu NEA Leyenda y conviértete en una Leyenda de las carreras de la región.
          </p>
          <Link href="/2026">
            <button className="bg-black hover:bg-[#009624] text-white px-8 py-4 font-semibold tracking-wide transition-colors text-sm md:text-base">
              MÁS INFORMACIÓN
            </button>
          </Link>
        </motion.div>

        {/* Right - Image */}
        <motion.div
          className="bg-black flex items-center justify-center p-8 md:p-16"
          initial="hidden"
          animate={megaInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/costanera_fsa.jpg"
            alt="Mega Finisher"
            className="max-w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Reconocimiento Section */}
      <motion.section
        ref={recognitionRef}
        className="py-16 md:py-24 bg-black text-white"
        initial="hidden"
        animate={recognitionInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <p className="text-[#009624] text-center text-sm md:text-base mb-4 tracking-wider font-semibold">GESPORT</p>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">RECONOCIMIENTO PROVINCIAL</h2>

          <div className="grid lg:grid-cols-3 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-12">
              <div className="text-right">
                <h4 className="text-base md:text-lg font-semibold mb-2">Asociación</h4>
                <p className="text-sm text-gray-400">Maratón con asociación del IAS.</p>
                <div className="text-5xl md:text-7xl font-bold text-white/10 mt-2">01</div>
              </div>
              <div className="text-right">
                <h4 className="text-base md:text-lg font-semibold mb-2">Certificación</h4>
                <p className="text-sm text-gray-400">Certificado World Athetics - AIMS.</p>
                <div className="text-5xl md:text-7xl font-bold text-white/10 mt-2">02</div>
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src="/aire_libre_en_costanera.jpg"
                  alt="GeSPORT Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              <div>
                <div className="text-5xl md:text-7xl font-bold text-white/10 mb-2">03</div>
                <h4 className="text-base md:text-lg font-semibold mb-2">Cronometraje</h4>
                <p className="text-sm text-gray-400">Fiscalizado con tecnología Chronotrack.</p>
              </div>
              <div>
                <div className="text-5xl md:text-7xl font-bold text-white/10 mb-2">04</div>
                <h4 className="text-base md:text-lg font-semibold mb-2">Reconocimiento</h4>
                <p className="text-sm text-gray-400">Evento declarado de interés municipal, provincial e interés cultural.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Previous Editions Section */}
      <motion.section
        ref={editionsRef}
        className="py-16 md:py-24 bg-black text-white"
        initial="hidden"
        animate={editionsInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-center mb-12"
            variants={fadeInUp}
          >
            EDICIONES ANTERIORES
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {editions.map((edition, index) => (
              <motion.a
                key={index}
                href={edition.link}
                className="flex flex-col items-center gap-4 group"
                variants={fadeInUp}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-32 h-32 md:w-40 md:h-40 ${edition.color} rounded-full border-4 border-white flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#d14536]/50 transition-all duration-300`}>
                  <div className="text-center relative z-10">
                    <div className="text-2xl md:text-3xl font-bold">GeSPORT</div>
                    <div className="text-base md:text-lg">{edition.year.split(' ')[1]}</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-sm md:text-base font-bold group-hover:text-[#d14536] transition-colors">{edition.year}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Map Section */}
      <section className="bg-[#f8f6f5] py-16 md:py-24">
        <section id="ubicacion" className="bg-[#f8f6f5] py-16 md:py-2" style={{ scrollMarginTop: '100px' }}></section>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-black">UBICACIÓN DEL EVENTO</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Costanera de Formosa | Formosa, Argentina
            </p>
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.502259409548!2d-58.1599898!3d-26.1755423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945ca5df2de7fccf%3A0x9b38a781e484f195!2sCostanera%20de%20Formosa%2C%20Formosa!5e0!3m2!1ses!2sar!4v1698765432109!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contacto" className="grid lg:grid-cols-2">
        {/* Left - Image */}
        <motion.div
          className="h-64 lg:h-auto"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/corredores_ByN.jpg"
            alt="Runners celebrating"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Contact Info */}
        <motion.div
          className="bg-[#f8f6f5] py-16 px-6 md:px-12"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">INSCRIPCIONES Y CONTACTO</h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">TELÉFONO:</p>
              <p className="text-lg md:text-xl font-semibold text-black">3704123456</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">EMAIL:</p>
              <p className="text-lg md:text-xl font-semibold text-black">registro.gesport@gmail.com</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full bg-black hover:bg-gray-900 text-[#00B248] px-8 py-4 font-semibold tracking-wide transition-colors text-sm md:text-base">
              INSCRIPCIONES
            </button>
            <button className="w-full bg-black hover:bg-gray-900 text-[#00B248] px-8 py-4 font-semibold tracking-wide transition-colors text-sm md:text-base">
              WHATSAPP
            </button>
          </div>

          <div className="flex gap-4">
            <a href="#" className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-black hover:bg-gray-900 text-white p-3 rounded-full transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <img
                src="/GESPORT2.SVG"
                alt="GeSPORT Logo"
                className="h-16 mb-4"
              />
              <p className="text-sm text-gray-400 leading-relaxed">
                Descubrí la única maratón oficial del Formosa: un evento inolvidable que une pasión y deporte.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="hover:text-[#00B248] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-[#00B248] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#00B248] text-sm font-bold mb-4 uppercase tracking-wider">LINKS</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">PMC</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Eventrid</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Running Time</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mega Finisher</a></li>
              </ul>
            </div>

            {/* Page */}
            <div>
              <h4 className="text-[#00B248] text-sm font-bold mb-4 uppercase tracking-wider">PÁGINA</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/register" className="text-gray-400 hover:text-white transition-colors">Inscripciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GESPORT</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#00B248] text-sm font-bold mb-4 uppercase tracking-wider">CONTACTO</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Teléfono</p>
                  <p className="text-white font-semibold">+549 3704123456</p>
                </div>
                <div>
                  <p className="text-gray-400 leading-relaxed">
                    Instituto Politécnico. Formosa, Argentina.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
            <p>©2025 GS. Derechos Reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .checker-pattern {
          background-image:
            linear-gradient(45deg, #000 25%, transparent 25%),
            linear-gradient(-45deg, #000 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #000 75%),
            linear-gradient(-45deg, transparent 75%, #000 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          width: 100%;
          height: 100%;
        }
      `}</style>
+     <style jsx global>{`
+       html { scroll-behavior: smooth; }
+     `}</style>
    </div>
  );
}
