"use client";

import { useMemo, useState } from "react";

import { Event } from "@/types/event";

import EventSearch from "@/components/events/EventSearch";
import EventFilters from "@/components/events/EventFilters";
import EventGrid from "@/components/events/EventGrid";

interface Props {
  events: Event[];
}

export default function EventCatalog({ events }: Props) {
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  return (
    <>
      <EventSearch
        value={search}
        onChange={setSearch}
      />

      <EventFilters />

      <div className="mt-10">
        <EventGrid events={filteredEvents} />
      </div>
    </>
  );
}