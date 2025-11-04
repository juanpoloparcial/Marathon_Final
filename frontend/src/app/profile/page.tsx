"use client";
import React from "react";
import GesportProfile from "@/gesport/views/Profile";

export default function ProfilePage() {
  return (
    <section className="bg-black text-white pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <GesportProfile />
      </div>
    </section>
  );
}
