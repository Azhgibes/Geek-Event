"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Временное хранение для прототипа.
    // Позже заменим это на настоящую базу данных.
    const user = {
      name,
      surname,
      email,
    };

    localStorage.setItem("geek_event_user", JSON.stringify(user));

    router.push("/account");
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">

        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-violet-500/5 sm:p-10">

          {/* Иконка */}

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
            <UserPlus size={28} />
          </div>

          {/* Заголовок */}

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Создание аккаунта
          </h1>

          <p className="mt-3 text-zinc-400">
            Создайте единый аккаунт Geek Event.
            В будущем с него можно будет участвовать в мероприятиях
            и создавать собственные.
          </p>

          {/* Форма */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Имя */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Имя
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Введите имя"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Фамилия */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Фамилия
              </label>

              <input
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                placeholder="Введите фамилию"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Пароль */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Пароль
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Введите пароль"
                required
                minLength={6}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Кнопка */}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:opacity-95"
            >
              Создать аккаунт
            </button>

          </form>

          {/* Вход */}

          <div className="mt-8 border-t border-zinc-800 pt-6 text-center">

            <p className="text-sm text-zinc-500">
              Уже есть аккаунт?
            </p>

            <Link
              href="/login"
              className="mt-2 inline-block font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Войти
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}