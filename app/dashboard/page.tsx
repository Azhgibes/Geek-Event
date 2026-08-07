import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-14">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold text-white">
              Кабинет организатора
            </h1>

            <p className="mt-3 text-zinc-400">
              Управляйте своими фестивалями и мероприятиями.
            </p>
          </div>

          <Link
            href="/create-event"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-4 text-lg font-bold text-white transition hover:opacity-90"
          >
            ➕ Создать мероприятие
          </Link>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-zinc-400">Мероприятий</p>

            <h2 className="mt-4 text-5xl font-bold text-white">
              1
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-zinc-400">Заявок</p>

            <h2 className="mt-4 text-5xl font-bold text-white">
              0
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-zinc-400">Просмотров</p>

            <h2 className="mt-4 text-5xl font-bold text-white">
              0
            </h2>
          </div>

        </div>

        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <h2 className="mb-6 text-3xl font-bold text-white">
            Мои мероприятия
          </h2>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-2xl font-bold text-white">
                  DVIZH-FEST 5
                </h3>

                <p className="mt-2 text-zinc-400">
                  Омск • 8 ноября 2026
                </p>

              </div>

              <div className="flex gap-3">

                <button className="rounded-xl border border-zinc-700 px-5 py-3 text-white hover:bg-zinc-800">
                  Редактировать
                </button>

                <button className="rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-500">
                  Открыть
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
