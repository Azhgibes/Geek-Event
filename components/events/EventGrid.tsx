import EventCard from "./EventCard";
import { events } from "@/data/events";

export default function EventGrid() {
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
