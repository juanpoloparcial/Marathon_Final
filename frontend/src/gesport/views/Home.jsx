import React, { useState, useEffect } from "react";
import FunctionalCalendar from "../components/FunctionalCalendar";
import EventFormModal from "../components/home/EventFormModal";
import EventDetailModal from "../components/home/EventDetailModal";
import EventListItem from "../components/home/EventListItem";
import { CalendarCheck2, ClipboardList } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-20">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
  </div>
);
const ErrorMessage = ({ message }) => (
  <div className="text-center p-10 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
    {message}
  </div>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventToEdit, setEventToEdit] = useState(null);
  const USER_ROLE = "admin";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 1) Intentar cargar desde localStorage primero (si estamos en el cliente)
        if (typeof window !== 'undefined') {
          const stored = window.localStorage.getItem('marathon_events');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              setEvents(parsed);
              setLoading(false);
              return; // Evita el mock si hay datos persistidos
            }
          }
        }

        // 2) Fallback: simular carga remota (mock)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockEvents = [
          { id: 1, date: "2025-09-10", title: "Triatlón", type: "Triatlón", location: "Estadio Central", participants: 2, requirements: "Ranking ATP.", registered: false, imageUrl: null },
          { id: 2, date: "2025-09-21", title: "Maratón", type: "Maratón", location: "Centro Urbano", participants: 5000, requirements: "Certificado de buena salud.\nSer mayor de 18", registered: true, imageUrl: null },
        ];
        setEvents(mockEvents);
      } catch (err) {
        setError("No se pudieron cargar los eventos.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Persistir cambios en localStorage sin alterar estilos ni UX
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('marathon_events', JSON.stringify(events));
      }
    } catch (e) {
      // Silencioso: si localStorage falla, no rompemos la UI
    }
  }, [events]);

  const handleFormSubmit = async (formData, eventId) => {
    try {
      let imageUrl = eventToEdit ? eventToEdit.imageUrl : null;
      if (formData.image) { imageUrl = URL.createObjectURL(formData.image); }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (eventId) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, ...formData, imageUrl: imageUrl, title: `${formData.type} en ${formData.location}` } : event
          )
        );
      } else {
        const newEvent = { id: Date.now(), title: `${formData.type} en ${formData.location}`, registered: false, ...formData, imageUrl: imageUrl };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }
      handleCloseFormModal();
    } catch (err) {
      alert("Error al guardar el evento.");
      console.error("Error submitting event:", err);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEventForDetail(null);
    setEventToEdit(event);
    setIsFormModalOpen(true);
  };

  const handleOpenModalForDate = (date) => {
    setEventToEdit(null);
    setSelectedDate(date);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedDate(null);
    setEventToEdit(null);
  };

  const handleEventRegisterToggle = (eventId) => {
    // Alterna el flag 'registered' del evento sin cambiar estilos
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId ? { ...ev, registered: !ev.registered } : ev
      )
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Bienvenido, aquí puedes gestionar y ver los eventos.
          </p>
        </div>
      </header>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center mb-4 space-x-2 gap-1">
              <CalendarCheck2 size={34} className="text-gray-900 dark:text-white"/>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Calendario
              </h2>
            </div>
            <FunctionalCalendar
              events={events}
              onEventRegisterToggle={handleEventRegisterToggle}
              userRole={USER_ROLE}
              onAddEventClick={handleOpenModalForDate}
            />
          </div>
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center mb-4 space-x-2">
              <ClipboardList size={34} className="text-gray-900 dark:text-white" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                Lista de Eventos
              </h2>
            </div>

            <div className="bg-black text-white rounded-xl shadow-lg flex-1 overflow-hidden border border-gray-800">
              <div className="h-full overflow-y-auto p-4 space-y-2 hide-scrollbar">
                {events.length > 0 ? (
                  events
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => (
                      <EventListItem
                        key={event.id}
                        event={event}
                        onClick={setSelectedEventForDetail}
                      />
                    ))
                ) : (
                  // Si no hay eventos, el botón de añadir sigue apareciendo
                  !loading && <p className="text-center text-gray-400 py-4">No hay eventos cargados.</p>
                )}

                {USER_ROLE === "admin" && (
                  <button
                    onClick={() => {
                      setEventToEdit(null);
                      setIsFormModalOpen(true);
                    }}
                    className="group w-full p-4 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg hover:border-[#00B248] hover:bg-[#0f0f0f] transition-colors"
                  >
                    <PlusIcon />
                    <span className="ml-2 font-semibold text-gray-400 group-hover:text-[#00B248] transition-colors"> Nuevo Evento
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleFormSubmit}
        selectedDate={selectedDate}
        eventToEdit={eventToEdit}
      />
      <EventDetailModal
        isOpen={selectedEventForDetail !== null}
        onClose={() => setSelectedEventForDetail(null)}
        event={selectedEventForDetail}
        onEditClick={handleEditClick}
        userRole={USER_ROLE}
      />
    </main>
  );
};

export default Home;