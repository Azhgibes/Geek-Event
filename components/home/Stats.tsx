import { CalendarDays, Users, Trophy, MapPin } from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: "148",
    label: "Мероприятий",
  },
  {
    icon: Users,
    value: "12 458",
    label: "Участников",
  },
  {
    icon: Trophy,
    value: "327",
    label: "Организаторов",
  },
  {
    icon: MapPin,
    value: "52",
    label: "Города",
  },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                <Icon size={28} />
              </div>

              <div className="text-4xl font-extrabold text-white">
                {item.value}
              </div>

              <p className="mt-2 text-zinc-400">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}