import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
        <h3 className="mb-3 text-2xl font-bold text-white">
          Ничего не найдено
        </h3>

        <p className="text-zinc-400">
          Попробуйте изменить поисковый запрос.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {events.map((event) => (
        <EventCard
          key={event.slug}
          {...event}
        />
      ))}
    </div>
  );
}