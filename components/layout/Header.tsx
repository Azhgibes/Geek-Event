"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  Bell,
  User,
  Menu,
} from "lucide-react";

import GradientButton from "@/components/design/GradientButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090A15]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 text-xl font-black text-white shadow-lg shadow-violet-500/30 md:h-12 md:w-12 md:text-2xl">
            G
          </div>

          <div>
            <div className="text-xl font-black tracking-wide text-white md:text-2xl">
              GEEK
            </div>

            <div className="-mt-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-xs font-bold text-transparent md:text-sm">
              EVENT
            </div>
          </div>

        </Link>

        {/* Desktop navigation */}

        <nav className="hidden gap-10 lg:flex">

          <Link href="/events" className="text-zinc-300 hover:text-white">
            Мероприятия
          </Link>

          <Link href="/organizers" className="text-zinc-300 hover:text-white">
            Организаторам
          </Link>

          <Link href="/news" className="text-zinc-300 hover:text-white">
            Новости
          </Link>

          <Link href="/about" className="text-zinc-300 hover:text-white">
            О проекте
          </Link>

          <Link href="/contacts" className="text-zinc-300 hover:text-white">
            Контакты
          </Link>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-2 md:gap-4">

          {/* Desktop icons */}

          <button className="hidden md:block text-zinc-400 hover:text-white">
            <Search size={20} />
          </button>

          <button className="hidden md:block text-zinc-400 hover:text-pink-400">
            <Heart size={20} />
          </button>

          <button className="hidden md:block text-zinc-400 hover:text-violet-400">
            <Bell size={20} />
          </button>

          <button className="hidden md:block text-zinc-400 hover:text-white">
            <User size={20} />
          </button>

          {/* Desktop button */}

          <Link href="/register" className="hidden md:block">
            <GradientButton>
              Регистрация
            </GradientButton>
          </Link>

          {/* Mobile */}

          <button className="md:hidden text-zinc-300">
            <Search size={22} />
          </button>

          <button className="md:hidden text-zinc-300">
            <User size={22} />
          </button>

          <button className="md:hidden text-white">
            <Menu size={28} />
          </button>

        </div>

      </div>
    </header>
  );
}



