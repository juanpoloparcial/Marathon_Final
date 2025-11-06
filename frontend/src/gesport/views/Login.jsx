import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/gesport/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        // Limpiar error cuando el usuario empiece a escribir
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
        newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
        }

        if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
        return;
        }

        setIsLoading(true);

        try {
    await login(formData.email, formData.password);
    router.replace('/profile');
        
        } catch (error) {
        console.error('Error en login:', error);
    alert('Error al iniciar sesión');
        } finally {
        setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        alert('Funcionalidad de recuperar contraseña');
    };

    return (
        <section className="bg-black text-white min-h-[60vh]">
            <div className="container mx-auto px-4 max-w-md py-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Iniciar sesión</h1>
                <div>
                    <div className="mb-5">
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded border text-sm outline-none transition-colors ${
                                isLoading ? 'bg-[#101010] border-gray-800 text-gray-500' : 'bg-[#141414] border-gray-800 text-white'
                            } placeholder-gray-500 focus:border-[#00B248]`}
                        />
                        {errors.email && (
                            <span className="block text-red-500 text-xs mt-1">{errors.email}</span>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded border text-sm outline-none transition-colors ${
                                isLoading ? 'bg-[#101010] border-gray-800 text-gray-500' : 'bg-[#141414] border-gray-800 text-white'
                            } placeholder-gray-500 focus:border-[#00B248]`}
                        />
                        {errors.password && (
                            <span className="block text-red-500 text-xs mt-1">{errors.password}</span>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full bg-[#009624] hover:bg-[#007E33] text-white px-6 py-3 font-semibold tracking-wide rounded ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>
                </div>

                <div className="text-center mt-5">
                    <button
                        onClick={handleForgotPassword}
                        className="bg-transparent border-none text-[#00B248] underline cursor-pointer text-sm hover:opacity-80"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                    <p className="mt-4 text-gray-400 text-sm">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-[#00B248] hover:opacity-80">Regístrate</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}