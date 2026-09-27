import type { Level } from "@/lib/types";

const colors: Record<Level, string> = {
  A1: "bg-emerald-500/20 text-emerald-300",
  A2: "bg-sky-500/20 text-sky-300",
  B1: "bg-violet-500/20 text-violet-300",
  B2: "bg-amber-500/20 text-amber-300",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${colors[level]}`}
    >
      {level}
    </span>
  );
}
