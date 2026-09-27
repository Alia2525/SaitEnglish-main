import Link from "next/link";
import { notFound } from "next/navigation";
import { MultipleChoiceTrainer } from "@/components/MultipleChoiceTrainer";
import { LevelBadge } from "@/components/LevelBadge";
import { getGrammarById } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { grammarExercises } = await import("@/lib/content");
  return grammarExercises.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const exercise = getGrammarById(id);
  if (!exercise) return {};
  return { title: `${exercise.title} — SaitEnglish` };
}

export default async function GrammarExercisePage({ params }: Props) {
  const { id } = await params;
  const exercise = getGrammarById(id);
  if (!exercise) notFound();

  return (
    <div>
      <Link
        href="/trainers/grammar"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
      >
        ← Усі теми з граматики
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{exercise.title}</h1>
        <LevelBadge level={exercise.level} />
      </div>
      <p className="mt-2 text-[var(--color-muted)]">{exercise.description}</p>
      <div className="mt-8">
        <MultipleChoiceTrainer exercise={exercise} />
      </div>
    </div>
  );
}
