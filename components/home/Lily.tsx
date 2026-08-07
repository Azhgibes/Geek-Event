import Image from "next/image";

export default function Lily() {
  return (
    <div className="relative">

      {/* Неоновое свечение */}
      <div className="absolute right-24 top-24 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[140px]" />

      <Image
        src="/characters/lily.png"
        alt="Lily"
        width={900}
        height={1100}
        priority
        className="
          relative
          z-10
          w-[760px]
          max-w-none
          object-contain
          drop-shadow-[0_0_90px_rgba(160,80,255,.55)]
        "
      />

    </div>
  );
}