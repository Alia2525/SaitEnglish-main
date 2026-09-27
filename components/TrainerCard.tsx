import Link from "next/link";
import { LevelBadge } from "./LevelBadge";
import type { Level } from "@/lib/types";

type Props = {
  href: string;
  title: string;
  description: string;
  level: Level;
  meta?: string;
};

export function TrainerCard({ href, title, description, level, meta }: Props) {
  return (
    <Link
      href={href}
      className="card-shine group flex min-h-44 flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-5 shadow-lg shadow-black/5 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-surface-hover)] hover:shadow-blue-950/20"
    >
      <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
          {title}
        </h3>
        <LevelBadge level={level} />
      </div>

      <p className="relative z-10 flex-1 text-sm leading-6 text-[var(--color-muted)]">
        {description}
      </p>

      <div className="relative z-10 mt-5 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <p className="text-xs font-medium text-[var(--color-muted)]">{meta}</p>
        <span className="text-sm text-[var(--color-accent)] transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
