import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center sm:p-12">
        <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl">
          Ничего не найдено
        </h3>

        <p className="text-sm text-zinc-400 sm:text-base">
          Попробуйте изменить поисковый запрос.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
      {events.map((event) => (
        <EventCard
          key={event.slug}
          {...event}
        />
      ))}
    </div>
  );
}


