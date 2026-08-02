import Image from "next/image";

interface EventHeroProps {
  title: string;
  city: string;
  date: string;
  image: string;
  participants: number;
  rating: number;
  registration: boolean;
}

export default function EventHero({
  title,
  city,
  date,
  image,
  participants,
  rating,
  registration,
}: EventHeroProps) {
  return (
    <section className="relative h-[500px] overflow-hidden">

      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/60 to-black/20" />

      <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-8 pb-10">

        <span
          className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
            registration
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {registration
            ? "Регистрация открыта"
            : "Регистрация закрыта"}
        </span>

        <h1 className="mt-5 text-5xl font-extrabold text-white md:text-7xl">
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 text-lg text-zinc-200">

          <span>📍 {city}</span>

          <span>📅 {date}</span>

          <span>👥 {participants}</span>

          <span>⭐ {rating}</span>

        </div>

        <button className="mt-8 rounded-xl bg-violet-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-violet-500">
          Подать заявку
        </button>

      </div>

    </section>
  );
}