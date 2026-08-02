import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/events/Countdown";
import { events } from "@/data/events";

export default function FeaturedEvent() {
  const featuredEvent = events.find((event) => event.featured);

  if (!featuredEvent) return null;

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-violet-500" />
        <h2 className="text-3xl font-bold text-white">
          🔥 Главное событие
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-violet-500/10">
        <div className="grid lg:grid-cols-2">

          <div className="relative aspect-[16/10]">
            <Image
              src={featuredEvent.image}
              alt={featuredEvent.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/70" />
          </div>

          <div className="flex flex-col justify-center p-10">

            <span
              className={`mb-4 w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                featuredEvent.registration
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {featuredEvent.registration
                ? "Регистрация открыта"
                : "Регистрация закрыта"}
            </span>

            <h2 className="text-5xl font-extrabold text-white">
              {featuredEvent.title}
            </h2>

            <p className="mt-5 text-lg leading-8 text-zinc-300">
              {featuredEvent.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-zinc-300">
              <span>📍 {featuredEvent.city}</span>
              <span>👥 {featuredEvent.participants}</span>
              <span>⭐ {featuredEvent.rating}</span>
            </div>

            <div className="mt-8">
              <Countdown targetDate={featuredEvent.dateISO} />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href={`/events/${featuredEvent.slug}`}
                className="rounded-xl bg-violet-600 px-8 py-4 font-semibold text-white transition hover:bg-violet-500"
              >
                Подробнее
              </Link>

              <button className="rounded-xl border border-zinc-700 px-8 py-4 text-white transition hover:border-violet-500 hover:bg-violet-500/10">
                Подать заявку
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}