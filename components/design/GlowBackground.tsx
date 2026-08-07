export default function GlowBackground() {
  return (
    <>
      <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="absolute right-0 top-32 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />
    </>
  );
}