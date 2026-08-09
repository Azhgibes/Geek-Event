import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import EventCategories from "@/components/event/EventCategories";
import { events } from "@/data/events";

interface RegisterPageProps {
  params: Promise<{
    slug: string;
  }>;
}


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

       <EventCategories
          slug={slug}
          nominations={event.nominations}
       />

      </div>
    </main>
  );
} 