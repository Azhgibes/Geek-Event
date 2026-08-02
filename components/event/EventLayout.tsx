import EventSidebar from "./EventSidebar";
import EventContent from "./EventContent";

interface EventLayoutProps {
  children: React.ReactNode;
}

export default function EventLayout({
  children,
}: EventLayoutProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

        <EventSidebar />

        <EventContent>
          {children}
        </EventContent>

      </div>
    </section>
  );
}