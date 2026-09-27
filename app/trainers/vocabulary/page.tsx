import { TrainerCard } from "@/components/TrainerCard";
import { vocabularySets } from "@/lib/content";

export const metadata = {
  title: "Словник — SaitEnglish",
};

export default function VocabularyListPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Словник</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Картки з перекладом і прикладами. Познач «Знаю» або «Ще вчу».
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {vocabularySets.map((s) => (
          <TrainerCard
            key={s.id}
            href={`/trainers/vocabulary/${s.id}`}
            title={s.title}
            description={s.description}
            level={s.level}
            meta={`${s.cards.length} карток`}
          />
        ))}
      </div>
    </div>
  );
}
