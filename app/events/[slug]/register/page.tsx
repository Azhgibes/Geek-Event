"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  User,
} from "lucide-react";

import { events } from "@/data/events";

interface Nomination {
  id: string;
  title: string;
  description?: string;
  type?: string;
  registration?: boolean;
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
  nominations?: Nomination[];
  status: "pending" | "published" | "rejected";
  createdAt: string;
  organizer: {
    name: string;
    email: string;
  };
}

interface UserData {
  name: string;
  surname?: string;
  email: string;
  isLoggedIn?: boolean;
}

interface Application {
  id: string;
  eventId: string;
  eventSlug: string;
  eventTitle: string;
  nominationId: string;
  nominationTitle: string;
  status: "new" | "approved" | "rejected";
  createdAt: string;
  userEmail: string;

  participant: {
    name: string;
    nickname: string;
    phone: string;
    social: string;
    comment: string;
  };
}

export default function RegisterPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [event, setEvent] =
    useState<CreatedEvent | any>(null);

  const [user, setUser] =
    useState<UserData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedNomination, setSelectedNomination] =
    useState("");

  const [name, setName] =
    useState("");

  const [nickname, setNickname] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [social, setSocial] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    /*
     * Загружаем пользователя
     */

    const savedUser =
      localStorage.getItem(
        "geek-event-user"
      );

    if (savedUser) {
      try {
        const parsedUser: UserData =
          JSON.parse(savedUser);

        if (
          parsedUser.isLoggedIn === true
        ) {
          setUser(parsedUser);

          setName(
            `${parsedUser.name || ""} ${
              parsedUser.surname || ""
            }`.trim()
          );
        }
      } catch {
        // Ничего не делаем.
      }
    }

    /*
     * Сначала ищем созданное пользователем
     * мероприятие.
     *
     * Это важно: если slug совпадает со
     * стандартным мероприятием, приоритет
     * должен быть у версии из localStorage.
     */

    const savedEvents =
      localStorage.getItem(
        "geek-event-created"
      );

    if (savedEvents) {
      try {
        const createdEvents =
          JSON.parse(savedEvents);

        if (Array.isArray(createdEvents)) {
          const createdEvent =
            createdEvents.find(
              (item: CreatedEvent) =>
                (
                  item.slug === slug ||
                  item.id === slug
                ) &&
                item.status === "published"
            );

          if (createdEvent) {
            setEvent(createdEvent);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Переходим к стандартным мероприятиям.
      }
    }

    /*
     * Если это стандартное мероприятие,
     * ищем его в data/events.ts
     */

    const defaultEvent =
      events.find(
        (item) => item.slug === slug
      );

    if (defaultEvent) {
      setEvent(defaultEvent);
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [slug]);

  /*
   * Отправка заявки
   */

  const handleSubmit = (
    formEvent: FormEvent<HTMLFormElement>
  ) => {
    formEvent.preventDefault();

    if (!event) {
      return;
    }

    if (!selectedNomination) {
      alert(
        "Выберите номинацию."
      );

      return;
    }

    if (!name.trim()) {
      alert(
        "Введите имя."
      );

      return;
    }

    const nomination =
      nominations.find(
        (item) =>
          item.id ===
          selectedNomination
      );

    if (!nomination) {
      alert(
        "Номинация не найдена."
      );

      return;
    }

    const newApplication: Application = {
      id: crypto.randomUUID(),

      eventId:
        event.id ||
        event.slug,

      eventSlug:
        event.slug,

      eventTitle:
        event.title,

      nominationId:
        nomination.id,

      nominationTitle:
        nomination.title,

      status:
        "new",

      createdAt:
        new Date().toISOString(),

      userEmail:
        user?.email ||
        "",

      participant: {
        name:
          name.trim(),

        nickname:
          nickname.trim(),

        phone:
          phone.trim(),

        social:
          social.trim(),

        comment:
          comment.trim(),
      },
    };

    /*
     * Заявки храним отдельно
     * от мероприятий.
     */

    const savedApplications =
      localStorage.getItem(
        "geek-event-applications"
      );

    let applications: Application[] =
      [];

    if (savedApplications) {
      try {
        const parsed =
          JSON.parse(
            savedApplications
          );

        if (Array.isArray(parsed)) {
          applications = parsed;
        }
      } catch {
        applications = [];
      }
    }

    applications.push(
      newApplication
    );

    localStorage.setItem(
      "geek-event-applications",
      JSON.stringify(
        applications
      )
    );

    setSubmitted(true);
  };

  /*
   * Состояние загрузки
   */

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="text-zinc-400">
          Загружаем мероприятие...
        </div>
      </main>
    );
  }

  /*
   * Мероприятие не найдено
   */

  if (!event) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">

          <h1 className="text-3xl font-bold">
            Мероприятие не найдено
          </h1>

          <p className="mt-3 text-zinc-400">
            Возможно, мероприятие ещё
            не опубликовано или было удалено.
          </p>

          <Link
            href="/events"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Вернуться к мероприятиям
          </Link>

        </div>
      </main>
    );
  }

  /*
   * Номинации мероприятия
   */

  const nominations: Nomination[] =
    Array.isArray(
      event.nominations
    )
      ? event.nominations
      : [];

  /*
   * После успешной заявки
   */

  if (submitted) {
    return (
      <main className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">

        <div className="mx-auto flex min-h-[80vh] w-full max-w-2xl items-center justify-center">

          <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 text-green-400">
              <CheckCircle2 size={42} />
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Заявка отправлена!
            </h1>

            <p className="mt-4 leading-7 text-zinc-400">
              Ваша заявка на участие
              в мероприятии
              <span className="font-semibold text-white">
                {" "}
                {event.title}
              </span>{" "}
              успешно отправлена.
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Организатор рассмотрит её
              и изменит статус заявки.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href={`/events/${slug}`}
                className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
              >
                Вернуться к мероприятию
              </Link>

              <Link
                href="/account"
                className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
              >
                В личный кабинет
              </Link>

            </div>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">

      <div className="mx-auto w-full min-w-0 max-w-4xl">

        {/* Назад */}

        <Link
          href={`/events/${slug}`}
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Вернуться к мероприятию
        </Link>

        {/* Заголовок */}

        <div className="mb-8">
          <p className="text-sm font-medium text-violet-400">
            {event.title}
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Подача заявки
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Выберите номинацию и заполните
            информацию об участнике.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full min-w-0 space-y-6"
        >

          {/* Номинации */}

          <section className="w-full min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400">
                <FileText size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Выберите номинацию
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Доступные номинации мероприятия.
                </p>
              </div>

            </div>

            {nominations.length === 0 ? (

              <div className="mt-6 rounded-2xl border border-dashed border-zinc-700 p-8 text-center">

                <p className="font-medium text-zinc-300">
                  Номинации пока не добавлены
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                  Организатор ещё не открыл
                  регистрацию по номинациям.
                </p>

              </div>

            ) : (

              <div className="mt-6 space-y-3">

                {nominations
                  .filter(
                    (nomination) =>
                      nomination.registration !==
                      false
                  )
                  .map(
                    (nomination) => (
                      <label
                        key={
                          nomination.id
                        }
                        className={`block cursor-pointer rounded-2xl border p-5 transition ${
                          selectedNomination ===
                          nomination.id
                            ? "border-violet-500 bg-violet-500/10"
                            : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                        }`}
                      >

                        <div className="flex items-start gap-4">

                          <input
                            type="radio"
                            name="nomination"
                            value={
                              nomination.id
                            }
                            checked={
                              selectedNomination ===
                              nomination.id
                            }
                            onChange={() =>
                              setSelectedNomination(
                                nomination.id
                              )
                            }
                            className="mt-1 h-4 w-4 accent-violet-600"
                          />

                          <div className="min-w-0">

                            <h3 className="font-semibold text-white">
                              {
                                nomination.title
                              }
                            </h3>

                            {nomination.description && (
                              <p className="mt-2 text-sm leading-6 text-zinc-400">
                                {
                                  nomination.description
                                }
                              </p>
                            )}

                            {nomination.type && (
                              <span className="mt-3 inline-flex rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                                {
                                  nomination.type
                                }
                              </span>
                            )}

                          </div>

                        </div>

                      </label>
                    )
                  )}

              </div>
            )}

          </section>

          {/* Данные участника */}

          <section className="w-full min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <User size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Данные участника
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Заполните информацию для
                  организатора.
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-5">

              {/* Имя */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Имя и фамилия
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  required
                  placeholder="Иван Иванов"
                  className="box-border w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>

              {/* Ник */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Никнейм
                </label>

                <input
                  type="text"
                  value={nickname}
                  onChange={(event) =>
                    setNickname(
                      event.target.value
                    )
                  }
                  placeholder="@nickname"
                  className="box-border w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>

              {/* Телефон */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Телефон
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  placeholder="+7 900 000-00-00"
                  className="box-border w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>

              {/* Социальные сети */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Социальные сети
                </label>

                <input
                  type="text"
                  value={social}
                  onChange={(event) =>
                    setSocial(
                      event.target.value
                    )
                  }
                  placeholder="VK, Telegram, Instagram и т.д."
                  className="box-border w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>

              {/* Комментарий */}

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Дополнительная информация
                </label>

                <textarea
                  value={comment}
                  onChange={(event) =>
                    setComment(
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Дополнительная информация для организатора..."
                  className="box-border w-full resize-y rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />
              </div>

            </div>

          </section>

          {/* Кнопки */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href={`/events/${slug}`}
              className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Отмена
            </Link>

            <button
              type="submit"
              disabled={
                nominations.length === 0
              }
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Отправить заявку
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}
