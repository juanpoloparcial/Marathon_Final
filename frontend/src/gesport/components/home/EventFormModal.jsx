import React, { useState, useEffect } from 'react';

const EventFormModal = ({ isOpen, onClose, onSubmit, selectedDate, eventToEdit }) => {
  const [formData, setFormData] = useState({ type: 'Ciclismo', participants: '', location: '', requirements: '', date: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (eventToEdit && isOpen) {
      setFormData({
        type: eventToEdit.type || 'Ciclismo',
        participants: eventToEdit.participants || '',
        location: eventToEdit.location || '',
        requirements: eventToEdit.requirements || '',
        date: eventToEdit.date || '',
        image: null,
      });
      setImagePreview(eventToEdit.imageUrl || null);
    } else if (selectedDate && isOpen) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setFormData({ type: 'Ciclismo', participants: '', location: '', requirements: '', date: formattedDate, image: null });
      setImagePreview(null);
    }
  }, [eventToEdit, selectedDate, isOpen]);

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleImageChange = (e) => { const file = e.target.files[0]; if (file) { setFormData(prev => ({ ...prev, image: file })); setImagePreview(URL.createObjectURL(file)); } };
  
  const handleFormWrapperSubmit = (e) => {
    e.preventDefault();
    if (!formData.participants || !formData.location || !formData.date) { alert('Por favor, completa los campos de fecha, participantes y lugar.'); return; }
    onSubmit(formData, eventToEdit ? eventToEdit.id : null);
    handleClose();
  };
  
  const handleClose = () => {
    setFormData({ type: 'Ciclismo', participants: '', location: '', requirements: '', date: '', image: null });
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-xs flex items-center justify-center z-50" onClick={handleClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg m-4 flex flex-col max-h-[90vh] border border-gray-200 dark:border-gray-700" 
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex-shrink-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{eventToEdit ? 'Editar Evento' : 'Cargar Nuevo Evento'}</h2>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleFormWrapperSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de evento</label><select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"><option>Ciclismo</option><option>Maratón</option><option>Triatlón</option></select></div>
              <div><label htmlFor="participants" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nº de participantes</label><input type="number" name="participants" id="participants" value={formData.participants} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700" /></div>
            </div>
            <div><label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lugar del evento</label><input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700" /></div>
            <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha del evento</label><input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700" /></div>
            <div><label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Requisitos para ingresar</label><textarea name="requirements" id="requirements" rows="4" value={formData.requirements} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700" placeholder="Separar por comas o saltos de línea..."></textarea></div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Imagen del Evento</label>
              <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </div>
            {imagePreview && (
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Previsualización:</p>
                <img src={imagePreview} alt="Previsualización del evento" className="mt-2 rounded-lg w-full h-48 object-cover"/>
              </div>
            )}
        </form>

        <div className="flex-shrink-0 flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-semibold">Cancelar</button>
            <button type="button" onClick={handleFormWrapperSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">{eventToEdit ? 'Guardar Cambios' : 'Guardar Evento'}</button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;