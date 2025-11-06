import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/gesport/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
    const { register } = useAuth();
    const router = useRouter();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
        }

        if (!apellido.trim()) {
        newErrors.apellido = 'El apellido es requerido';
        }

        if (!email.trim()) {
        newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'El email no es válido';
        }

        if (!contrasenia) {
        newErrors.contrasenia = 'La contraseña es requerida';
        } else if (contrasenia.length < 6) {
        newErrors.contrasenia = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
        return;
        }
        setIsLoading(true);

        try {
        const json = await register({ nombre, apellido, email, contrasenia });
        if (json) {
            alert('Éxito: Usuario registrado. Ya podés iniciar sesión.');
            setNombre('');
            setApellido('');
            setEmail('');
            setContrasenia('');
            setErrors({});
            router.replace('/login');
        } else {
            alert('No se pudo registrar.');
        }
        } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        alert(`Error de red: ${errorMessage}`);
        } finally {
        setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        if (field === 'nombre') setNombre(value);
        if (field === 'apellido') setApellido(value);
        if (field === 'email') setEmail(value);
        if (field === 'contrasenia') setContrasenia(value);

        if (errors[field]) {
        setErrors(prev => ({
            ...prev,
            [field]: ''
        }));
        }
    };

    return (
        <section className="bg-black text-white min-h-[60vh]">
            <div className="container mx-auto px-4 max-w-md py-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Crear cuenta</h1>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={e => handleInputChange('nombre', e.target.value)}
                            placeholder="Tu nombre"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded border text-sm outline-none transition-colors ${
                                isLoading ? 'bg-[#101010] border-gray-800 text-gray-500' : 'bg-[#141414] border-gray-800 text-white'
                            } placeholder-gray-500 focus:border-[#00B248]`}
                        />
                        {errors.nombre && (
                            <span className="block text-red-500 text-xs mt-1">{errors.nombre}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Apellido</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={e => handleInputChange('apellido', e.target.value)}
                            placeholder="Tu apellido"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded border text-sm outline-none transition-colors ${
                                isLoading ? 'bg-[#101010] border-gray-800 text-gray-500' : 'bg-[#141414] border-gray-800 text-white'
                            } placeholder-gray-500 focus:border-[#00B248]`}
                        />
                        {errors.apellido && (
                            <span className="block text-red-500 text-xs mt-1">{errors.apellido}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => handleInputChange('email', e.target.value)}
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
                    <div>
                        <label className="block mb-1 text-sm text-gray-400 font-medium">Contraseña</label>
                        <input
                            type="password"
                            value={contrasenia}
                            onChange={e => handleInputChange('contrasenia', e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            disabled={isLoading}
                            className={`w-full px-4 py-3 rounded border text-sm outline-none transition-colors ${
                                isLoading ? 'bg-[#101010] border-gray-800 text-gray-500' : 'bg-[#141414] border-gray-800 text-white'
                            } placeholder-gray-500 focus:border-[#00B248]`}
                        />
                        {errors.contrasenia && (
                            <span className="block text-red-500 text-xs mt-1">{errors.contrasenia}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className={`w-full bg-[#009624] hover:bg-[#007E33] text-white px-6 py-3 font-semibold tracking-wide rounded mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
                <p className="text-center mt-5 text-gray-400 text-sm">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="text-[#00B248] hover:opacity-80">Inicia sesión</Link>
                </p>
            </div>
        </section>
    );
}