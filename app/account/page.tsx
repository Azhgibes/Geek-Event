"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Heart,
  LogOut,
  Settings,
  Trophy,
  User,
  XCircle,
} from "lucide-react";

interface UserData {
  name: string;
  surname?: string;
  email: string;
  password?: string;
  isLoggedIn?: boolean;
  createdAt?: string;
  role?: "admin" | "user"; 
}

interface Application {
  id: string;
  eventTitle: string;
  nominationTitle: string;
  status?: string;
  createdAt: string;
  userEmail?: string;
  participant?: {
    name?: string;
    email?: string;
    nickname?: string;
    phone?: string;
    social?: string;
    comment?: string;
  };
  user?: {
    name?: string;
    surname?: string;
    email?: string;
  };
}
interface CreatedEvent {
  id: string;
  slug: string;

  title: string;
  city: string;
  venue?: string;
  address?: string;
  date: string;
  description: string;

  shortDescription?: string;
  heroText?: string;

  categories?: string[];

  participants?: number;
  rating?: number;

  registration?: boolean;

  nominations?: {
    id: string;
    title: string;
    description: string;
    type: string;
    registration: boolean;
  }[];

  status: "pending" | "published" | "rejected";

  createdAt: string;

  organizer: {
    name: string;
    email: string;
  };
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [createdEvents, setCreatedEvents] = useState<CreatedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const approveEvent = (id: string) => {
  const savedEvents = localStorage.getItem("geek-event-created");

  if (!savedEvents) return;

  const events = JSON.parse(savedEvents);

  const updatedEvents = events.map((event: any) =>
    event.id === id
      ? { ...event, status: "published" }
      : event
  );

  localStorage.setItem(
    "geek-event-created",
    JSON.stringify(updatedEvents)
  );

  setCreatedEvents(updatedEvents);
};

const rejectEvent = (id: string) => {
  const savedEvents = localStorage.getItem("geek-event-created");

  if (!savedEvents) return;

  const events = JSON.parse(savedEvents);

  const updatedEvents = events.map((event: any) =>
    event.id === id
      ? { ...event, status: "rejected" }
      : event
  );

  localStorage.setItem(
    "geek-event-created",
    JSON.stringify(updatedEvents)
  );

  setCreatedEvents(updatedEvents);
};

  useEffect(() => {
    loadAccount();
  }, []);

  function loadAccount() {
    const savedUser =
      localStorage.getItem("geek-event-user");

    if (!savedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser: UserData =
        JSON.parse(savedUser);

      if (parsedUser.isLoggedIn !== true) {
        setLoading(false);
        return;
      }

      setUser(parsedUser);
      const savedCreatedEvents = localStorage.getItem(
  "geek-event-created"
);

if (savedCreatedEvents) {
  try {
    const parsedEvents = JSON.parse(savedCreatedEvents);

    if (Array.isArray(parsedEvents)) {
      const userEvents = parsedEvents.filter(
        (event: CreatedEvent) =>
          event.organizer?.email === parsedUser.email
      );

      setCreatedEvents(userEvents);
    }
  } catch {
    setCreatedEvents([]);
  }
} else {
  setCreatedEvents([]);
}

      const savedApplications =
  localStorage.getItem(
    "geek-event-applications"
  );

if (savedApplications) {
  try {
    const allApplications =
      JSON.parse(savedApplications);

    if (Array.isArray(allApplications)) {
      const userApplications =
        allApplications.filter(
          (application: Application) => {
            return (
              application.userEmail ===
                parsedUser.email ||
              application.participant?.email ===
                parsedUser.email ||
              application.user?.email ===
                parsedUser.email
            );
          }
        );

      setApplications(userApplications);
    } else {
      setApplications([]);
    }
  } catch {
    setApplications([]);
  }
} else {
  setApplications([]);
}

const savedEvents =
  localStorage.getItem(
    "geek-event-created"
  );

if (savedEvents) {
  try {
    const allEvents =
      JSON.parse(savedEvents);

    if (Array.isArray(allEvents)) {
      const userEvents =
        allEvents.filter(
          (event: CreatedEvent) =>
            event.organizer?.email ===
            parsedUser.email
        );

      setCreatedEvents(userEvents);
    } else {
      setCreatedEvents([]);
    }
  } catch {
    setCreatedEvents([]);
  }
} else {
  setCreatedEvents([]);
}

} catch {
  setUser(null);
}

setLoading(false);
}

function handleLogout() {
    const savedUser =
      localStorage.getItem("geek-event-user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        parsedUser.isLoggedIn = false;

        localStorage.setItem(
          "geek-event-user",
          JSON.stringify(parsedUser)
        );
      } catch {
        localStorage.removeItem(
          "geek-event-user"
        );
      }
    }

    window.location.href = "/";
  }

  function goHome() {
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-400">
              Загружаем личный кабинет...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">

          <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">
              <User size={32} />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Вы не вошли в аккаунт
            </h1>

            <p className="mt-3 text-zinc-400">
              Войдите в существующий аккаунт
              Geek Event или зарегистрируйтесь.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Войти
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 transition hover:border-violet-500 hover:text-white"
              >
                Регистрация
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-zinc-800 px-6 py-3 font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              >
                На главную
              </Link>

            </div>

          </div>

        </div>
      </main>
    );
  }

  const fullName = [
    user.name,
    user.surname,
  ]
    .filter(Boolean)
    .join(" ");

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Заголовок */}

        <div className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-3xl font-bold">
                {firstLetter}
              </div>

              <div>
                <div className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                  Личный кабинет
                </div>

                <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                  {fullName || user.email}
                </h1>

                <p className="mt-1 text-zinc-400">
                  {user.email}
                </p>
              </div>

            </div>

            {/* Кнопки */}

            <div className="flex flex-wrap gap-3">
              <Link
                href="/create-event"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                <CalendarDays size={18} />
                Создать мероприятие
              </Link>

              <button
                type="button"
                onClick={goHome}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950 px-5 py-3 font-semibold text-zinc-300 transition hover:border-violet-500 hover:bg-zinc-800 hover:text-white"
              >
                <ArrowLeft size={18} />
                На главную
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut size={18} />
                Выйти
              </button>

            </div>

          </div>

        </div>

        {/* Статистика */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<FileText size={22} />}
            title="Мои заявки"
            value={applications.length}
          />

          <StatCard 
            icon={<CalendarDays size={22} />}
            title="Мероприятия"
            value={createdEvents.length}
          />

          <StatCard
            icon={<Trophy size={22} />}
            title="Достижения"
            value={0}
          />

          <StatCard
            icon={<Heart size={22} />}
            title="Избранное"
            value={0}
          />

        </div>

        {/* Мои мероприятия */}

<section className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

<div className="mb-6 flex items-center justify-between">

<div>
<h2 className="text-2xl font-bold">
Мои мероприятия
</h2>

<p className="mt-2 text-sm text-zinc-500">
Созданные вами мероприятия.
</p>
</div>

<Link
href="/create-event"
className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white"
>
Создать
</Link>

</div>

{createdEvents.length === 0 ? (

<div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center text-zinc-500">

Мероприятий пока нет

</div>

) : (

<div className="space-y-4">

  {createdEvents.map((event) => (
    <div
      key={event.id}
      className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
    >

      <h3 className="text-xl font-bold text-white">
        {event.title}
      </h3>

      <p className="text-zinc-400">
        {event.city}
      </p>

      <div className="mt-3">
        <EventStatus status={event.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">

  <Link
    href={`/create-event/edit/${event.id}`}
    className="inline-flex items-center justify-center rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
  >
    Редактировать
  </Link>

  <Link
    href={`/events/${event.slug || event.id}`}
    className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
  >
    Открыть
  </Link>

</div>

      {/* Только для администратора */}
      {user.role === "admin" && (
        <div className="mt-4">
  <span
    className="
    inline-flex rounded-xl 
    bg-zinc-800 
    px-4 py-2 
    text-sm 
    text-zinc-300
    "
  >
  </span>
</div>
      )}

    </div>
  ))}

 </div>
)}
</section>

        {/* Мои заявки */}

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <FileText
                  size={24}
                  className="text-violet-400"
                />

                <h2 className="text-2xl font-bold">
                  Мои заявки
                </h2>

              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Здесь отображаются заявки,
                которые вы подали на мероприятия.
              </p>

            </div>

            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              <CalendarDays size={17} />
              Найти мероприятие
            </Link>

          </div>

          {applications.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-700 p-10 text-center">

              <FileText
                size={38}
                className="mx-auto text-zinc-600"
              />

              <h3 className="mt-4 text-xl font-semibold">
                Заявок пока нет
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Вы ещё не подавали заявки
                на участие в мероприятиях.
              </p>

              <Link
                href="/events"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Посмотреть мероприятия
                →
              </Link>

            </div>
          ) : (
            <div className="space-y-4">

              {applications.map(
                (application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                  />
                )
              )}

            </div>
          )}

        </section>

        {/* Нижние разделы */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <ProfileSection
            title="Мой профиль"
            description="Данные вашего аккаунта."
            icon={<User size={22} />}
          >

            <div className="space-y-3">

              <div className="rounded-xl bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">
                  Имя и фамилия
                </p>

                <p className="mt-1 font-medium text-white">
                  {fullName || "Не указано"}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-950 p-4">
                <p className="text-xs text-zinc-500">
                  E-mail
                </p>

                <p className="mt-1 font-medium text-white">
                  {user.email}
                </p>
              </div>

            </div>

          </ProfileSection>

          <ProfileSection
            title="Настройки"
            description="Управление вашим аккаунтом."
            icon={<Settings size={22} />}
          >
            <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">

              <Settings
                size={32}
                className="mx-auto text-zinc-600"
              />

              <p className="mt-4 text-sm text-zinc-500">
                Настройки профиля появятся здесь
                на следующем этапе.
              </p>

            </div>

          </ProfileSection>

        </div>

      </div>

    </main>
  );
}

/* -------------------------------------------------- */
/* Статистика */
/* -------------------------------------------------- */

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

/* -------------------------------------------------- */
/* Карточка заявки */
/* -------------------------------------------------- */



/* -------------------------------------------------- */
/* Статус заявки */
/* -------------------------------------------------- */

function getApplicationStatus(
  status?: string
) {
  switch (status) {
    case "approved":
      return {
        label: "Одобрена",
        className:
          "bg-green-500/10 text-green-400",
        icon: <CheckCircle2 size={15} />,
      };

    case "rejected":
      return {
        label: "Отклонена",
        className:
          "bg-red-500/10 text-red-400",
        icon: <XCircle size={15} />,
      };

    case "new":
    default:
      return {
        label: "На рассмотрении",
        className:
          "bg-yellow-500/10 text-yellow-400",
        icon: <Clock3 size={15} />,
      };
  }
}

/* -------------------------------------------------- */
/* Секция профиля */
/* -------------------------------------------------- */

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
function EventStatus({
  status,
}: {
  status: "pending" | "published" | "rejected";
}) {
  if (status === "published") {
    return (
      <div className="inline-flex w-fit items-center rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
        Опубликовано
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="inline-flex w-fit items-center rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
        Отклонено
      </div>
    );
  }

  return (
    <div className="inline-flex w-fit items-center rounded-full bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-400">
      На рассмотрении
    </div>
  );
}
function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  const date = new Date(
    application.createdAt
  ).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const status = getApplicationStatus(
    application.status
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-sm font-semibold text-violet-400">
            {application.eventTitle}
          </p>

          <h3 className="mt-1 text-xl font-bold text-white">
            {application.nominationTitle}
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Заявка подана: {date}
          </p>
        </div>

        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
        >
          {status.icon}
          {status.label}
        </div>

      </div>

      {application.participant?.nickname && (
        <div className="mt-5 rounded-xl bg-zinc-900 p-4">

          <p className="text-xs text-zinc-500">
            Никнейм
          </p>

          <p className="mt-1 font-medium text-white">
            {application.participant.nickname}
          </p>

        </div>
      )}

    </div>
  );
}