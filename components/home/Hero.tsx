import SearchInput from "./SearchInput";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-700/20 via-transparent to-cyan-500/20" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <span className="mb-4 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm">
          🎉 Добро пожаловать в Geek Event
        </span>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          Единая платформа
          

          для гик-мероприятий
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Cosplay • K-POP • Anime • Games • Comics • VTubers
        </p>

        <SearchInput/>
      </div>
    </section>
  );
}