"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Plus,
  Trash2,
  Trophy,
  X,
} from "lucide-react";

interface Nomination {
  id: string;
  title: string;
  description: string;
  type: string;
  registration: boolean;
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

const initialNominations: Nomination[] = [
  {
    id: "defile-west",
    title: "Одиночное дефиле — запад",
    description: "Одиночное косплей-дефиле по западным фандомам.",
    type: "Cosplay",
    registration: true,
  },
  {
    id: "defile-east",
    title: "Одиночное дефиле — восток",
    description:
      "Одиночное косплей-дефиле по аниме, манге и восточным фандомам.",
    type: "Cosplay",
    registration: true,
  },
  {
    id: "team-defile",
    title: "Командное дефиле",
    description: "Косплей-дефиле для команд.",
    type: "Cosplay",
    registration: true,
  },
  {
    id: "geek-show",
    title: "Гик-шоу",
    description: "Яркие творческие номера и выступления.",
    type: "Show",
    registration: true,
  },
  {
    id: "stage-cosplay",
    title: "Сценический косплей",
    description: "Полноценные сценические косплей-постановки.",
    type: "Cosplay",
    registration: true,
  },
  {
    id: "kpop-solo",
    title: "K-POP SOLO",
    description: "Сольное K-POP выступление.",
    type: "K-POP",
    registration: true,
  },
  {
    id: "kpop-crew",
    title: "K-POP CREW",
    description: "Выступление K-POP команды.",
    type: "K-POP",
    registration: true,
  },
  {
    id: "kpop-team",
    title: "K-POP TEAM",
    description: "Командный K-POP конкурс.",
    type: "K-POP",
    registration: true,
  },
  {
    id: "stands",
    title: "Конкурс стендов",
    description: "Участие с тематическим стендом на фестивале.",
    type: "Geek",
    registration: true,
  },
  {
    id: "saber-fight",
    title: "Саберфайтинг",
    description: "Соревнования по световым мечам.",
    type: "Sport",
    registration: true,
  },
  {
    id: "geek-vocal",
    title: "Гик-вокал",
    description: "Вокальный конкурс для представителей гик-культуры.",
    type: "Music",
    registration: true,
  },
  {
    id: "dvizh-dance",
    title: "DVIZH-DANCE",
    description: "Танцевальный конкурс.",
    type: "Dance",
    registration: true,
  },
];

export default function NominationsPage() {
  const [event, setEvent] = useState<EventDraft | null>(null);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Cosplay");

  useEffect(() => {
    const savedEvent = localStorage.getItem("geek_event_draft");
    const savedNominations = localStorage.getItem(
      "geek_event_nominations"
    );

    if (savedEvent) {
      try {
        setEvent(JSON.parse(savedEvent));
      } catch {
        setEvent(null);
      }
    }

    if (savedNominations) {
      try {
        setNominations(JSON.parse(savedNominations));
      } catch {
        setNominations(initialNominations);
      }
    } else {
      setNominations(initialNominations);
      localStorage.setItem(
        "geek_event_nominations",
        JSON.stringify(initialNominations)
      );
    }
  }, []);

  const saveNominations = (items: Nomination[]) => {
    setNominations(items);

    localStorage.setItem(
      "geek_event_nominations",
      JSON.stringify(items)
    );
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("Cosplay");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (editingId) {
      const updated = nominations.map((nomination) =>
        nomination.id === editingId
          ? {
              ...nomination,
              title,
              description,
              type,
            }
          : nomination
      );

      saveNominations(updated);
    } else {
      const newNomination: Nomination = {
        id: `${Date.now()}`,
        title,
        description,
        type,
        registration: true,
      };

      saveNominations([
        ...nominations,
        newNomination,
      ]);
    }

    resetForm();
  };

  const editNomination = (nomination: Nomination) => {
     setEditingId(nomination.id);
     setTitle(nomination.title);
     setDescription(nomination.description);
     setType(nomination.type);

     setShowForm(true);

     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
  };

  const deleteNomination = (id: string) => {
    const confirmed = window.confirm(
      "Удалить эту номинацию?"
    );

    if (!confirmed) {
      return;
    }

    saveNominations(
      nominations.filter(
        (nomination) => nomination.id !== id
      )
    );
  };

  const toggleRegistration = (id: string) => {
    const updated = nominations.map((nomination) =>
      nomination.id === id
        ? {
            ...nomination,
            registration: !nomination.registration,
          }
        : nomination
    );

    saveNominations(updated);
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6">

        <div className="mx-auto max-w-5xl">

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={18} />
            Кабинет организатора
          </Link>

          <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">

            <h1 className="text-2xl font-bold">
              Мероприятие не найдено
            </h1>

            <p className="mt-3 text-zinc-400">
              Сначала создайте мероприятие.
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Верхняя часть */}

        <div className="mb-8">

          <Link
            href="/dashboard"
            className="mb-6 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Кабинет организатора
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium text-violet-400">
                {event.title}
              </p>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Номинации
              </h1>

              <p className="mt-3 max-w-2xl text-zinc-400">
                Создавайте и настраивайте номинации
                вашего мероприятия.
              </p>

            </div>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90"
            >
              <Plus size={20} />
              Добавить номинацию
            </button>

          </div>

        </div>

        {/* Форма */}

        {showForm && (
          <section className="mb-8 rounded-3xl border border-violet-500/30 bg-zinc-900 p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  {editingId
                    ? "Редактирование номинации"
                    : "Новая номинация"}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Заполните информацию о номинации.
                </p>

              </div>

              <button
                type="button"
                onClick={resetForm}
                className="text-zinc-500 transition hover:text-white"
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Название
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например, K-POP SOLO"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Тип номинации
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
                >
                  <option>Cosplay</option>
                  <option>K-POP</option>
                  <option>Dance</option>
                  <option>Music</option>
                  <option>Show</option>
                  <option>Geek</option>
                  <option>Sport</option>
                  <option>Other</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Описание
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Расскажите участникам о номинации..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-violet-500"
                />

              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 hover:text-white"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-500"
                >
                  {editingId
                    ? "Сохранить изменения"
                    : "Добавить номинацию"}
                </button>

              </div>

            </form>

          </section>
        )}

        {/* Список */}

        {nominations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 p-12 text-center">

            <Trophy
              size={40}
              className="mx-auto text-zinc-600"
            />

            <h2 className="mt-5 text-xl font-bold">
              Номинаций пока нет
            </h2>

            <p className="mt-2 text-zinc-500">
              Добавьте первую номинацию вашего мероприятия.
            </p>

          </div>
        ) : (
          <div className="grid gap-4">

            {nominations.map((nomination, index) => (
              <div
                key={nomination.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 sm:p-6"
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600/10 font-bold text-violet-400">
                      {index + 1}
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="text-lg font-bold text-white">
                          {nomination.title}
                        </h2>

                        <span className="rounded-full bg-violet-600/10 px-3 py-1 text-xs font-medium text-violet-300">
                          {nomination.type}
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-zinc-500">
                        {nomination.description ||
                          "Описание пока не добавлено."}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-wrap items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        toggleRegistration(nomination.id)
                      }
                      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                        nomination.registration
                          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      }`}
                    >
                      {nomination.registration
                        ? "Регистрация открыта"
                        : "Регистрация закрыта"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        editNomination(nomination)
                      }
                      className="rounded-xl border border-zinc-700 p-2.5 text-zinc-400 transition hover:border-violet-500 hover:text-white"
                      title="Редактировать"
                    >
                      <Edit3 size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteNomination(nomination.id)
                      }
                      className="rounded-xl border border-zinc-700 p-2.5 text-zinc-400 transition hover:border-red-500 hover:text-red-400"
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}