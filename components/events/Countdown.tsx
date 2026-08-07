"use client";

import { useEffect, useState } from "react";

interface CountdownProps 
{
  targetDate: string;
 }
 export default function Countdown({ targetDate }: CountdownProps) 
  {
 const [days, setDays] = useState(0);

  useEffect(() => 
     {
      const update = () => {
      const target = new Date(targetDate + "T00:00:00").getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setDays(0);
        return;
      }

      setDays(Math.ceil(difference / (1000 * 60 * 60 * 24)));
    };

    update();

    const interval = setInterval(update, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="rounded-xl bg-violet-600/15 border border-violet-500/30 p-3 text-center">
      <p className="text-xs uppercase tracking-wider text-violet-300">
        До начала
      </p>

      <p className="mt-1 text-2xl font-bold text-white">
        {days} дней
      </p>
    </div>
  );
}