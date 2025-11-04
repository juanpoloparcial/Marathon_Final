"use client";
import React from "react";
import GesportLogin from "@/gesport/views/Login";

export default function LoginPage() {
  return (
    <section className="bg-black text-white pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <GesportLogin />
      </div>
    </section>
  );
}
