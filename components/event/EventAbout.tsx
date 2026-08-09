import {
  CalendarDays,
  MapPin,
  Users,
  Trophy,
} from "lucide-react";

interface EventAboutProps {
  description: string;
  city: string;
  date: string;
  participants: number;
  nominations: number;
}

export default function EventAbout({
  description,
  city,
  date,
  participants,
  nominations,
}: EventAboutProps) {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >

      {/* Заголовок и описание */}
      <div className="mb-8 sm:mb-10">

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          О фестивале
        </h2>

        <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
          {description}
        </p>

      </div>

      {/* Информация */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">

        {/* Город */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          <MapPin
            size={22}
            className="mb-4 text-violet-400"
          />

          <p className="text-sm text-zinc-500">
            Город
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            {city}
          </h3>

        </div>

        {/* Дата */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          <CalendarDays
            size={22}
            className="mb-4 text-violet-400"
          />

          <p className="text-sm text-zinc-500">
            Дата
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            {date}
          </h3>

        </div>

        {/* Участники */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          <Users
            size={22}
            className="mb-4 text-violet-400"
          />

          <p className="text-sm text-zinc-500">
            Участников
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            {participants}
          </h3>

        </div>

        {/* Номинации */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

          <Trophy
            size={22}
            className="mb-4 text-violet-400"
          />

          <p className="text-sm text-zinc-500">
            Номинаций
          </p>

          <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            {nominations}
          </h3>

        </div>

      </div>

    </section>
  );
}


