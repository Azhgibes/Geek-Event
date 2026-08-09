import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Trophy } from "lucide-react";

import { events } from "@/data/events";

interface RegisterPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    nomination?: string;
  }>;
}

export default async function RegisterPage({
  params,
  searchParams,
}: RegisterPageProps) {
  const { slug } = await params;
  const { nomination: nominationId } = await searchParams;

  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  if (!event.registration) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/events/${slug}`}
            className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Назад к фестивалю
          </Link>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h1 className="text-3xl font-bold">
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

  /*
   * Если номинация НЕ выбрана,
   * показываем список номинаций.
   */
  if (!nominationId) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

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

            <h1 className="text-4xl font-bold sm:text-5xl">
              {event.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              Выберите номинацию, в которой хотите принять участие.
            </p>
          </div>

          {event.nominations.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
              <Trophy
                size={40}
                className="mx-auto mb-4 text-violet-400"
              />

              <h2 className="text-2xl font-bold">
                Номинации пока не добавлены
              </h2>

              <p className="mt-3 text-zinc-400">
                Организатор ещё не добавил номинации для этого мероприятия.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {event.nominations.map((nomination) => (
                <Link
                  key={nomination.id}
                  href={`/events/${slug}/register?nomination=${nomination.id}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-violet-500/10"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                      <CheckCircle2 size={24} />
                    </div>

                    {nomination.registration && (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        Регистрация открыта
                      </span>
                    )}

                  </div>

                  <h2 className="text-xl font-bold transition group-hover:text-violet-300">
                    {nomination.title}
                  </h2>

                  {nomination.description && (
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {nomination.description}
                    </p>
                  )}

                  <div className="mt-6 font-semibold text-violet-400">
                    Подать заявку →
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>
    );
  }

  /*
   * Ищем выбранную номинацию.
   */
  const nomination = event.nominations.find(
    (item) => item.id === nominationId
  );

  if (!nomination) {
    notFound();
  }

  /*
   * Если регистрация именно на эту номинацию закрыта.
   */
  if (!nomination.registration) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          <Link
            href={`/events/${slug}/register`}
            className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            К номинациям
          </Link>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h1 className="text-3xl font-bold">
              Регистрация закрыта
            </h1>

            <p className="mt-4 text-zinc-400">
              Подача заявок на номинацию «{nomination.title}» сейчас закрыта.
            </p>
          </div>

        </div>
      </main>
    );
  }

  /*
   * ФОРМА ЗАЯВКИ
   */
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        <Link
          href={`/events/${slug}/register`}
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          К номинациям
        </Link>

        <div className="mb-10">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-400">
            Подача заявки
          </div>

          <h1 className="text-4xl font-bold sm:text-5xl">
            {nomination.title}
          </h1>

          {nomination.description && (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
              {nomination.description}
            </p>
          )}
        </div>

        <form className="space-y-6">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Данные участника
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Имя и фамилия
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Введите имя и фамилию"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Никнейм
                </label>

                <input
                  type="text"
                  name="nickname"
                  placeholder="Ваш никнейм"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.ru"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Телефон
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+7"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
                />
              </div>

            </div>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Информация об участии
            </h2>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Ссылка на профиль / соцсеть
              </label>

              <input
                type="url"
                name="social"
                placeholder="https://vk.com/..."
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Комментарий
              </label>

              <textarea
                name="comment"
                rows={5}
                placeholder="Дополнительная информация для организатора..."
                className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>

          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 text-sm text-zinc-400">
            <p>
              Вы подаёте заявку на мероприятие{" "}
              <span className="font-semibold text-white">
                {event.title}
              </span>{" "}
              в номинацию{" "}
              <span className="font-semibold text-violet-300">
                {nomination.title}
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-violet-500"
          >
            Подать заявку
          </button>

        </form>

      </div>
    </main>
  );
}