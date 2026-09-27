import Link from "next/link";

const nav = [
  { href: "/trainers/vocabulary", label: "Словник", icon: "Aa" },
  { href: "/trainers/grammar", label: "Граматика", icon: "✓" },
  { href: "/trainers/fill-blank", label: "Пропуски", icon: "___" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(11,17,32,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent)] text-xs font-extrabold text-white shadow-lg shadow-blue-500/20 transition group-hover:scale-105">
            EN
          </span>
          <span className="font-bold tracking-tight">SaitEnglish</span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] sm:px-3 sm:text-sm"
            >
              <span className="hidden text-[10px] opacity-70 sm:inline">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
