"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const savedUser = localStorage.getItem("geek-event-user");

    if (!savedUser) {
      setError(
        "Аккаунт не найден. Сначала зарегистрируйтесь."
      );
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const enteredEmail = email.trim().toLowerCase();
      const savedEmail = String(user.email || "")
        .trim()
        .toLowerCase();

      if (
        savedEmail !== enteredEmail ||
        user.password !== password
      ) {
        setError("Неверный E-mail или пароль.");
        return;
      }

      // Авторизуем пользователя
      const updatedUser = {
        ...user,
        isLoggedIn: true,
      };

      localStorage.setItem(
        "geek-event-user",
        JSON.stringify(updatedUser)
      );

      // Переходим в личный кабинет
      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка входа:", error);

      setError(
        "Не удалось прочитать данные аккаунта."
      );
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-white sm:px-6 lg:px-8">

      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">

        <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-violet-500/5 sm:p-10">

          {/* Иконка */}

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
            <LogIn size={28} />
          </div>

          {/* Заголовок */}

          <h1 className="text-3xl font-bold sm:text-4xl">
            Вход в аккаунт
          </h1>

          <p className="mt-3 text-zinc-400">
            Войдите в свой аккаунт Geek Event.
          </p>

          {/* Ошибка */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Форма */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* E-mail */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
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
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Введите пароль"
                required
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Кнопка */}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.01] hover:opacity-95"
            >
            
              Войти
            </button>

          </form>

          {/* Регистрация */}

          <div className="mt-8 border-t border-zinc-800 pt-6 text-center">

            <p className="text-sm text-zinc-500">
              Нет аккаунта?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Создать аккаунт
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}