import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090A15]">

      {/* Фон */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#090A15] via-[#090A15]/85 to-[#090A15]/40" />

        {/* Затемнение снизу для мобильных */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A15] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Контент */}
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-10 sm:px-6 sm:py-14 lg:min-h-[650px] lg:px-8 lg:py-12">

        {/* Левая часть */}
        <div className="relative z-20 w-full max-w-[600px] lg:max-w-[580px]">

          <span className="inline-flex rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300 sm:px-4 sm:py-2 sm:text-sm">
            GEEK EVENT
          </span>

          <h1 className="mt-5 text-[2.7rem] font-black leading-[1.02] tracking-tight text-white sm:mt-7 sm:text-5xl lg:mt-8 lg:text-6xl">
            Главная платформа{" "}

            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              гик-событий
            </span>{" "}

            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              России
            </span>
          </h1>

          <p className="mt-5 max-w-[520px] text-base leading-7 text-zinc-300 sm:mt-7 sm:text-lg sm:leading-8">
            Фестивали, концерты, аниме, косплей, K-POP,
            игры, комиксы и всё, что объединяет
            современную гик-культуру.
          </p>

          {/* Поиск и создание мероприятия */}
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9">

            {/* Верхняя строка: поиск + Найти */}
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">

              <input
                placeholder="Найти мероприятие..."
                className="h-13 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900/85 px-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-violet-500"
              />

              <button
                type="button"
                className="h-13 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-8 font-semibold text-white transition hover:scale-105"
              >
                Найти
              </button>

            </div>

            {/* Создать мероприятие */}
            <Link
              href="/create-event"
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/10 px-6 font-semibold text-violet-200 backdrop-blur-sm transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-white sm:w-fit"
            >
              <span className="text-lg transition-transform group-hover:rotate-90">
                +
              </span>

              Создать мероприятие
            </Link>

          </div>

        </div>

        {/* Lily */}
        <div className="pointer-events-none absolute bottom-0 right-[-80px] z-10 hidden sm:block lg:right-0">

          <Image
            src="/images/lily.png"
            alt="Lily"
            width={760}
            height={1100}
            priority
            className="
              h-[500px]
              w-auto
              select-none
              object-contain
              object-bottom
              drop-shadow-[0_0_70px_rgba(130,80,255,.40)]
              lg:h-[650px]
            "
          />

        </div>

        {/* Lily для маленьких экранов */}
        <div className="pointer-events-none absolute bottom-0 right-[-110px] z-10 sm:hidden">

          <Image
            src="/images/lily.png"
            alt=""
            width={500}
            height={750}
            priority
            className="
              h-[390px]
              w-auto
              select-none
              object-contain
              object-bottom
              opacity-35
            "
          />

        </div>

      </div>

    </section>
  );
}