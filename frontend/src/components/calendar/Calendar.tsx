"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

type EventItem = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Calendar({
  year,
  month,
}: {
  year: number;
  month: number; // 0-based
}) {
  const firstWeekday = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);
  const days = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const storageKey = `gesport-events-${year}-${month}`;
  const [events, setEvents] = useState<EventItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as EventItem[]) : [];
    } catch {
      return [];
    }
  });

  const save = (list: EventItem[]) => {
    setEvents(list);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(list));
    }
  };

  const addQuick = (date: string) => {
    const id = Math.random().toString(36).slice(2);
    const next = [...events, { id, date, title: "Nuevo evento" }];
    save(next);
  };

  const byDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return map;
  }, [events]);

  const weeks: Array<Array<number | null>> = [];
  const offset = (firstWeekday + 6) % 7; // start Monday
  let currentDay = 1;
  for (let w = 0; w < 6; w++) {
    const week: Array<number | null> = [];
    for (let d = 0; d < 7; d++) {
      const cellIndex = w * 7 + d;
      if (cellIndex < offset || currentDay > days) {
        week.push(null);
      } else {
        week.push(currentDay++);
      }
    }
    weeks.push(week);
    if (currentDay > days) break;
  }

  const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 text-xs md:text-sm text-gray-400 mb-2">
        {weekdays.map((wd) => (
          <div key={wd} className="text-center uppercase tracking-wide">
            {wd}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((day, di) => {
              if (!day) {
                return <div key={`${wi}-${di}`} className="h-24 md:h-28 rounded border border-gray-800 bg-black/30" />;
              }
              const date = `${year}-${pad(month + 1)}-${pad(day)}`;
              const items = byDate.get(date) || [];
              return (
                <motion.button
                  layout
                  key={`${wi}-${di}`}
                  onClick={() => addQuick(date)}
                  className="group h-24 md:h-28 rounded border border-gray-800 bg-black/40 hover:bg-black/60 transition-colors p-2 flex flex-col text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-semibold">{day}</span>
                    <span className="text-[#00B248] opacity-0 group-hover:opacity-100 transition-opacity text-xs">Agregar</span>
                  </div>
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {items.slice(0, 3).map((e) => (
                      <div key={e.id} className="truncate text-[10px] md:text-xs px-2 py-1 rounded bg-[#0a2b14] text-[#7CFF9E]">
                        {e.title}
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="text-[10px] text-gray-400">+{items.length - 3} más</div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Click en un día para agregar un evento rápido. Persisten localmente.</p>
    </div>
  );
}
