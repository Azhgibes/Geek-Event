"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Заполните все обязательные поля");
      return;
    }

    const user = {
      name,
      email,
      createdAt: new Date().toISOString(),

      // Пока пользователь не является организатором.
      // Организатором он сможет стать через «Создать мероприятие».
      role: "user",

      organization: "",
      participatedEvents: [],
      organizedEvents: [],
      achievements: [],
      favorites: [],
    };

    localStorage.setItem("geek-event-user", JSON.stringify(user));

    router.push("/profile");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center">

        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-10">

          <div className="mb-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-400">
              Geek Event
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Создание аккаунта
            </h1>

            <p className="mt-3 leading-7 text-zinc-400">
              Создайте единый аккаунт участника Geek Event.
              Позже из этого же аккаунта можно будет создать
              собственное мероприятие.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Имя
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Пароль
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Придумайте пароль"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Создать аккаунт
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-zinc-500">
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="text-violet-400 transition hover:text-violet-300"
            >
              Войти
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}


