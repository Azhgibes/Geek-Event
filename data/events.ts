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

    address:
      "г. Омск, проспект Мира, 58",

    organizer:
      "Azhgibes Production",

    status:
      "registration",

    date:
      "8 ноября 2026",

    dateISO:
      "2026-11-08",

    image:
      "/posters/dvizhfest5.jpg",

    featured:
      true,

    categories: [
      "Cosplay",
      "K-POP",
      "Anime",
      "Geek",
    ],

    participants:
      342,

    rating:
      4.9,

    registration:
      true,

    description:
      "DVIZH-FEST — крупнейший фестиваль гик-культуры Омска с косплеем, K-POP, конкурсной программой, лекциями, играми и маркетом.",

    nominations: [
      {
        id: "defile-west",

        title:
          "Одиночное дефиле — запад",

        description:
          "Одиночное косплей-дефиле по западным фандомам.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "defile-east",

        title:
          "Одиночное дефиле — восток",

        description:
          "Одиночное косплей-дефиле по аниме, манге и восточным фандомам.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "team-defile",

        title:
          "Командное дефиле",

        description:
          "Косплей-дефиле для команд.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "geek-show",

        title:
          "Гик-шоу",

        description:
          "Яркие творческие номера и выступления.",

        type:
          "Show",

        registration:
          true,
      },

      {
        id: "stage-cosplay",

        title:
          "Сценический косплей",

        description:
          "Полноценные сценические косплей-постановки.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "kpop-solo",

        title:
          "K-POP SOLO",

        description:
          "Сольное K-POP выступление.",

        type:
          "K-POP",

        registration:
          true,
      },

      {
        id: "kpop-crew",

        title:
          "K-POP CREW",

        description:
          "Выступление K-POP команды.",

        type:
          "K-POP",

        registration:
          true,
      },

      {
        id: "kpop-team",

        title:
          "K-POP TEAM",

        description:
          "Командный K-POP конкурс.",

        type:
          "K-POP",

        registration:
          true,
      },

      {
        id: "stands",

        title:
          "Конкурс стендов",

        description:
          "Участие с тематическим стендом на фестивале.",

        type:
          "Geek",

        registration:
          true,
      },

      {
        id: "saber-fight",

        title:
          "Саберфайтинг",

        description:
          "Соревнования по световым мечам.",

        type:
          "Sport",

        registration:
          true,
      },

      {
        id: "geek-vocal",

        title:
          "Гик-вокал",

        description:
          "Вокальный конкурс для представителей гик-культуры.",

        type:
          "Music",

        registration:
          true,
      },

      {
        id: "dvizh-dance",

        title:
          "DVIZH-DANCE",

        description:
          "Танцевальный конкурс.",

        type:
          "Dance",

        registration:
          true,
      },
    ],
  },

  {
    slug: "anicon-siberia",

    title:
      "AniCon Siberia",

    city:
      "Новосибирск",

    date:
      "15 ноября 2026",

    dateISO:
      "2026-11-15",

    image:
      "/posters/anicon.jpg",

    featured:
      true,

    categories: [
      "Anime",
    ],

    participants:
      234,

    rating:
      4.8,

    registration:
      true,

    description:
      "AniCon Siberia — фестиваль аниме, манги и японской культуры.",

    nominations: [
      {
        id: "anicon-cosplay",

        title:
          "Косплей",

        description:
          "Косплей-конкурс AniCon Siberia.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "anicon-stage",

        title:
          "Сценическое выступление",

        description:
          "Творческие сценические выступления.",

        type:
          "Show",

        registration:
          true,
      },
    ],
  },

  {
    slug: "hinode",

    title:
      "Hinode",

    city:
      "Москва",

    date:
      "28 ноября 2026",

    dateISO:
      "2026-11-28",

    image:
      "/posters/hinode.jpg",

    featured:
      true,

    categories: [
      "Japan",
      "Cosplay",
    ],

    participants:
      156,

    rating:
      3.9,

    registration:
      true,

    description:
      "Один из крупнейших фестивалей японской культуры России.",

    nominations: [
      {
        id: "hinode-cosplay",

        title:
          "Cosplay",

        description:
          "Косплей-конкурс фестиваля Hinode.",

        type:
          "Cosplay",

        registration:
          true,
      },

      {
        id: "hinode-dance",

        title:
          "Dance",

        description:
          "Танцевальный конкурс.",

        type:
          "Dance",

        registration:
          true,
      },
    ],
  },

  {
    slug: "k-pop-fest",

    title:
      "K-POP FEST",

    city:
      "Тюмень",

    date:
      "5 декабря 2026",

    dateISO:
      "2026-12-05",

    image:
      "/posters/kpopfest.jpg",

    featured:
      true,

    categories: [
      "K-POP",
    ],

    participants:
      198,

    rating:
      4.7,

    registration:
      true,

    description:
      "Фестиваль современной корейской культуры.",

    nominations: [
      {
        id: "kpop-solo",

        title:
          "K-POP SOLO",

        description:
          "Сольное K-POP выступление.",

        type:
          "K-POP",

        registration:
          true,
      },

      {
        id: "kpop-team",

        title:
          "K-POP TEAM",

        description:
          "Командное K-POP выступление.",

        type:
          "K-POP",

        registration:
          true,
      },
    ],
  },
];