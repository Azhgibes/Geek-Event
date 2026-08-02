import Link from "next/link";
import Countdown from "./Countdown";
import Image from "next/image";
import { MapPin, CalendarDays, Users, Star } from "lucide-react";

interface EventCardProps {
  slug: string;
  title: string;
  city: string;
  date: string;
  dateISO: string;
  image: string;
  categories: string[];
  participants: number;
  rating: number;
  registration: boolean;
}

export default function EventCard({
  slug,
  title,
  city,
  date,
  dateISO,
  image,
  categories,
  participants,
  rating,
  registration,
}: EventCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20">

      <div className="relative aspect-[2/3] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              registration
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {registration
              ? "Регистрация открыта"
              : "Регистрация закрыта"}
          </span>
        </div>

      </div>

      <div className="space-y-4 p-5">

        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin size={16} />
          {city}
        </div>

        <Countdown targetDate={dateISO} />

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <CalendarDays size={16} />
          {date}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-300"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-sm">

          <div className="flex items-center gap-2 text-zinc-300">
            <Users size={16} />
            {participants}
          </div>

          <div className="flex items-center gap-2 text-yellow-400">
            <Star size={16} fill="currentColor" />
            {rating}
          </div>

        </div>

        <Link
          href={`/events/${slug}`}
          className="block w-full rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-500"
        >
          Подробнее
        </Link>

      </div>

    </div>
  );
}