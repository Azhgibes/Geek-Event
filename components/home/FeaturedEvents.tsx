import EventGrid from "@/components/events/EventGrid";
import SectionTitle from "@/components/design/SectionTitle";
import { events } from "@/data/events";

export default function FeaturedEvents() {
  return (
    <section className="bg-[#090A15] py-20">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          title="Популярные мероприятия"
          subtitle="Самые ожидаемые фестивали, концерты и гик-события России."
        />

        <div className="mt-12">
          <EventGrid events={events} />
        </div>

      </div>
    </section>
  );
}