import { notFound } from "next/navigation";

import { events } from "@/data/events";

import EventHero from "@/components/event/EventHero";
import EventLayout from "@/components/event/EventLayout";
import EventAbout from "@/components/event/EventAbout";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <EventHero
        title={event.title}
        city={event.city}
        date={event.date}
        image={event.image}
        participants={event.participants}
        rating={event.rating}
        registration={event.registration}
      />

      <EventLayout>
        <EventAbout
          description={event.description}
          city={event.city}
          date={event.date}
          participants={event.participants}
          nominations={event.nominations}
        />
      </EventLayout>
    </main>
  );
}