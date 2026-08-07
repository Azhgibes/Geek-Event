import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import EventCatalog from "@/components/catalog/EventCatalog";

import { events } from "@/data/events";

export default function EventsPage() {
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

        <EventCatalog events={events} />

      </section>

      <Footer />

    </main>
  );
}