import Link from "next/link";
import { notFound } from "next/navigation";
import { FillBlankTrainer } from "@/components/FillBlankTrainer";
import { LevelBadge } from "@/components/LevelBadge";
import { getFillBlankById } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { fillBlankExercises } = await import("@/lib/content");
  return fillBlankExercises.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const exercise = getFillBlankById(id);
  if (!exercise) return {};
  return { title: `${exercise.title} — SaitEnglish` };
}

export default async function FillBlankExercisePage({ params }: Props) {
  const { id } = await params;
  const exercise = getFillBlankById(id);
  if (!exercise) notFound();

  return (
    <div>
      <Link
        href="/trainers/fill-blank"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
      >
        ← Усі вправи з пропусками
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{exercise.title}</h1>
        <LevelBadge level={exercise.level} />
      </div>
      <p className="mt-2 text-[var(--color-muted)]">{exercise.description}</p>
      <div className="mt-8">
        <FillBlankTrainer exercise={exercise} />
      </div>
    </div>
  );
}
