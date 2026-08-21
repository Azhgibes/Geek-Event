"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Heart,
  Settings,
  Ticket,
  Trophy,
  Plus,
  User,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  role: string;
  organization: string;
  participatedEvents: string[];
  organizedEvents: string[];
  achievements: string[];
  favorites: string[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("geek-event-user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold">
            Вы не авторизованы
          </h1>

          <p className="mt-3 text-zinc-400">
            Войдите или создайте аккаунт Geek Event.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-500"
          >
            Создать аккаунт
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Профиль */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div className="text-sm text-violet-400">
                  Личный кабинет
                </div>

                <h1 className="mt-1 text-3xl font-bold">
                  {user.name}
                </h1>

                <p className="mt-1 text-zinc-400">
                  {user.email}
                </p>
              </div>

            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 text-zinc-300 transition hover:border-violet-500 hover:text-white"
            >
              <Settings size={18} />
              Настройки
            </button>

          </div>

        </section>

        {/* Статистика */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<Ticket size={22} />}
            title="Участий"
            value={user.participatedEvents.length}
          />

          <StatCard
            icon={<CalendarDays size={22} />}
            title="Мероприятий"
            value={user.organizedEvents.length}
          />

          <StatCard
            icon={<Trophy size={22} />}
            title="Достижений"
            value={user.achievements.length}
          />

          <StatCard
            icon={<Heart size={22} />}
            title="Избранных"
            value={user.favorites.length}
          />

        </section>

        {/* Основные разделы */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          <ProfileSection
            title="Я участвую"
            description="Мероприятия, в которых вы участвуете."
            icon={<Ticket size={22} />}
          >
            <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
              <p className="text-zinc-500">
                Пока вы ни в одном мероприятии не участвуете.
              </p>

              <Link
                href="/events"
                className="mt-4 inline-flex font-semibold text-violet-400 hover:text-violet-300"
              >
                Найти мероприятие →
              </Link>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Мои достижения"
            description="Победы, награды и достижения."
            icon={<Trophy size={22} />}
          >
            <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
              <p className="text-zinc-500">
                Здесь будут отображаться ваши достижения.
              </p>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Мои мероприятия"
            description="Фестивали и мероприятия, которые вы организуете."
            icon={<CalendarDays size={22} />}
          >
            <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
              <p className="text-zinc-500">
                Вы пока не организуете мероприятия.
              </p>

              <Link
                href="/dashboard/create"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
              >
                <Plus size={18} />
                Создать мероприятие
              </Link>
            </div>
          </ProfileSection>

          <ProfileSection
            title="Избранное"
            description="Сохранённые мероприятия."
            icon={<Heart size={22} />}
          >
            <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
              <p className="text-zinc-500">
                В избранном пока ничего нет.
              </p>
            </div>
          </ProfileSection>

        </section>

      </div>
    </main>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-4 text-violet-400">
        {icon}
      </div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function ProfileSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

      <div className="mb-6 flex items-start justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {description}
          </p>
        </div>

        <div className="text-violet-400">
          {icon}
        </div>

      </div>

      {children}

    </section>
  );
}