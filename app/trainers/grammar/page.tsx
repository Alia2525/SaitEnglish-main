import { TrainerCard } from "@/components/TrainerCard";
import { grammarExercises } from "@/lib/content";

export const metadata = {
  title: "Граматика — SaitEnglish",
};

export default function GrammarListPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Граматика</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Обери тему та відповідай на питання з множинним вибором.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {grammarExercises.map((e) => (
          <TrainerCard
            key={e.id}
            href={`/trainers/grammar/${e.id}`}
            title={e.title}
            description={e.description}
            level={e.level}
            meta={`${e.questions.length} питань`}
          />
        ))}
      </div>
    </div>
  );
}
