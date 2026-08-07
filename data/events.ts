import { Event } from "@/types/event";

export const events: Event[] = [
  {
    slug: "dvizh-fest-5",
    title: "DVIZH-FEST 5",
    shortDescription: "Крупнейший фестиваль гик-культуры Омска.",
    heroText: "Cosplay • K-POP • Anime • Games • Comics • Geek Show",

    city: "Омск",
    venue: "ДК им. Малунцева",
    address: "г. Омск, проспект Мира, 58",
    organizer: "DVIZH Team",

    status: "registration",

    date: "8 ноября 2026",
    dateISO: "2026-11-08",

    image: "/posters/dvizhfest5.jpg",

    featured: true,

    categories: ["Cosplay", "K-POP", "Anime"],

    participants: 342,

    rating: 4.9,

    registration: true,

    description:
      "DVIZH-FEST — крупнейший фестиваль гик-культуры Омска с косплеем, K-POP, конкурсной программой, лекциями, играми и маркетом.",

    nominations: 12,
  },

  {
    slug: "anicon-siberia",
    title: "AniCon Siberia",

    city: "Новосибирск",

    date: "15 ноября 2026",
    dateISO: "2026-11-15",

    image: "/posters/anicon.jpg",

    featured: true,

    categories: ["Anime"],

    participants: 234,

    rating: 4.8,

    registration: true,

    description:
      "AniCon Siberia — фестиваль аниме, манги и японской культуры.",

    nominations: 10,
  },

  {
    slug: "hinode",
    title: "Hinode",

    city: "Москва",

    date: "28 ноября 2026",
    dateISO: "2026-11-28",

    image: "/posters/hinode.jpg",

    featured: true,

    categories: ["Japan", "Cosplay"],

    participants: 156,

    rating: 3.9,

    registration: true,

    description:
      "Один из крупнейших фестивалей японской культуры России.",

    nominations: 14,
  },

  {
    slug: "k-pop-fest",
    title: "K-POP FEST",

    city: "Тюмень",

    date: "5 декабря 2026",
    dateISO: "2026-12-05",

    image: "/posters/kpopfest.jpg",

    featured: true,

    categories: ["K-POP"],

    participants: 198,

    rating: 4.7,

    registration: true,

    description:
      "Фестиваль современной корейской культуры.",

    nominations: 8,
  },
];