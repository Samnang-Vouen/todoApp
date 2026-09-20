import { useEffect, useState } from "react";
import { Clock as ClockIcon } from "lucide-react";

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-sm text-slate-500" aria-live="polite">
      <ClockIcon className="h-4 w-4" />
      <span className="tabular-nums">{formatTime(now)}</span>
    </div>
  );
}
