"use client";

import { Search } from "lucide-react";

interface EventSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EventSearch({
  value,
  onChange,
}: EventSearchProps) {
  return (
    <div className="relative mb-8">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        size={20}
      />

      <input
        type="text"
        placeholder="Поиск мероприятий..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 text-white outline-none transition focus:border-violet-500"
      />

    </div>
  );
}