export default function OrganizerRegisterPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

        <h1 className="text-4xl font-bold text-white mb-2">
          Регистрация организатора
        </h1>

        <p className="text-zinc-400 mb-8">
          Создайте аккаунт организатора Geek Event.
        </p>

        <div className="grid gap-5">

          <input
            placeholder="Название организации"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            placeholder="Имя организатора"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            placeholder="E-mail"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <input
            type="password"
            placeholder="Пароль"
            className="rounded-xl bg-zinc-800 p-4 text-white"
          />

          <button className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 py-4 font-semibold text-white hover:opacity-90">
            Создать аккаунт
          </button>

        </div>

      </div>
    </main>
  );
}