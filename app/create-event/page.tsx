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
surname?: string;
email: string;
password?: string;
isLoggedIn?: boolean;
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
nominations?: any[];
status: "pending" | "published" | "rejected";
createdAt: string;
organizer: {
name: string;
email: string;
};
}

interface Nomination {
  id: string;
  title: string;
  description: string;
  type: string;
  registration: boolean;
}

export default function CreateEventPage() {
const router = useRouter();

const [user, setUser] = useState<UserData | null>(null);
const [checkingAuth, setCheckingAuth] = useState(true);

const [title, setTitle] = useState("");
const [city, setCity] = useState("");
const [venue, setVenue] = useState("");
const [address, setAddress] = useState("");
const [date, setDate] = useState("");
const [description, setDescription] = useState("");
const [nominations, setNominations] = useState<Nomination[]>([]);

const [nominationTitle, setNominationTitle] = useState("");
const [nominationDescription, setNominationDescription] = useState("");
const [nominationType, setNominationType] = useState("Cosplay");
const [nominationRegistration, setNominationRegistration] = useState(true);

useEffect(() => {
const savedUser = localStorage.getItem("geek-event-user");

if (!savedUser) {
router.replace("/login");
return;
}

try {
const parsedUser: UserData = JSON.parse(savedUser);

if (parsedUser.isLoggedIn !== true) {
router.replace("/login");
return;
}

setUser(parsedUser);
setCheckingAuth(false);
} catch {
localStorage.removeItem("geek-event-user");
router.replace("/login");
}
}, [router]);

const addNomination = () => {

  if (!nominationTitle.trim()) {
    return;
  }

  const newNomination: Nomination = {
    id: crypto.randomUUID(),

    title: nominationTitle.trim(),

    description:
      nominationDescription.trim(),

    type:
      nominationType,

    registration:
      nominationRegistration,
  };

  setNominations((current) => [
    ...current,
    newNomination,
  ]);

  setNominationTitle("");
  setNominationDescription("");
  setNominationType("Cosplay");
  setNominationRegistration(true);
};
const removeNomination = (id: string) => {

  setNominations((current) =>
    current.filter(
      (nomination) =>
        nomination.id !== id
    )
  );

};
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
event.preventDefault();

if (!user) {
return;
}

const slug = title
  .toLowerCase()
  .replace(/[^a-zа-яё0-9]+/gi, "-")
  .replace(/^-|-$/g, "");

const newEvent: CreatedEvent = {
id: crypto.randomUUID(),

slug,

title: title.trim(),
city: city.trim(),
venue: venue.trim() || undefined,
address: address.trim() || undefined,
date,
description: description.trim(),

shortDescription:
    description.trim(),

  heroText:
    "Cosplay • K-POP • Anime • Games • Comics • Geek Show",

  categories: [
    "Cosplay",
    "K-POP",
    "Anime",
    "Games",
    "Comics",
    "Geek",
  ],

  participants:
    0,

  rating:
    0,

  registration:
    true,

  nominations:
    nominations,
organizer: {
name: `${user.name} ${user.surname || ""}`.trim(),
email: user.email,
},

// Новое мероприятие сначала отправляется
// на рассмотрение администрации.
status: "pending",

createdAt: new Date().toISOString(),
};

const savedEvents = localStorage.getItem("geek-event-created");

let events: CreatedEvent[] = [];

if (savedEvents) {
try {
const parsedEvents = JSON.parse(savedEvents);

if (Array.isArray(parsedEvents)) {
events = parsedEvents;
}
} catch {
events = [];
}
}

events.push(newEvent);

localStorage.setItem(
"geek-event-created",
JSON.stringify(events)
);

// После создания возвращаем организатора
// в его личный кабинет.
router.push("/account");
};

if (checkingAuth) {
return (
<main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-white">
<div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-8 py-6 text-center">
<p className="text-zinc-400">
Проверяем аккаунт...
</p>
</div>
</main>
);
}

if (!user) {
return null;
}

return (
<main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
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
Создайте мероприятие и отправьте его на
рассмотрение администрации Geek Event.
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
onChange={(event) =>
setTitle(event.target.value)
}
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
onChange={(event) =>
setCity(event.target.value)
}
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
onChange={(event) =>
setVenue(event.target.value)
}
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
onChange={(event) =>
setAddress(event.target.value)
}
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
onChange={(event) =>
setDate(event.target.value)
}
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
onChange={(event) =>
setDescription(event.target.value)
}
placeholder="Расскажите о вашем мероприятии..."
rows={6}
required
className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
/>

</div>

</div>

</section>

{/* Номинации */}

<section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

  <div className="mb-6">

    <h2 className="text-xl font-bold text-white">
      Номинации
    </h2>

    <p className="mt-1 text-sm text-zinc-500">
      Создайте номинации, в которых участники смогут зарегистрироваться.
    </p>

  </div>

  {nominations.length > 0 && (

    <div className="mb-8 space-y-4">

      {nominations.map((nomination, index) => (

        <div
          key={nomination.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
        >

          <div className="flex items-start justify-between gap-4">

            <div>

              <div className="text-xs font-medium text-violet-400">
                Номинация {index + 1}
              </div>

              <h3 className="mt-1 text-lg font-bold text-white">
                {nomination.title}
              </h3>

              {nomination.description && (
                <p className="mt-2 text-sm text-zinc-400">
                  {nomination.description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">

                <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                  {nomination.type}
                </span>

                <span
                  className={
                    nomination.registration
                      ? "rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400"
                      : "rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-500"
                  }
                >
                  {nomination.registration
                    ? "Регистрация открыта"
                    : "Регистрация закрыта"}

                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                removeNomination(nomination.id)
              }
              className="shrink-0 rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              Удалить
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

    <h3 className="font-semibold text-white">
      Добавить номинацию
    </h3>

    <div className="mt-5 space-y-4">

      <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Название номинации
        </label>

        <input
          type="text"
          value={nominationTitle}
          onChange={(event) =>
            setNominationTitle(event.target.value)
          }
          placeholder="Например, K-POP SOLO"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Описание
        </label>

        <textarea
          value={nominationDescription}
          onChange={(event) =>
            setNominationDescription(event.target.value)
          }
          placeholder="Расскажите, что представляет собой эта номинация..."
          rows={4}
          className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        />

      </div>

      <div>

        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Тип номинации
        </label>

        <select
          value={nominationType}
          onChange={(event) =>
            setNominationType(event.target.value)
          }
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-violet-500"
        >
          <option value="Cosplay">
            Cosplay
          </option>

          <option value="K-POP">
            K-POP
          </option>

          <option value="Dance">
            Dance
          </option>

          <option value="Music">
            Music
          </option>

          <option value="Show">
            Show
          </option>

          <option value="Geek">
            Geek
          </option>

          <option value="Sport">
            Sport
          </option>

          <option value="Other">
            Другое
          </option>

        </select>

      </div>

      <label className="flex cursor-pointer items-center gap-3">

        <input
          type="checkbox"
          checked={nominationRegistration}
          onChange={(event) =>
            setNominationRegistration(
              event.target.checked
            )
          }
          className="h-4 w-4 accent-violet-600"
        />

        <span className="text-sm text-zinc-300">
          Регистрация на номинацию открыта
        </span>

      </label>

      <button
        type="button"
        onClick={addNomination}
        className="w-full rounded-xl border border-violet-500/40 bg-violet-500/10 px-5 py-3 font-semibold text-violet-300 transition hover:bg-violet-500/20"
      >
        + Добавить номинацию
      </button>

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
Отправить на рассмотрение
</button>

</div>

</form>

</div>
</main>
);
}