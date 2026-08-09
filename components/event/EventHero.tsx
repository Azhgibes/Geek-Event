import Image from "next/image";

interface EventHeroProps {
  title: string;
  city: string;
  date: string;
  image: string;
  participants: number;
  rating: number;
  registration: boolean;
}

export default function EventHero({
  title,
  city,
  date,
  image,
  participants,
  rating,
  registration,
}: EventHeroProps) {
  return (
    <section className="relative min-h-[520px] overflow-hidden sm:min-h-[560px] lg:h-[600px] lg:min-h-0">

      {/* Фоновое изображение */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/65 to-black/20" />

      {/* Дополнительное затемнение слева на больших экранах */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-black/40 via-transparent to-transparent lg:block" />

      {/* Контент */}
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-7 sm:px-6 sm:pb-9 lg:px-8 lg:pb-10">

        {/* Статус */}
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg sm:px-4 sm:py-2 sm:text-sm ${
            registration
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {registration
            ? "Регистрация открыта"
            : "Регистрация закрыта"}
        </span>

        {/* Название */}
        <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:mt-5 sm:text-5xl lg:text-7xl">
          {title}
        </h1>

        {/* Информация */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-200 sm:mt-6 sm:gap-6 sm:text-base lg:text-lg">

          <span className="whitespace-nowrap">
            📍 {city}
          </span>

          <span className="whitespace-nowrap">
            📅 {date}
          </span>

          <span className="whitespace-nowrap">
            👥 {participants}
          </span>

          <span className="whitespace-nowrap">
            ⭐ {rating}
          </span>

        </div>

        {/* Кнопка */}
        <button className="mt-6 w-full rounded-xl bg-violet-600 px-6 py-3.5 text-base font-bold text-white transition hover:bg-violet-500 sm:mt-8 sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
          Подать заявку
        </button>

      </div>

    </section>
  );
}