import {
  Drama,
  Music2,
  Gamepad2,
  BookOpen,
  Store,
  Swords,
  Dices,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Cosplay",
    description: "Косплей-фестивали и дефиле",
    icon: Drama,
  },
  {
    title: "K-POP",
    description: "Фестивали корейской культуры",
    icon: Music2,
  },
  {
    title: "Anime",
    description: "Аниме и японская культура",
    icon: Sparkles,
  },
  {
    title: "Games",
    description: "Игровые фестивали",
    icon: Gamepad2,
  },
  {
    title: "TCG",
    description: "Коллекционные карточные игры",
    icon: BookOpen,
  },
  {
    title: "Artist Alley",
    description: "Ярмарка авторов",
    icon: Store,
  },
  {
    title: "Geek Stage",
    description: "Шоу и сценические выступления",
    icon: Swords,
  },
  {
    title: "Board Games",
    description: "Настольные игры",
    icon: Dices,
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white">
          Исследуйте категории
        </h2>

        <p className="mt-3 text-zinc-400">
          Выберите интересующее направление и найдите мероприятия по всей России.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.title}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:bg-zinc-800"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 transition group-hover:bg-violet-600 group-hover:text-white">
                <Icon size={30} />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}