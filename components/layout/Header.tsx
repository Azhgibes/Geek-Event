"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, LogIn, LogOut, Menu, X } from "lucide-react";

interface UserData {
  name: string;
  surname?: string;
  email: string;
  isLoggedIn?: boolean;
}

export default function Header() {
  const [user, setUser] = useState<UserData | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.isLoggedIn === true) {
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }

  function handleLogout() {
    const savedUser = localStorage.getItem("geek-event-user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        parsedUser.isLoggedIn = false;

        localStorage.setItem(
          "geek-event-user",
          JSON.stringify(parsedUser)
        );
      } catch {
        localStorage.removeItem("geek-event-user");
      }
    }

    // Полностью обновляем сайт,
    // чтобы Header сразу увидел выход.
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Логотип */}

        <Link
          href="/"
          className="text-xl font-black tracking-tight text-white transition hover:text-violet-400"
        >
          Geek <span className="text-violet-500">Event</span>
        </Link>

        {/* Навигация */}

        <nav className="hidden items-center gap-6 md:flex">

          <Link
            href="/events"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Мероприятия
          </Link>

          <Link
            href="/organizer"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Организаторам
          </Link>

        </nav>

        {/* Правая часть */}

        <div className="hidden items-center gap-3 md:flex">

          {user ? (
            <>
              {/* Профиль */}

              <Link
                href="/account"
                className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 transition hover:border-violet-500 hover:bg-zinc-800"
              >

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
                  <User size={17} />
                </div>

                <span className="max-w-[150px] truncate text-sm font-semibold text-white">
                  {user.name}
                </span>

              </Link>

              {/* Выход */}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-red-400"
              >
                <LogOut size={17} />
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:text-white"
              >
                <LogIn size={17} />
                Войти
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Регистрация
              </Link>
            </>
          )}

        </div>

        {/* Мобильная кнопка */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-zinc-300 md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Мобильное меню */}

      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              href="/events"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300"
            >
              Мероприятия
            </Link>

            <Link
              href="/organizer"
              onClick={() => setMobileOpen(false)}
              className="text-zinc-300"
            >
              Организаторам
            </Link>

            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-white"
                >
                  <User size={18} />
                  {user.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left text-red-400"
                >
                  <LogOut size={18} />
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-300"
                >
                  Войти
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="text-violet-400"
                >
                  Регистрация
                </Link>
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}