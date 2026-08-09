"use client";

const links = [
  {
    title: "О фестивале",
    id: "about",
  },
  {
    title: "Номинации",
    id: "categories",
  },
  {
    title: "Программа",
    id: "schedule",
  },
  {
    title: "Партнёры",
    id: "partners",
  },
  {
    title: "FAQ",
    id: "faq",
  },
];

export default function EventNavigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

        {/* Навигация */}
        <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex w-max gap-5 sm:gap-6">

            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="whitespace-nowrap text-sm font-medium text-zinc-400 transition hover:text-violet-400"
              >
                {link.title}
              </button>
            ))}

          </div>
        </div>

        {/* Кнопка заявки */}
        <button className="shrink-0 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 sm:px-5">
          Подать заявку
        </button>

      </div>
    </nav>
  );
}