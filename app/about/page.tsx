import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="mb-6 text-5xl font-bold">
          О Geek Event
        </h1>

        <p className="mb-6 text-lg text-zinc-300">
          Geek Event — единая платформа для фестивалей, конвентов,
          косплей-событий, K-POP мероприятий и всей гик-культуры.
        </p>

        <p className="text-zinc-400 leading-8">
          Наша цель — объединить организаторов, участников, жюри,
          партнеров и гостей на одной современной платформе.
          Здесь можно будет находить мероприятия, подавать заявки,
          публиковать новости, управлять фестивалями и
          взаимодействовать с сообществом.
        </p>
      </section>

      <Footer />
    </main>
  );
}