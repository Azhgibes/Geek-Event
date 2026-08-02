"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const filters = [
  "Все",
  "Cosplay",
  "K-POP",
  "Anime",
  "Games",
  "Ярмарка",
];

export default function EventFilters() {
  const [active, setActive] = useState("Все");

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Badge
          key={filter}
          onClick={() => setActive(filter)}
          className={`cursor-pointer px-4 py-2 transition ${
            active === filter
              ? "bg-violet-600 text-white"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {filter}
        </Badge>
      ))}
    </div>
  );
}