"use client";

import Link from "next/link";
import {
  User,
  CalendarDays,
  Trophy,
  Heart,
  Plus,
  ArrowRight,
  Ticket,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("geek_event_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const fullName = user
    ? `${user.name} ${user.surname}`
    : "Пользователь Geek Event";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Шапка профиля */}

        <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">

              {/* Аватар */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-500 text-3xl font-bold text-white shadow-xl shadow-violet-500/20">
                {user?.name?.charAt(0)?.toUpperCase() || "G"}
              </div>

              <div>

                <p className="text-sm text-violet-400">
                  Личный кабинет
                </p>

                <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                  {fullName}
                </h1>

                {user?.email && (
                  <p className="mt-2 text-zinc-400">
                    {user.email}
                  </p>
                )}

              </div>

            </div>

            <Link
              href="/account/settings"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-300 transition hover:border-violet-500 hover:text-white"
            >
              <Settings size={18} />
              Настройки
            </Link>

          </div>

        </section>

        {/* Статистика */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Ticket className="mb-4 text-violet-400" />

            <p className="text-sm text-zinc-500">
              Участий
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <CalendarDays className="mb-4 text-cyan-400" />

            <p className="text-sm text-zinc-500">
              Мероприятий
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Trophy className="mb-4 text-yellow-400" />

            <p className="text-sm text-zinc-500">
              Достижений
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Heart className="mb-4 text-pink-400" />

            <p className="text-sm text-zinc-500">
              Избранных
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              0
            </p>

          </div>

        </section>

        {/* Основной контент */}

        <section className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* Я участвую */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Я участвую
                </h2>

                <p className="mt-2 text-zinc-400">
                  Мероприятия, в которых вы участвуете.
                </p>

              </div>

              <Ticket className="text-violet-400" />

            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-zinc-700 p-8 text-center">

              <p className="text-zinc-500">
                Пока вы ни в одном мероприятии не участвуете.
              </p>

              <Link
                href="/events"
                className="mt-4 inline-flex items-center gap-2 text-violet-400 transition hover:text-violet-300"
              >
                Найти мероприятие
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

          {/* Достижения */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Мои достижения
                </h2>

                <p className="mt-2 text-zinc-400">
                  Победы, награды и достижения.
                </p>

              </div>

              <Trophy className="text-yellow-400" />

            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-zinc-700 p-8 text-center">

              <p className="text-zinc-500">
                Здесь будут отображаться ваши достижения.
              </p>

            </div>

          </div>

        </section>

        {/* Мои мероприятия */}

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-2xl font-bold text-white">
                Мои мероприятия
              </h2>

              <p className="mt-2 text-zinc-400">
                Здесь будут отображаться мероприятия, которые вы организуете.
              </p>

            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
            >
              <Plus size={20} />
              Создать мероприятие
            </Link>

          </div>

          {/* Пока мероприятий нет */}

          <div className="mt-8 rounded-2xl border border-dashed border-zinc-700 p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-400">
              <CalendarDays size={26} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">
              Пока нет созданных мероприятий
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              Создайте своё первое мероприятие, чтобы открыть кабинет организатора.
            </p>

            <Link
              href="/create-event"
              className="mt-5 inline-flex items-center gap-2 text-violet-400 transition hover:text-violet-300"
            >
              Создать мероприятие
              <ArrowRight size={16} />
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}