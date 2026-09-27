import Link from "next/link";
import { notFound } from "next/navigation";
import { FlashcardTrainer } from "@/components/FlashcardTrainer";
import { LevelBadge } from "@/components/LevelBadge";
import { getVocabularyById } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { vocabularySets } = await import("@/lib/content");
  return vocabularySets.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const set = getVocabularyById(id);
  if (!set) return {};
  return { title: `${set.title} — SaitEnglish` };
}

export default async function VocabularySetPage({ params }: Props) {
  const { id } = await params;
  const set = getVocabularyById(id);
  if (!set) notFound();

  return (
    <div>
      <Link
        href="/trainers/vocabulary"
        className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
      >
        ← Усі набори слів
      </Link>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{set.title}</h1>
        <LevelBadge level={set.level} />
      </div>
      <p className="mt-2 text-[var(--color-muted)]">{set.description}</p>
      <div className="mt-8">
        <FlashcardTrainer set={set} />
      </div>
    </div>
  );
}
