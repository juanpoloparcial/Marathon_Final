"use client";
import React from "react";
import GesportRegister from "@/gesport/views/Register";

export default function RegisterPage() {
  return (
    <section className="bg-black text-white pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <GesportRegister />
      </div>
    </section>
  );
}
