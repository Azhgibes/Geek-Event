"use client";

import {
  Home,
  FileText,
  Trophy,
  Calendar,
  Map,
  Users,
  Handshake,
  HelpCircle,
} from "lucide-react";

const menu = [
  { icon: Home, label: "О фестивале" },
  { icon: FileText, label: "Подать заявку" },
  { icon: Trophy, label: "Номинации" },
  { icon: Calendar, label: "Расписание" },
  { icon: Map, label: "Карта фестиваля" },
  { icon: Users, label: "Жюри" },
  { icon: Handshake, label: "Партнёры" },
  { icon: HelpCircle, label: "FAQ" },
];

export default function EventSidebar() {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <h3 className="mb-4 text-lg font-bold text-white">
        Меню фестиваля
      </h3>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-300 transition hover:bg-violet-600 hover:text-white"
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}