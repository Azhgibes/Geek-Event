import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { events } from "@/data/events";

interface RegisterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const dvizhNominations = [
  {
    id: "defile-west",
    title: "Одиночное дефиле — запад",
    description: "Одиночное косплей-дефиле по западным фандомам.",
  },
  {
    id: "defile-east",
    title: "Одиночное дефиле — восток",
    description: "Одиночное косплей-дефиле по аниме, манге и восточным фандомам.",
  },
  {
    id: "team-defile",
    title: "Командное дефиле",
    description: "Косплей-дефиле для команд.",
  },
  {
    id: "geek-show",
    title: "Гик-шоу",
    description: "Яркие творческие номера и выступления.",
  },
  {
    id: "stage-cosplay",
    title: "Сценический косплей",
    description: "Полноценные сценические косплей-постановки.",
  },
  {
    id: "kpop-solo",
    title: "K-POP SOLO",
    description: "Сольное K-POP выступление.",
  },
  {
    id: "kpop-crew",
    title: "K-POP CREW",
    description: "Выступление K-POP команды.",
  },
  {
    id: "kpop-team",
    title: "K-POP TEAM",
    description: "Командный K-POP конкурс.",
  },
  {
    id: "stands",
    title: "Конкурс стендов",
    description: "Участие с тематическим стендом на фестивале.",
  },
  {
    id: "saber-fight",
    title: "Саберфайтинг",
    description: "Соревнования по световым мечам.",
  },
  {
    id: "geek-vocal",
    title: "Гик-вокал",
    description: "Вокальный конкурс для представителей гик-культуры.",
  },
  {
    id: "dvizh-dance",
    title: "DVIZH-DANCE",
    description: "Танцевальный конкурс.",
  },
];

export default async function RegisterPage({
  params,
}: RegisterPageProps) {
  const { slug } = await params;

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  if (!event.registration) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/events/${slug}`}
            className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Назад к фестивалю
          </Link>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h1 className="text-3xl font-bold text-white">
              Регистрация закрыта
            </h1>

            <p className="mt-4 text-zinc-400">
              Сейчас подача заявок на это мероприятие недоступна.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href={`/events/${slug}`}
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Назад к фестивалю
        </Link>

        <div className="mb-10">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-400">
            Регистрация участника
          </div>

          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {event.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Выберите номинацию, в которой хотите принять участие.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {dvizhNominations.map((nomination) => (
            <Link
              key={nomination.id}
              href={`/events/${slug}/register/${nomination.id}`}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div className="mb-5 flex items-start justify-between gap-4">

                <div className="flex h-12 w-12


ink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                  <CheckCircle2 size={24} />
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                  Регистрация открыта
                </span>

              </div>

              <h2 className="text-xl font-bold text-white transition group-hover:text-violet-300">
                {nomination.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {nomination.description}
              </p>

              <div className="mt-6 font-semibold text-violet-400">
                Выбрать номинацию →
              </div>
            </Link>
          ))}

        </div>

      </div>
    </main>
  );
} 