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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div className="flex gap-6">

          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-zinc-400 transition hover:text-violet-400"
            >
              {link.title}
            </button>
          ))}

        </div>

        <button className="rounded-xl bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500">
          Подать заявку
        </button>

      </div>
    </nav>
  );
}