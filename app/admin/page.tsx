"use client";

import { useEffect, useState } from "react";
import { Check, X, Shield } from "lucide-react";

interface CreatedEvent {
  id: string;
  title: string;
  city: string;
  venue?: string;
  address?: string;
  date: string;
  description: string;
  status: "pending" | "published" | "rejected";
  createdAt: string;

  organizer: {
    name: string;
    email: string;
  };
}

export default function AdminPage() {

  const [events, setEvents] = useState<CreatedEvent[]>([]);
  const [checked, setChecked] = useState(false);

  const [tab, setTab] = useState<
  "pending" | "published" | "rejected"
  >("pending");

  useEffect(() => {

    const savedUser = localStorage.getItem(
      "geek-event-user"
    );

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.role !== "admin") {
      window.location.href = "/account";
      return;
    }

    setChecked(true);

    loadEvents();

  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Проверка доступа...
      </div>
    );
  }
  const filteredEvents = events.filter(
  (event) => event.status === tab
  );
  function loadEvents() {

  const savedEvents = localStorage.getItem(
    "geek-event-created"
  );

  if (!savedEvents) {
    setEvents([]);
    return;
  }

  try {

    const parsedEvents = JSON.parse(savedEvents);

    if (Array.isArray(parsedEvents)) {
      setEvents(parsedEvents);
    }

  } catch {

    setEvents([]);

  }

}

function updateStatus(
  id: string,
  status: "published" | "rejected"
) {

  const updatedEvents = events.map((event) =>
    event.id === id
      ? {
          ...event,
          status,
        }
      : event
  );

  setEvents(updatedEvents);

  localStorage.setItem(
    "geek-event-created",
    JSON.stringify(updatedEvents)
  );

}

function deleteEvent(id: string) {

  const updatedEvents = events.filter(
    (event) =>
      event.id !== id
  );

  setEvents(updatedEvents);

  localStorage.setItem(
    "geek-event-created",
    JSON.stringify(updatedEvents)
  );

}

  return (

    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">

              <Shield size={30}/>

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Админ-панель Geek Event
              </h1>

              <p className="text-zinc-400">
                Модерация мероприятий
              </p>

            </div>

          </div>

        </div>
        <div className="mb-6 flex flex-wrap gap-3">

  <button
    onClick={() => setTab("pending")}
    className="rounded-xl bg-yellow-500/20 px-5 py-3 text-yellow-400"
  >
    🟡 На рассмотрении
  </button>

  <button
    onClick={() => setTab("published")}
    className="rounded-xl bg-green-500/20 px-5 py-3 text-green-400"
  >
    🟢 Опубликованные
  </button>

  <button
    onClick={() => setTab("rejected")}
    className="rounded-xl bg-red-500/20 px-5 py-3 text-red-400"
  >
    🔴 Отклонённые
  </button>

</div>

        <div className="space-y-5">

       {filteredEvents.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">

            Новых мероприятий на рассмотрении нет

          </div>

        )}

        {filteredEvents.map((event)=>(

          <div
          key={event.id}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
          >

            <h2 className="text-2xl font-bold">
              {event.title}
            </h2>

            <p className="mt-2 text-zinc-400">
              {event.city}
            </p>

            <div className="mt-4 rounded-xl bg-zinc-950 p-4">

              <p>
                Организатор:
                <span className="ml-2 text-violet-400">
                  {event.organizer.name}
                </span>
              </p>

              <p>
                Email:
                <span className="ml-2">
                  {event.organizer.email}
                </span>
              </p>

            </div>

            <p className="mt-4 text-zinc-400">
              {event.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

  <button
    onClick={() => updateStatus(event.id, "published")}
    className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold hover:bg-green-500"
  >
    <Check size={18}/>
    Опубликовать
  </button>

  <button
    onClick={() => updateStatus(event.id, "rejected")}
    className="inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 font-semibold text-red-400 hover:bg-red-500/20"
  >
    <X size={18}/>
    Отклонить
  </button>

  <button
    onClick={() => deleteEvent(event.id)}
    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-semibold text-zinc-300 hover:bg-zinc-700"
  >
    Удалить
  </button>

</div>

          </div>

        ))}

        </div>
     </div>

    </main>

  );

}