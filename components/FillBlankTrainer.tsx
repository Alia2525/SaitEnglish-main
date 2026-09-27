"use client";

import { useState } from "react";
import type { FillBlankExercise } from "@/lib/types";
import { saveScore } from "@/lib/progress";

type Props = {
  exercise: FillBlankExercise;
};

export function FillBlankTrainer({ exercise }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = exercise.questions[index];
  const total = exercise.questions.length;
  const display = q.sentence.replace("___", "______");

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === q.correct) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (index + 1 >= total) {
      saveScore(exercise.id, Math.round((correctCount / total) * 100));
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (finished) {
    const score = Math.round((correctCount / total) * 100);
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-4xl font-bold text-[var(--color-accent)]">{score}%</p>
        <p className="mt-2 text-[var(--color-muted)]">
          Правильно {correctCount} з {total}
        </p>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setSelected(null);
            setCorrectCount(0);
            setFinished(false);
          }}
          className="mt-6 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Спробувати ще раз
        </button>
      </div>
    );
  }

  const answered = selected !== null;

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 shadow-xl shadow-black/10 sm:p-8">
      <p className="mb-2 text-sm text-[var(--color-muted)]">
        Питання {index + 1} / {total}
      </p>
      <p className="text-xl font-medium">{display}</p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {q.options.map((opt, i) => {
          let cls =
            "rounded-xl border px-4 py-3 text-center transition ";
          if (!answered) {
            cls += "border-[var(--color-border)] hover:border-[var(--color-accent)]";
          } else if (i === q.correct) {
            cls += "border-[var(--color-success)] bg-[var(--color-success)]/10";
          } else if (i === selected) {
            cls += "border-[var(--color-error)] bg-[var(--color-error)]/10";
          } else {
            cls += "border-[var(--color-border)] opacity-50";
          }
          return (
            <li key={i}>
              <button type="button" className={cls + " w-full"} onClick={() => choose(i)}>
                {opt === "—" ? "без арт." : opt}
              </button>
            </li>
          );
        })}
      </ul>

      {answered && q.explanation && (
        <p className="mt-4 text-sm text-[var(--color-muted)]">{q.explanation}</p>
      )}

      {answered && (
        <button
          type="button"
          onClick={next}
          className="mt-6 rounded-xl bg-[var(--color-accent)] px-8 py-3 font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          {index + 1 >= total ? "Завершити" : "Далі"}
        </button>
      )}
    </div>
  );
}
