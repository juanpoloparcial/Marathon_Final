const EventListItem = ({ event, onClick }) => {
  return (
    <div onClick={() => onClick(event)} className="p-4 flex items-center border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-[#0f0f0f] transition-colors duration-200">
      <div className="flex-shrink-0 mr-4">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="h-14 w-14 rounded-full object-cover"/>
        ) : (
          <div className="h-14 w-14 rounded-full bg-[#0f0f0f] border border-gray-800 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-300">{event.type.charAt(0)}</span>
          </div>
        )}
      </div>
      <div>
        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 ${event.type === 'Ciclismo' ? 'bg-[#0a2b14] text-[#7CFF9E]' : event.type === 'Maratón' ? 'bg-[#2a2a0a] text-yellow-400' : 'bg-[#1f0a2b] text-purple-300'}`}>{event.type}</span>
        <h3 className="font-bold text-lg text-white">{event.title}</h3>
        <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
      </div>
    </div>
  );
};

export default EventListItem;