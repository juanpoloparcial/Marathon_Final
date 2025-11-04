import React, { useState, useEffect } from 'react';

// --- (Componentes auxiliares e iconos sin cambios) ---
const LoadingSpinner = () => ( <div className="flex justify-center items-center p-20 col-span-3"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00B248]"></div></div> );
const ErrorMessage = ({ message }) => ( <div className="text-center p-10 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg col-span-3">{message}</div> );
const EditIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg> );
const CameraIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const DefaultAvatarIcon = ({ className }) => ( <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> );


// ===================================================================================
// ==================== (Sub-componente PersonalDataSection sin cambios) ==============
// ===================================================================================
const PersonalDataSection = ({ userData, setUserData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(userData);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const handleAvatarChange = (e) => { const file = e.target.files[0]; if (file) { setAvatarPreview(URL.createObjectURL(file)); setEditedData({...editedData, newAvatarFile: file}); } };
    const handleSaveChanges = async () => { await new Promise(resolve => setTimeout(resolve, 500)); const updatedUser = {...userData, name: editedData.name, lastName: editedData.lastName}; if (avatarPreview) { updatedUser.avatar = avatarPreview; } setUserData(updatedUser); setIsEditing(false); };
    return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg border border-gray-800">
      <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold">Perfil</h2>{!isEditing && <button onClick={() => setIsEditing(true)} className="text-[#00B248] hover:opacity-80 font-semibold">Editar</button>}</div>
      <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
        <div className="relative flex-shrink-0">{avatarPreview || userData.avatar ? (<img src={avatarPreview || userData.avatar} alt="Foto de perfil" className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"/>) : (<div className="w-32 h-32 rounded-full border-4 border-gray-800 bg-[#0f0f0f] flex items-center justify-center p-4"><DefaultAvatarIcon className="text-gray-500" /></div>)}{isEditing && (<label htmlFor="avatar-upload" className="absolute bottom-0 right-0 flex items-center justify-center h-10 w-10 bg-[#009624] hover:bg-[#007E33] rounded-full text-white cursor-pointer"><CameraIcon /><input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} /></label>)}</div>
        <div className="w-full">{isEditing ? (<div className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label className="text-sm text-gray-400">Nombre</label><input type="text" value={editedData.name} onChange={(e) => setEditedData({...editedData, name: e.target.value})} className="mt-1 block w-full px-3 py-2 rounded-md bg-[#141414] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00B248]"/></div><div><label className="text-sm text-gray-400">Apellido</label><input type="text" value={editedData.lastName} onChange={(e) => setEditedData({...editedData, lastName: e.target.value})} className="mt-1 block w-full px-3 py-2 rounded-md bg-[#141414] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00B248]"/></div></div><div className="flex justify-end space-x-3 pt-4"><button onClick={() => { setIsEditing(false); setAvatarPreview(null); }} className="px-4 py-2 bg-[#0f0f0f] border border-gray-800 text-gray-300 rounded-md font-semibold">Cancelar</button><button onClick={handleSaveChanges} className="px-4 py-2 bg-[#009624] hover:bg-[#007E33] text-white rounded-md font-semibold">Guardar Cambios</button></div></div>) : (<div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><p className="text-sm text-gray-400">Nombre</p><p className="font-semibold text-lg">{userData.name}</p></div><div><p className="text-sm text-gray-400">Apellido</p><p className="font-semibold text-lg">{userData.lastName}</p></div><div><p className="text-sm text-gray-400">Email</p><p className="font-semibold text-lg">{userData.email}</p></div></div></div>)}</div>
            </div>
        </div>
    );
};

// ===================================================================================
// ==================== (Sub-componente MyEventsSection sin cambios) =================
// ===================================================================================
const MyEventsSection = ({ userEvents, setUserEvents }) => {
    const handleUnregister = async (eventId) => { if (window.confirm('¿Estás seguro de que quieres darte de baja de este evento?')) { await new Promise(resolve => setTimeout(resolve, 500)); setUserEvents(prev => prev.filter(event => event.id !== eventId)); } };
    const handleEditEvent = (event) => { alert(`Redirigiendo para editar el evento: ${event.title}`); };
    return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Mis Eventos</h2>
      <div className="space-y-4">{userEvents.length > 0 ? (userEvents.map(event => (<div key={event.id} className="p-4 border border-gray-800 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0f0f0f]"><div><p className="font-bold text-lg">{event.title}</p><p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div><div className="flex space-x-3 mt-4 md:mt-0"><button onClick={() => handleEditEvent(event)} className="flex items-center text-sm px-3 py-1 bg-[#0a2b14] text-[#7CFF9E] rounded-md font-semibold"><EditIcon /> Editar</button><button onClick={() => handleUnregister(event.id)} className="text-sm px-3 py-1 bg-red-900/50 text-red-300 rounded-md font-semibold">Darse de baja</button></div></div>))) : (<p className="text-gray-400">No estás registrado en ningún evento.</p>)}</div>
        </div>
    );
};

// ===================================================================================
// ==================== SUB-COMPONENTE: SEGURIDAD (MODIFICADO) =======================
// ===================================================================================
const SecuritySection = () => {
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
        if (error) setError(''); // Limpiar error al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        if (passwordData.new !== passwordData.confirm) {
            setError('Las nuevas contraseñas no coinciden.');
            return;
        }
        if (passwordData.new.length < 8) {
            setError('La nueva contraseña debe tener al menos 8 caracteres.');
            return;
        }
        
        setIsSavingPassword(true);
        try {
            // TODO: Reemplazar con llamada real a la API (POST en /api/user/change-password)
            console.log("Enviando cambio de contraseña:", { current: passwordData.current, new: passwordData.new });
            await new Promise(resolve => setTimeout(resolve, 1500));
            // throw new Error("Contraseña actual incorrecta"); // Descomentar para probar el error
            setPasswordData({ current: '', new: '', confirm: '' });
            alert('Contraseña actualizada correctamente.');
        } catch (err) {
            setError('La contraseña actual es incorrecta o hubo un error.');
            console.error("Error changing password:", err);
        } finally {
            setIsSavingPassword(false);
        }
    };

    return (
    <div className="bg-black text-white p-8 rounded-lg shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold mb-6">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="current" className="block text-sm font-medium text-gray-400">Contraseña Actual</label>
          <input type="password" name="current" id="current" value={passwordData.current} onChange={handleChange} className="mt-1 block w-full px-3 py-2 rounded-md bg-[#141414] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00B248]" />
        </div>
        <div>
          <label htmlFor="new" className="block text-sm font-medium text-gray-400">Nueva Contraseña</label>
          <input type="password" name="new" id="new" value={passwordData.new} onChange={handleChange} className="mt-1 block w-full px-3 py-2 rounded-md bg-[#141414] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00B248]" />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-400">Confirmar Nueva Contraseña</label>
          <input type="password" name="confirm" id="confirm" value={passwordData.confirm} onChange={handleChange} className="mt-1 block w-full px-3 py-2 rounded-md bg-[#141414] border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-[#00B248]" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={isSavingPassword} className={`px-4 py-2 w-full font-semibold text-white rounded-md transition-colors duration-200 ${isSavingPassword ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#009624] hover:bg-[#007E33]'}`}>
            {isSavingPassword ? 'Guardando...' : 'Guardar Contraseña'}
          </button>
        </div>
      </form>
    </div>
    );
};


// ===================================================================================
// ========================== VISTA PRINCIPAL (PROFILE) ==============================
// ===================================================================================
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = { name: 'Juan', lastName: 'Perez', email: 'juan.perez@example.com', avatar: null }; 
        const mockEvents = [{ id: 1, title: 'Maratón de la Ciudad', date: '2025-09-21' }];
        setUserData(mockUser);
        setUserEvents(mockEvents);
      } catch (err) {
        setError('No se pudo cargar tu perfil.');
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <PersonalDataSection userData={userData} setUserData={setUserData} />;
      case 'events':
        return <MyEventsSection userEvents={userEvents} setUserEvents={setUserEvents} />;
      case 'security':
        return <SecuritySection />;
      default:
        return <PersonalDataSection userData={userData} setUserData={setUserData} />;
    }
  };

  if (loading) return <main className="container mx-auto px-4 py-8"><LoadingSpinner /></main>;
  if (error) return <main className="container mx-auto px-4 py-8"><ErrorMessage message={error} /></main>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <aside className="lg:col-span-1">
          <div className="flex items-center space-x-4 p-4 mb-6">
            <div className="relative flex-shrink-0">
                {userData.avatar ? (
                    <img src={userData.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-[#0f0f0f] border border-gray-800 flex items-center justify-center p-2">
                        <DefaultAvatarIcon className="text-gray-500" />
                    </div>
                )}
            </div>
            <div>
              <p className="text-gray-400">¡Hola!</p>
              <p className="font-bold text-lg text-white">{userData.name}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('profile')} className={`w-full text-left flex items-center p-3 rounded-lg font-semibold transition-colors duration-200 ${activeTab === 'profile' ? 'bg-[#0a2b14] text-[#7CFF9E]' : 'hover:bg-[#0f0f0f]'}`}>
              <span className={`w-1 h-6 mr-3 rounded-full ${activeTab === 'profile' ? 'bg-[#00B248]' : 'bg-transparent'}`}></span>
              Perfil
            </button>
            <button onClick={() => setActiveTab('events')} className={`w-full text-left flex items-center p-3 rounded-lg font-semibold transition-colors duration-200 ${activeTab === 'events' ? 'bg-[#0a2b14] text-[#7CFF9E]' : 'hover:bg-[#0f0f0f]'}`}>
              <span className={`w-1 h-6 mr-3 rounded-full ${activeTab === 'events' ? 'bg-[#00B248]' : 'bg-transparent'}`}></span>
              Mis Eventos
            </button>
            <button onClick={() => setActiveTab('security')} className={`w-full text-left flex items-center p-3 rounded-lg font-semibold transition-colors duration-200 ${activeTab === 'security' ? 'bg-[#0a2b14] text-[#7CFF9E]' : 'hover:bg-[#0f0f0f]'}`}>
              <span className={`w-1 h-6 mr-3 rounded-full ${activeTab === 'security' ? 'bg-[#00B248]' : 'bg-transparent'}`}></span>
              Seguridad
            </button>
          </nav>
        </aside>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
        
      </div>
    </main>
  );
};

export default Profile;