"use client";
import Link from "next/link";
import { useAuth } from "@/gesport/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
    else if (!(role === 'admin' || role === 'superadmin')) router.replace('/');
  }, [isAuthenticated, role, router]);

  return (
    <section className="bg-black text-white min-h-[60vh]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Panel de Administración</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <Link href="/admin/events" className="block bg-[#141414] border border-gray-800 p-6 rounded hover:border-[#00B248]">Gestión de Eventos</Link>
          {role === 'superadmin' && (
            <Link href="/admin/users" className="block bg-[#141414] border border-gray-800 p-6 rounded hover:border-[#00B248]">Gestión de Usuarios</Link>
          )}
        </div>
      </div>
    </section>
  );
}
