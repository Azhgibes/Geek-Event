import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Star } from "lucide-react";

interface EventCardProps {
  title: string;
  city: string;
  date: string;
  image: string;
  slug: string;
  categories: string[];
  participants: number;
  rating: number;
}

export default function EventCard({
  title,
  city,
  date,
  image,
  slug,
  categories,
  participants,
  rating,
}: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(124,58,237,.35)]"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <h3 className="text-xl font-bold text-white">{title}</h3>

        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin size={16} />
          {city}
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar size={16} />
          {date}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <span
              key={item}
              className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-zinc-300">
            <Users size={16} />
            {participants}
          </div>

          <div className="flex items-center gap-2 text-yellow-400">
            <Star size={16} fill="currentColor" />
            {rating}
          </div>
        </div>
      </div>
    </Link>
  );
}


