import Link from "next/link";
import Countdown from "./Countdown";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  Users,
  Star,
} from "lucide-react";

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
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20">

      {/* Постер */}
      <div className="relative aspect-[2/3] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Статус регистрации */}
        <div className="absolute left-3 top-3 right-3">

          <span
            className={`inline-flex max-w-full rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg ${
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

      {/* Информация */}
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">

        {/* Название */}
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white sm:text-xl">
          {title}
        </h3>

        {/* Город */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin
            size={16}
            className="shrink-0 text-violet-400"
          />

          <span className="truncate">
            {city}
          </span>
        </div>

        {/* Обратный отсчёт */}
        <Countdown targetDate={dateISO} />

        {/* Дата */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <CalendarDays
            size={16}
            className="shrink-0 text-violet-400"
          />

          <span>
            {date}
          </span>
        </div>

        {/* Категории */}
        <div className="flex flex-wrap gap-1.5">

          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-violet-600/20 px-2.5 py-1 text-[11px] text-violet-300 sm:px-3 sm:text-xs"
            >
              {category}
            </span>
          ))}

        </div>

        {/* Статистика */}
        <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-sm sm:pt-4">

          <div className="flex items-center gap-2 text-zinc-300">
            <Users
              size={16}
              className="shrink-0"
            />

            <span>
              {participants}
            </span>
          </div>

          <div className="flex items-center gap-2 text-yellow-400">
            <Star
              size={16}
              fill="currentColor"
            />

            <span>
              {rating}
            </span>
          </div>

        </div>

        {/* Кнопка */}
        <Link
          href={`/events/${slug}`}
          className="block w-full rounded-xl bg-violet-600 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-violet-500 sm:text-base"
        >
          Подробнее
        </Link>

      </div>

    </article>
  );
}


