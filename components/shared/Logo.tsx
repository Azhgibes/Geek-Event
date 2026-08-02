export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-600/30">
        G
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          Geek Event
        </h1>

        <p className="text-xs text-zinc-400">
          Event Platform
        </p>
      </div>
    </div>
  );
}