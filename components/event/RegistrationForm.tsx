"use client";

import { useEffect, useState } from "react";

interface RegistrationFormProps {
  eventTitle: string;
  nominationTitle: string;
}

interface UserProfile {
  name: string;
  surname?: string;
  email: string;
  isLoggedIn?: boolean;
}

export default function RegistrationForm({
  eventTitle,
  nominationTitle,
}: RegistrationFormProps) {
  const [user, setUser] = useState<UserProfile | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [social, setSocial] = useState("");
  const [comment, setComment] = useState("");

  /*
   * Загружаем текущего пользователя
   */
  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    const savedUser = localStorage.getItem("geek-event-user");

    if (!savedUser) {
      setUser(null);
      return;
    }

    try {
      const parsedUser: UserProfile = JSON.parse(savedUser);

      /*
       * Пользователь считается авторизованным
       * только если isLoggedIn === true
       */
      if (parsedUser.isLoggedIn !== true) {
        setUser(null);
        return;
      }

      setUser(parsedUser);

      /*
       * Автоматически заполняем данные заявки
       */
      const fullName = [
        parsedUser.name,
        parsedUser.surname,
      ]
        .filter(Boolean)
        .join(" ");

      setName(fullName);
      setEmail(parsedUser.email || "");
    } catch {
      setUser(null);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    /*
     * Повторно проверяем авторизацию
     * непосредственно перед отправкой заявки.
     */
    const savedUser = localStorage.getItem("geek-event-user");

    if (!savedUser) {
      alert("Сначала войдите в аккаунт.");
      window.location.href = "/login";
      return;
    }

    let currentUser: UserProfile;

    try {
      currentUser = JSON.parse(savedUser);
    } catch {
      alert("Не удалось определить аккаунт.");
      window.location.href = "/login";
      return;
    }

    /*
     * Проверяем именно статус авторизации
     */
    if (currentUser.isLoggedIn !== true) {
      alert("Сначала войдите в аккаунт.");
      window.location.href = "/login";
      return;
    }

    /*
     * Создаём заявку
     */
    const application = {
      id: crypto.randomUUID(),

      eventTitle,
      nominationTitle,

      participant: {
        name,
        email,
        nickname,
        phone,
        social,
        comment,
      },

      user: {
        name: currentUser.name,
        surname: currentUser.surname || "",
        email: currentUser.email,
      },

      status: "new",

      createdAt: new Date().toISOString(),
    };

    /*
     * Получаем существующие заявки
     */
    const savedApplications = localStorage.getItem(
      "geek-event-applications"
    );

    let applications = [];

    try {
      applications = savedApplications
        ? JSON.parse(savedApplications)
        : [];
    } catch {
      applications = [];
    }

    /*
     * Добавляем новую заявку
     */
    applications.push(application);

    /*
     * Сохраняем
     */
    localStorage.setItem(
      "geek-event-applications",
      JSON.stringify(applications)
    );

    alert("Заявка успешно отправлена!");

    console.log("Новая заявка:", application);

    /*
     * После подачи заявки можно перейти
     * в личный кабинет.
     */
    window.location.href = "/account";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Данные участника */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-white">
            Данные участника
          </h2>

          {user ? (
            <p className="mt-2 text-sm text-green-400">
              ✓ Данные подтянуты из вашего аккаунта
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-400">
              ⚠ Необходимо войти в аккаунт
            </p>
          )}

        </div>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Имя */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Имя и фамилия
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя и фамилию"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.ru"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
            />
          </div>

          {/* Никнейм */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Никнейм
            </label>

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ваш никнейм"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
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
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
            />
          </div>

        </div>
      </div>

      {/* Информация об участии */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Информация об участии
        </h2>

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Ссылка на профиль / соцсеть
          </label>

          <input
            type="url"
            value={social}
            onChange={(e) => setSocial(e.target.value)}
            placeholder="https://vk.com/..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
          />

        </div>

        <div className="mt-5">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Комментарий
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Дополнительная информация для организатора..."
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
          />

        </div>

      </div>

      {/* Информация о заявке */}

      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 text-sm text-zinc-400">

        Вы подаёте заявку на мероприятие{" "}

        <span className="font-semibold text-white">
          {eventTitle}
        </span>

        {" "}в номинацию{" "}

        <span className="font-semibold text-violet-300">
          {nominationTitle}
        </span>

        .

      </div>

      {/* Кнопка */}

      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-violet-500"
      >
        Подать заявку
      </button>

    </form>
  );
}