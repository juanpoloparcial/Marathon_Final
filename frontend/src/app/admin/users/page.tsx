"use client";
import { useAuth } from "@/gesport/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
  const { role, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
    else if (role !== 'superadmin') router.replace('/');
  }, [isAuthenticated, role, router]);

  return (
    <section className="bg-black text-white min-h-[60vh]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Gestión de Usuarios</h1>
        <p className="text-gray-400">Aquí podrás listar usuarios, cambiar roles y eliminar cuentas.</p>
      </div>
    </section>
  );
}
