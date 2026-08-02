import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">

          <h1 className="mb-2 text-center text-3xl font-bold">
            Вход
          </h1>

          <p className="mb-8 text-center text-zinc-400">
            Добро пожаловать в Geek Event
          </p>

          <form className="space-y-5">

            <div>
              <label className="mb-2 block text-sm">
                Email
              </label>

              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Пароль
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition focus:border-violet-500"
              />
            </div>

            <button
              className="w-full rounded-xl bg-violet-600 py-3 font-semibold transition hover:bg-violet-500"
            >
              Войти
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Нет аккаунта?{" "}
            <span className="cursor-pointer text-violet-400 hover:text-violet-300">
              Зарегистрироваться
            </span>
          </p>

        </div>
      </section>

      <Footer />
    </main>
  );
}