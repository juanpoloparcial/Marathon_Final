import React, { useState } from 'react';

// --- Iconos para los botones (sin cambios) ---
const ChevronLeftIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg> );
const ChevronRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> );


const FunctionalCalendar = ({ events, onEventRegisterToggle, userRole, onAddEventClick }) => {
  const startYear = 2025; // Año de inicio fijo

  // 1. MODIFICADO: El estado inicial ahora previene fechas anteriores a 2025
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    // Si el año actual es menor a nuestro año de inicio, forzamos a que sea Enero de 2025
    if (today.getFullYear() < startYear) {
      return new Date(startYear, 0, 1); // Enero es el mes 0
    }
    return today;
  });

  // 2. MODIFICADO: El botón de mes anterior ahora tiene una validación
  const handlePrevMonth = () => {
    // Previene ir a un mes anterior a Enero de 2025
    if (currentDate.getFullYear() === startYear && currentDate.getMonth() === 0) {
      return;
    }
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleCreateEvent = (date) => {
    onAddEventClick(date);
  };

  // --- Lógica para generar el calendario (sin cambios) ---
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long' });
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const calendarDays = [];
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  for (let i = startDayIndex - 1; i >= 0; i--) { calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false, fullDate: new Date(year, month - 1, daysInPrevMonth - i) }); }
  for (let i = 1; i <= daysInMonth; i++) { calendarDays.push({ day: i, isCurrentMonth: true, fullDate: new Date(year, month, i) }); }
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) { calendarDays.push({ day: i, isCurrentMonth: false, fullDate: new Date(year, month + 1, i) }); }

  return (
    <div className="bg-black text-white p-4 sm:p-6 rounded-xl shadow-lg w-full border border-gray-800">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {/* 3. MODIFICADO: El botón se deshabilita si no se puede ir hacia atrás */}
          <button
            onClick={handlePrevMonth}
            disabled={year === startYear && month === 0}
            className="p-2 rounded-full bg-black/40 border border-gray-800 text-white hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon />
          </button>
          <h2 className="text-xl font-bold capitalize w-32 text-center">{monthName}</h2>
          <button onClick={handleNextMonth} className="p-2 rounded-full bg-black/40 border border-gray-800 text-white hover:bg-[#1a1a1a] transition-colors">
            <ChevronRightIcon />
          </button>
        </div>
        <div className="mt-4 sm:mt-0">
          {/* 4. MODIFICADO: La generación de años ahora es fija a partir de 2025 */}
          <select onChange={handleYearChange} value={year} className="p-2 border rounded-md bg-black border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00B248] focus:border-[#00B248]">
            {Array.from({ length: 11 }, (_, i) => startYear + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
        {daysOfWeek.map((day, idx) => (
          <div key={`${day}-${idx}`} className="font-semibold text-gray-600 dark:text-gray-400 text-sm py-2">{day}</div>
        ))}
        {calendarDays.map((dayInfo, index) => {
          const isToday = new Date().toDateString() === dayInfo.fullDate.toDateString();
          const dayEvents = events.filter(e => new Date(e.date).toDateString() === dayInfo.fullDate.toDateString());
          return (
            <div key={index} className={`relative flex flex-col h-28 sm:h-32 p-1.5 border border-gray-800 rounded-md transition-colors ${dayInfo.isCurrentMonth ? 'bg-[#0f0f0f]' : 'bg-black/40'}`}>
              <span className={`flex items-center justify-center h-7 w-7 text-sm rounded-full ${isToday ? 'bg-[#009624] text-white font-bold' : ''} ${!dayInfo.isCurrentMonth ? 'text-gray-500' : ''}`}>{dayInfo.day}</span>
              <div className="mt-1 space-y-1 overflow-y-auto text-left text-xs flex-grow">
                {dayEvents.map(event => (
                  <div key={event.id} className="p-1 rounded-md bg-[#0a2b14] text-[#7CFF9E]">
                    <p className="font-semibold truncate">{event.title}</p>
                    {userRole === 'user' && (
                       <button onClick={() => onEventRegisterToggle(event.id)} className={`w-full text-center mt-1 text-white py-0.5 rounded text-[11px] ${event.registered ? 'bg-red-500 hover:bg-red-600' : 'bg-[#009624] hover:bg-[#007E33]'}`}>{event.registered ? 'Baja' : 'Anotarse'}</button>
                    )}
                  </div>
                ))}
              </div>
              {userRole === 'admin' && dayInfo.isCurrentMonth && (
                 <button onClick={() => handleCreateEvent(dayInfo.fullDate)} className="absolute bottom-1 right-1 h-6 w-6 bg-[#009624] hover:bg-[#007E33] text-white rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity" title="Crear evento en esta fecha">+</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunctionalCalendar;