"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Building2,
  User,
} from "lucide-react";

interface UserData {
  name: string;
  surname: string;
  email: string;
}

export default function CreateEventPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("geek_event_user");

    if (!savedUser) {
      router.push("/register");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      router.push("/register");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      return;
    }

    const newEvent = {
      title,
      city,
      venue,
      address,
      date,
      description,

      organizer: {
        name: `${user.name} ${user.surname}`,
        email: user.email,
      },
    };

    // Временное хранение.
    // Позже заменим на базу данных.
    localStorage.setItem(
      "geek_event_draft",
      JSON.stringify(newEvent)
    );

    router.push("/dashboard");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Загрузка...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* Назад */}

        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Вернуться в личный кабинет
        </Link>

        {/* Заголовок */}

        <div className="mb-8">

          <p className="text-sm font-medium text-violet-400">
            Geek Event
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Создание мероприятия
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Создайте мероприятие и настройте его страницы,
            номинации, заявки и расписание.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Организатор */}

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600/10 text-violet-400">
                <User size={24} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Организатор
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Данные автоматически взяты из вашего профиля.
                </p>

              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">

                <p className="text-xs text-zinc-500">
                  Имя организатора
                </p>

                <p className="mt-2 font-medium text-white">
                  {user.name} {user.surname}
                </p>

              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-4">

                <p className="text-xs text-zinc-500">
                  E-mail
                </p>

                <p className="mt-2 font-medium text-white">
                  {user.email}
                </p>

              </div>

            </div>
            <p className="mt-4 text-sm text-zinc-500">
              В дальнейшем сюда добавим название организации,
              телефон, сайт, социальные сети и другие данные профиля.
            </p>

          </section>

          {/* Основная информация */}

          <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Основная информация
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Расскажите участникам о вашем мероприятии.
              </p>

            </div>

            <div className="space-y-5">

              {/* Название */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Название мероприятия
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Например, DVIZH-FEST 5"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

              {/* Город */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <MapPin size={16} />
                  Город
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Например, Омск"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

              {/* Место */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <Building2 size={16} />
                  Место проведения
                </label>

                <input
                  type="text"
                  value={venue}
                  onChange={(event) => setVenue(event.target.value)}
                  placeholder="Например, ДК им. Малунцева"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

              {/* Адрес */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Адрес
                </label>

                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Например, проспект Мира, 58"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

              {/* Дата */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                  <CalendarDays size={16} />
                  Дата мероприятия
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

              {/* Описание */}

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Описание
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Расскажите о вашем мероприятии..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

            </div>

          </section>

          {/* Кнопки */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/account"
              className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Отмена
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
            >
              Создать мероприятие
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}