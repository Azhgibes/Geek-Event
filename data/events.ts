import { Event } from "@/types/event";

export const events: Event[] = [
  {
    slug: "dvizh-fest-5",
    title: "DVIZH-FEST 5",

    shortDescription:
      "Крупнейший фестиваль гик-культуры Омска.",

    heroText:
      "Cosplay • K-POP • Anime • Games • Comics • Geek Show",

    city: "Омск",
    venue: "ДК им. Малунцева",
    address: "г. Омск, проспект Мира, 58",
    organizer: "DVIZH Team",

    status: "registration",

    date: "8 ноября 2026",
    dateISO: "2026-11-08",

    image: "/posters/dvizhfest5.jpg",

    featured: true,

    categories: [
      "Cosplay",
      "K-POP",
      "Anime",
      "Games",
      "Geek",
    ],

    participants: 342,
    rating: 4.9,

    registration: true,

    description:
      "DVIZH-FEST 5 — большой фестиваль гик-культуры Омска. Косплей, K-POP, конкурсная программа, лекции, игры, маркет и специальные активности для участников и гостей.",

    nominations: [
      {
        id: "cosplay-west",
        title: "Одиночное дефиле — запад",
        type: "cosplay",
        description:
          "Одиночное дефиле по западным вселенным.",
        registration: true,
      },

      {
        id: "cosplay-east",
        title: "Одиночное дефиле — восток",
        type: "cosplay",
        description:
          "Одиночное дефиле по восточным вселенным.",
        registration: true,
      },

      {
        id: "cosplay-team",
        title: "Командное дефиле",
        type: "cosplay",
        description:
          "Командное дефиле для участников в составе группы.",
        registration: true,
      },

      {
        id: "geek-show",
        title: "Гик-шоу",
        type: "show",
        description:
          "Творческие номера и выступления на гик-тематику.",
        registration: true,
      },

      {
        id: "stage-cosplay",
        title: "Сценический косплей",
        type: "cosplay",
        description:
          "Сценические косплей-постановки.",
        registration: true,
      },

      {
        id: "kpop-solo",
        title: "K-POP SOLO",
        type: "kpop",
        description:
          "Сольное выступление в направлении K-POP.",
        registration: true,
      },

      {
        id: "kpop-crew",
        title: "K-POP CREW",
        type: "kpop",
        description:
          "Командное выступление в направлении K-POP.",
        registration: true,
      },

      {
        id: "kpop-team",
        title: "K-POP TEAM",
        type: "kpop",
        description:
          "Командный конкурс K-POP.",
        registration: true,
      },

      {
        id: "stands",
        title: "Конкурс стендов",
        type: "custom",
        description:
          "Конкурс тематических стендов участников фестиваля.",
        registration: true,
      },

      {
        id: "saber-fighting",
        title: "Саберфайтинг",
        type: "custom",
        description:
          "Соревнование по саберфайтингу.",
        registration: true,
      },

      {
        id: "geek-vocal",
        title: "Гик-вокал",
        type: "vocal",
        description:
          "Вокальный конкурс на гик-тематику.",
        registration: true,
      },

      {
        id: "dvizh-dance",
        title: "DVIZH-DANCE",
        type: "dance",
        description:
          "Танцевальный конкурс фестиваля.",
        registration: true,
      },
    ],
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

    nominations: [],
  },

  {
    slug: "hinode",
    title: "Hinode",

    city: "Москва",

    date: "28 ноября 2026",
    dateISO: "2026-11-28",

    image: "/posters/hinode.jpg",

    featured: true,

    categories: [
      "Japan",
      "Cosplay",
    ],

    participants: 156,
    rating: 3.9,

    registration: true,

    description:


"Один из крупнейших фестивалей японской культуры России.",

    nominations: [],
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

    nominations: [],
  },
];