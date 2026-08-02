import EventNavigation from "@/components/event/EventNavigation";


import { CalendarDays, MapPin, Users, Trophy } from "lucide-react";

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
      className="mx-auto max-w-7xl px-6 py-16 scroll-mt-24"
    >
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white">
          О фестивале
        </h2>

        <p className="mt-4 max-w-4xl text-lg leading-8 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <MapPin className="mb-4 text-violet-400" />
          <p className="text-sm text-zinc-500">Город</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {city}
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <CalendarDays className="mb-4 text-violet-400" />
          <p className="text-sm text-zinc-500">Дата</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {date}
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <Users className="mb-4 text-violet-400" />
          <p className="text-sm text-zinc-500">Участников</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {participants}
          </h3>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <Trophy className="mb-4 text-violet-400" />
          <p className="text-sm text-zinc-500">Номинаций</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {nominations}
          </h3>
        </div>

      </div>
    </section>
  );
}