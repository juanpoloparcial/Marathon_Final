"use client";
import React from "react";
import GesportCalendarView from "@/gesport/views/Home";

export default function CalendarioPage() {
  return (
    <section className="bg-black text-white pb-16 min-h-screen">
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
    </section>
  );
}
