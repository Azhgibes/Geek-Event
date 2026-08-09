"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Eye,
  FileText,
  MapPin,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

interface EventDraft {
  title: string;
  city: string;
  venue: string;
  address: string;
  date: string;
  description: string;
  organizer: {
    name: string;
    email: string;
  };
}

export default function OrganizerDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [event, setEvent] = useState<EventDraft | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("geek_event_user");
    const savedEvent = localStorage.getItem("geek_event_draft");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

    if (savedEvent) {
      try {
        setEvent(JSON.parse(savedEvent));
      } catch {
        setEvent(null);
      }
    }
  }, []);

  if (!event) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Вернуться в личный кабинет
          </Link>

          <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">

            <h1 className="text-2xl font-bold">
              Мероприятие не найдено
            </h1>

            <p className="mt-3 text-zinc-400">
              Сначала создайте мероприятие.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white"
            >
              Создать мероприятие
            </Link>

          </div>

        </div>

      </main>
    );
  }

  const formattedDate = event.date
    ? new Date(`${event.date}T00:00:00`).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Дата не указана";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Верхняя панель */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Личный кабинет
          </Link>

          <Link
            href="/events"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Посмотреть публичную страницу
          </Link>

        </div>

        {/* Заголовок мероприятия */}

        <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="relative">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

              <div>

                <p className="text-sm font-medium text-violet-400">
                  Кабинет организатора
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
                  {event.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-400">

                  <span className="flex items-center gap-2">
                    <MapPin size={17} />
                    {event.city}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays size={17} />
                    {formattedDate}
                  </span>

                  {event.venue && (
                    <span>
                      {event.venue}
                    </span>
                  )}

                </div>

              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 font-medium text-zinc-300 transition hover:border-violet-500 hover:text-white"
              >
                <Settings size={18} />
                Настройки
              </button>

            </div>

          </div>

        </section>

        {/* Статистика */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Users className="mb-4 text-violet-400" />

            <p className="text-sm text-zinc-500">
              Участников
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <FileText className="mb-4 text-cyan-400" />

            <p className="text-sm text-zinc-500">
              Заявок
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Eye className="mb-4 text-pink-400" />

            <p className="text-sm text-zinc-500">
              Просмотров
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

            <Trophy className="mb-4 text-yellow-400" />

            <p className="text-sm text-zinc-500">
              Номинаций
            </p>

            <p className="mt-2 text-3xl font-bold">
              0
            </p>

          </div>

        </section>

        {/* Меню управления */}

        <section className="mt-8">

          <h2 className="mb-5 text-2xl font-bold">
            Управление мероприятием
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <DashboardCard
              icon={<FileText size={24} />}
              title="Основная информация"
              description="Название, описание, дата, место проведения."
            />

            <Link href="/dashboard/nominations">
              <DashboardCard
               icon={<Trophy size={24} />}
               title="Номинации"
               description="Создавайте и настраивайте номинации фестиваля."
              />
            </Link>

            <DashboardCard
              icon={<FileText size={24} />}
              title="Заявки"
              description="Просматривайте заявки участников."
            />

            <DashboardCard
              icon={<CalendarDays size={24} />}
              title="Расписание"
              description="Настройте программу и расписание мероприятия."
            />

            <DashboardCard
              icon={<MapPin size={24} />}
              title="Карта фестиваля"
              description="Площадки, зоны и расположение объектов."
            />

            <DashboardCard
              icon={<Users size={24} />}
              title="Жюри"
              description="Добавляйте членов жюри и экспертов."
            />

            <DashboardCard
              icon={<Users size={24} />}
              title="Партнёры"
              description="Управляйте партнёрами и спонсорами."
            />

            <DashboardCard
              icon={<Eye size={24} />}
              title="Статистика"
              description="Просмотры, заявки и статистика мероприятия."
            />

            <DashboardCard
              icon={<Settings size={24} />}
              title="Настройки"
              description="Настройки мероприятия и публикации."
            />

          </div>

        </section>

        {/* Организатор */}

        <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <h2 className="text-2xl font-bold">
            Организатор
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">

              <p className="text-sm text-zinc-500">
                Имя
              </p>

              <p className="mt-2 font-medium">
                {event.organizer?.name ||
                  `${user?.name || ""} ${user?.surname || ""}`}
              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5">

              <p className="text-sm text-zinc-500">
                E-mail
              </p>

              <p className="mt-2 font-medium">
              {event.organizer?.email || user?.email || "Не указан"}
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function DashboardCard({
  icon,
  title,
  description,
}: DashboardCardProps) {
  return (
    <button
      type="button"
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left transition hover:-translate-y-1 hover:border-violet-500/60 hover:bg-zinc-900/80"
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-400 transition group-hover:bg-violet-600/20">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

    </button>
  );
}