import Link from "next/link";
import { Search, User, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 font-bold">
            G
          </div>

          <div>
            <div className="font-bold text-white">
              Geek Event
            </div>

            <div className="text-xs text-zinc-400">
              Geek Event Platform
            </div>
          </div>
        </div>

        <nav className="hidden gap-8 lg:flex">
          <Link
           href="/events"
           className="text-zinc-300 transition hover:text-white"
          >
           Мероприятия
          </Link>

          <a className="text-zinc-300 hover:text-white" href="#">
            Новости
          </a>

          <a className="text-zinc-300 hover:text-white" href="#">
            Организаторам
          </a>
        </nav>

        <div className="flex items-center gap-3">

          <Button variant="outline" size="icon">
            <Search size={18}/>
          </Button>

          <Link href="/login">
           <Button variant="outline">
             <User size={18} />
             Войти
           </Button>
          </Link>

          <Button>
            <CalendarDays size={18}/>
            Создать мероприятие
          </Button>

        </div>

      </div>
    </header>
  );
}