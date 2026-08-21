"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { events } from "@/data/events";

export default function EventPage() {

  const params = useParams();

  const slug = params.slug as string;
  console.log("PAGE SLUG:", slug);

  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
  /*
   * Сначала ищем мероприятия,
   * созданные организаторами.
   */

  const savedEvents = localStorage.getItem(
    "geek-event-created"
  );

  if (savedEvents) {
    try {
      const createdEvents =
        JSON.parse(savedEvents);

      if (Array.isArray(createdEvents)) {
        const userEvent =
          createdEvents.find(
            (item: any) =>
              (item.slug === slug ||
                item.id === slug) &&
              item.status === "published"
          );

        if (userEvent) {
          setEvent(userEvent);
          return;
        }
      }
    } catch {
      // Переходим к стандартным мероприятиям.
    }
  }

  /*
   * Если пользовательского мероприятия
   * нет — ищем стандартное.
   */

  const defaultEvent = events.find(
    (item) => item.slug === slug
  );

  if (defaultEvent) {
    setEvent(defaultEvent);
    return;
  }

  setEvent(null);
}, [slug]);

  if (!event) {

    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Загрузка...
      </main>
    );

  }

  return (

    <main className="min-h-screen bg-zinc-950 text-white">

      <Header />

      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">

  {event.image && (
    <div className="absolute inset-0">
      <img
        src={event.image}
        alt={event.title}
        className="h-full w-full object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/80 to-zinc-950" />
    </div>
  )}

  <div className="relative mx-auto max-w-6xl px-6 py-20">

    <div className="mb-6 inline-flex rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
      Регистрация открыта
    </div>

    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
      {event.title}
    </h1>

    <p className="mt-6 max-w-3xl text-xl leading-8 text-zinc-300">
      {event.heroText ||
        event.shortDescription ||
        event.description}
    </p>

    <div className="mt-8 flex flex-wrap gap-3">

      <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3">
        📍 {event.city}
      </div>

      <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3">
        📅 {event.date}
      </div>

      {event.venue && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3">
          🏛 {event.venue}
        </div>
      )}

    </div>

  </div>

</section>

      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

              <h2 className="text-3xl font-bold">
                О фестивале
              </h2>

              <p className="mt-5 leading-8 text-zinc-400">
                {event.description}
              </p>

            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

              <h2 className="text-3xl font-bold">
                Категории
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {(event.categories || ["Geek"]).map(
                  (category:string)=>(
                  
                  <span
                    key={category}
                    className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                  >
                    {category}
                  </span>

                ))}

              </div>

            </div>

          </div>

          <aside>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

              <h3 className="text-xl font-bold">
                Организатор
              </h3>

              <p className="mt-3 text-zinc-400">
                {typeof event.organizer === "string"
                  ? event.organizer
                  : event.organizer?.name}
              </p>

              <Link
                href={`/events/${slug}/register`}
                className="mt-8 block rounded-xl bg-violet-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-violet-500"
              >
                Подать заявку
              </Link>

            </div>

          </aside>

        </div>

      </section>

      <Footer />

    </main>

  );

}