import Link from "next/link";
import { TrainerCard } from "@/components/TrainerCard";
import { grammarExercises, vocabularySets, fillBlankExercises } from "@/lib/content";

const categories = [
  {
    title: "Граматика",
    text: "Закріплюй правила через короткі тести та одразу бач правильне пояснення.",
    href: "/trainers/grammar",
    icon: "✓",
  },
  {
    title: "Словник",
    text: "Запам’ятовуй слова за допомогою інтерактивних карток EN ↔ UA.",
    href: "/trainers/vocabulary",
    icon: "Aa",
  },
  {
    title: "Пропуски",
    text: "Тренуй артиклі та правильні форми слів у реальних реченнях.",
    href: "/trainers/fill-blank",
    icon: "___",
  },
];

export default function HomePage() {
  const featured = [
    ...grammarExercises.slice(0, 2).map((e) => ({
      href: `/trainers/grammar/${e.id}`,
      title: e.title,
      description: e.description,
      level: e.level,
      meta: `${e.questions.length} питань`,
    })),
    ...vocabularySets.slice(0, 1).map((s) => ({
      href: `/trainers/vocabulary/${s.id}`,
      title: s.title,
      description: s.description,
      level: s.level,
      meta: `${s.cards.length} слів`,
    })),
  ];

  const totalExercises =
    grammarExercises.length + vocabularySets.length + fillBlankExercises.length;

  return (
    <div className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[620px] -z-10" />

      <section className="relative mb-16 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/55 px-5 py-12 sm:px-10 sm:py-16">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
            Без реєстрації · прогрес у браузері
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Англійська, яку
            <span className="block text-[var(--color-accent)]">можна практикувати</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            Короткі інтерактивні вправи для граматики, словника та артиклів.
            Відповідай, отримуй пояснення й бач свій найкращий результат.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/trainers/grammar"
              className="rounded-xl bg-[var(--color-accent)] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5"
            >
              Почати навчання →
            </Link>
            <Link
              href="#trainers"
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 font-semibold transition hover:bg-[var(--color-surface-hover)]"
            >
              Переглянути тренажери
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-muted)]">
            <span><b className="text-[var(--color-text)]">{totalExercises}</b> тренажерів</span>
            <span><b className="text-[var(--color-text)]">A1–B2</b> рівні</span>
            <span><b className="text-[var(--color-text)]">100%</b> безкоштовно</span>
          </div>
        </div>
      </section>

      <section id="trainers" className="scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Практика
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Обери тренажер</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <TrainerCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((block) => (
            <Link
              key={block.href}
              href={block.href}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/55 p-5 transition hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-[var(--color-accent)]">
                {block.icon}
              </span>
              <h3 className="mt-4 font-bold">{block.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{block.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] transition group-hover:translate-x-1">
                Відкрити →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
