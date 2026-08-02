interface EventContentProps {
  children: React.ReactNode;
}

export default function EventContent({
  children,
}: EventContentProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      {children}
    </div>
  );
}