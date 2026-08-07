import Image from "next/image";

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
          className="object-cover object-center opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#090A15] via-[#090A15]/85 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl items-end justify-between px-6 pt-10 min-h-[580px]">

        {/* Левая часть */}
        <div className="z-20 max-w-[700px] pb-14">

          <span className="inline-flex rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            GEEK EVENT
          </span>

          <h1 className="mt-8 text-[68px] font-black leading-[1.12] tracking-[-2px] text-white">

            Главная платформа
            <br />

            


            <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              гик-событий в России
            </span>

            

          </h1>

          <p className="mt-8 max-w-[560px] text-lg leading-8 text-zinc-300">
            Фестивали, концерты, аниме, косплей, K-POP,
            игры, комиксы и всё, что объединяет современную
            гик-культуру.
          </p>

          <div className="mt-10 flex max-w-[560px] gap-4">

            <input
              placeholder="Найти мероприятие..."
              className="h-14 flex-1 rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 text-white outline-none transition focus:border-violet-500"
            />

            <button className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-8 font-semibold text-white transition hover:scale-105">
              Найти
            </button>

          </div>

        </div>

        {/* Lily */}
        <div className="relative hidden lg:flex w-[43%] items-end justify-end">

          <Image
            src="/images/lily.png"
            alt="Lily"
            width={760}
            height={1100}
            priority
            className="
              h-[620px]
              w-auto
              object-contain
              object-bottom
              translate-y-[2px]
              drop-shadow-[0_0_90px_rgba(120,80,255,.45)]
              pointer-events-none
              select-none
            "
          />

        </div>

      </div>

    </section>
  );
}