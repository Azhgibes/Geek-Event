import EventCard from "./EventCard";

const events = [
  {
    title: "DVIZH-FEST 5",
    city: "Омск",
    date: "8 ноября 2026",
    image: "/posters/dvizhfest.webp",
    slug: "dvizh-fest-5",
    categories: ["Cosplay", "Anime", "K-POP"],
    participants: 350,
    rating: 5.0,
  },
  {
    title: "AniCon Siberia",
    city: "Новосибирск",
    date: "15 ноября 2026",
    image: "/posters/anicon.webp",
    slug: "anicon-siberia",
    categories: ["Anime"],
    participants: 1200,
    rating: 4.9,
  },
  {
    title: "Hinode",
    city: "Москва",
    date: "28 ноября 2026",
    image: "/posters/hinode.webp",
    slug: "hinode",
    categories: ["Japan", "Cosplay"],
    participants: 5000,
    rating: 5.0,
  },
  {
    title: "K-POP FEST",
    city: "Тюмень",
    date: "5 декабря 2026",
    image: "/posters/kpopfest.webp",
    slug: "kpop-fest",
    categories: ["Dance", "K-POP"],
    participants: 900,
    rating: 4.8,
  },
];

export default function EventSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="mb-12 flex items-center justify-between">
        <div>
          <p className="text-violet-400">МЕРОПРИЯТИЯ</p>

          <h2 className="mt-2 text-5xl font-black text-white">
            Популярные мероприятия
          </h2>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>

    </section>
  );
}