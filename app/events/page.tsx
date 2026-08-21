"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import EventCatalog from "@/components/catalog/EventCatalog";
import { Event } from "@/types/event";
import { events } from "@/data/events";

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

export default function EventsPage() {

  const [userEvents, setUserEvents] = useState<CreatedEvent[]>([]);

  useEffect(() => {

    const savedEvents = localStorage.getItem(
      "geek-event-created"
    );

    if (!savedEvents) {
      return;
    }

    try {

      const parsedEvents = JSON.parse(savedEvents);

      if (Array.isArray(parsedEvents)) {

        const publishedEvents = parsedEvents.filter(
          (event: CreatedEvent) =>
            event.status === "published"
        );

        setUserEvents(publishedEvents);

      }

    } catch {

      setUserEvents([]);

    }

  }, []);

  const createdEventsForCatalog = userEvents.map((event) => ({
  slug: event.id,

  title: event.title,

  shortDescription:
    event.description,

  heroText:
    "Geek Event",

  city:
    event.city,

  venue:
    event.venue || "",

  address:
    event.address || "",

  organizer:
    event.organizer.name,

  status:
    "registration",

  date:
    event.date,

  dateISO:
    event.date,

  image:
    "/posters/default.jpg",

  featured:
    false,

  categories: [
    "Geek",
  ],

  participants:
    0,

  rating:
    0,

  registration:
    true,

  description:
    event.description,

  nominations: [],
}));

const allEvents = [
  ...events,
  ...createdEventsForCatalog,
];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <section className="border-b border-zinc-800 bg-gradient-to-b from-violet-900/20 to-zinc-950 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-extrabold">
            Все мероприятия
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Каталог фестивалей, конвентов и гик-событий России.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        <EventCatalog events={allEvents} />

      </section>

      <Footer />

    </main>
  );
}