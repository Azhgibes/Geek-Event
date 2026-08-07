import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="mb-6 text-5xl font-bold">
          Новости
        </h1>

        <p className="text-zinc-400 text-lg">
          Здесь будут публиковаться новости фестивалей, обновления платформы,
          анонсы мероприятий и статьи из мира гик-культуры.
        </p>
      </section>

      <Footer />
    </main>
  );
}