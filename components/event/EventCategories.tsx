import { Trophy } from "lucide-react";

import { EventNomination } from "@/types/event";

interface EventCategoriesProps {
  nominations: EventNomination[];
}

export default function EventCategories({
  nominations,
}: EventCategoriesProps) {
  return (
    <section
      id="nominations"
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Номинации
        </h2>

        <p className="mt-3 text-zinc-400">
          Выберите номинацию, чтобы ознакомиться с условиями
          участия.
        </p>
      </div>

      {nominations.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <Trophy
            size={32}
            className="mx-auto mb-4 text-violet-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Номинации пока не добавлены
          </h3>

          <p className="mt-2 text-zinc-400">
            Организатор ещё не добавил номинации этого мероприятия.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nominations.map((nomination) => (
            <div
              key={nomination.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-violet-500 hover:bg-zinc-900/80"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
                <Trophy
                  size={24}
                  className="text-violet-400"
                />
              </div>

              <h3 className="text-xl font-bold text-white">
                {nomination.title}
              </h3>

              {nomination.description && (
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {nomination.description}
                </p>
              )}

              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs font-medium text-violet-300">
                  {nomination.type}
                </span>

                {nomination.registration ? (
                  <span className="text-xs font-medium text-green-400">
                    Регистрация открыта
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-400">
                    Регистрация закрыта
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}