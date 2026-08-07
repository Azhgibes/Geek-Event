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

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-2xl font-black text-white shadow-lg shadow-violet-500/30">
            G
          </div>

          <div>

            <div className="text-2xl font-black tracking-wide text-white">
              GEEK
            </div>

            <div className="-mt-1 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-sm font-bold text-transparent">
              EVENT
            </div>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden gap-10 lg:flex">

          <Link href="/events" className="text-zinc-300 transition hover:text-white">
            Мероприятия
          </Link>

          <Link href="/organizers" className="text-zinc-300 transition hover:text-white">
            Организаторам
          </Link>

          <Link href="/news" className="text-zinc-300 transition hover:text-white">
            Новости
          </Link>

          <Link href="/about" className="text-zinc-300 transition hover:text-white">
            О проекте
          </Link>

          <Link href="/contacts" className="text-zinc-300 transition hover:text-white">
            Контакты
          </Link>

        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          <button className="text-zinc-400 hover:text-white">
            <Search size={21} />
          </button>

          <button className="text-zinc-400 hover:text-pink-400">
            <Heart size={21} />
          </button>

          <button className="text-zinc-400 hover:text-violet-400">
            <Bell size={21} />
          </button>

          <button className="text-zinc-400 hover:text-white">
            <User size={21} />
          </button>

         <Link href="/register">
            <GradientButton>
             Регистрация
            </GradientButton>
         </Link>

          <button className="lg:hidden text-white">
            <Menu />
          </button>

        </div>

      </div>

    </header>
  );
}