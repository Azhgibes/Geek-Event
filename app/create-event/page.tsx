export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-14">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-2 text-5xl font-bold text-white">
          Создание фестиваля
        </h1>

        <p className="mb-10 text-zinc-400">
          Заполните информацию о вашем мероприятии.
        </p>

        <div className="grid gap-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <input
            placeholder="Название фестиваля"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            placeholder="Город"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            type="date"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <textarea
            rows={6}
            placeholder="Описание фестиваля"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            placeholder="Ссылка на постер или изображение"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" />
              Cosplay
            </label>

            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" />
              Anime
            </label>

            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" />
              K-POP
            </label>

            <label className="flex items-center gap-2 text-white">
              <input type="checkbox" />
              Games
            </label>

          </div>

          <button className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 py-4 text-lg font-bold text-white hover:opacity-90">
            Создать фестиваль
          </button>

        </div>

      </div>
    </main>
  );
}