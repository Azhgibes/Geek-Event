import FeaturedEvent from "./FeaturedEvent";
import EventFilters from "../events/EventFilters";
import EventGrid from "../events/EventGrid";
import Stats from "./Stats";
import Categories from "./Categories";

export default function Events() {
  return (
    <section className="bg-zinc-950 py-20">

      <FeaturedEvent />
      <Stats />
      <Categories />
      
      <div className="mx-auto mt-20 max-w-7xl px-6">

        <h2 className="mb-3 text-4xl font-bold text-white">
          Ближайшие мероприятия
        </h2>

        <p className="mb-10 text-zinc-400">
          Найдите фестивали, конвенты и гик-события по всей России.
        </p>

        <EventFilters />

        <div className="mt-10">
          <EventGrid />
        </div>

      </div>

    </section>
  );
}