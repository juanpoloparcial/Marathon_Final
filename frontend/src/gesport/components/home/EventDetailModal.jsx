import { TbListDetails } from "react-icons/tb";

const CheckIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-white mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> );
const EditIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg> );

const EventDetailModal = ({ isOpen, onClose, event, onEditClick, userRole }) => {
  if (!isOpen || !event) return null;
  const requirementsList = event.requirements ? event.requirements.split(/,|\n/).filter(req => req.trim() !== '') : [];
  
  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-xs flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 p-0 rounded-lg shadow-2xl w-full max-w-lg m-4 overflow-hidden border border-gray-200 dark:border-gray-700" 
        onClick={(e) => e.stopPropagation()}
      >
        {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover"/>}
        <div className="p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2 dark:border-gray-600">
                <TbListDetails size={32} className="mb-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Detalles del Evento
                </h2>
                <button
                    onClick={onClose}
                className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl font-bold mb-2">&times;
                </button>
            </div>
            <div className="space-y-4">
                <div><h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{event.title}</h3><span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${event.type === 'Ciclismo' ? 'bg-green-100 text-green-800' : event.type === 'Maratón' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>{event.type}</span></div>
                <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha</p><p className="text-md text-gray-800 dark:text-gray-200">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p></div>
                <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Lugar</p><p className="text-md text-gray-800 dark:text-gray-200">{event.location}</p></div>
                <div><p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cupo de Participantes</p><p className="text-md text-gray-800 dark:text-gray-200">{event.participants}</p></div>
                {requirementsList.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Requisitos</p>
                    <ul className="mt-2 space-y-1">
                        {requirementsList.map((req, index) => (
                        <li key={index} className="flex items-start text-md text-gray-800 dark:text-gray-200">
                            <CheckIcon />
                            <span>{req.trim()}</span>
                        </li>
                        ))}
                    </ul>
                </div>
                )}
                <div className="flex justify-end pt-4 space-x-3">
                    {userRole === 'admin' && (
                        <button onClick={() => onEditClick(event)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center font-semibold">
                            <EditIcon /> Editar
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;