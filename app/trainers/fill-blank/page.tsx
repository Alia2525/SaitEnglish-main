import { TrainerCard } from "@/components/TrainerCard";
import { fillBlankExercises } from "@/lib/content";

export const metadata = {
  title: "Пропуски — SaitEnglish",
};

export default function FillBlankListPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Вправи з пропусками</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Обери правильне слово або артикль у реченні.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {fillBlankExercises.map((e) => (
          <TrainerCard
            key={e.id}
            href={`/trainers/fill-blank/${e.id}`}
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
