import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Events from "../components/home/Events";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />
      <Hero />
      <Events />
      <Footer />
    </main>
  );
}