"use client";

import { useState } from "react";
import type { GrammarExercise } from "@/lib/types";
import { saveScore } from "@/lib/progress";

type Props = {
  exercise: GrammarExercise;
};

export function MultipleChoiceTrainer({ exercise }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = exercise.questions[index];
  const total = exercise.questions.length;

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === q.correct) {
      setCorrectCount((c) => c + 1);
    }
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
  const isCorrect = selected === q.correct;

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 shadow-xl shadow-black/10 sm:p-8">
      <div className="mb-6 flex items-center justify-between text-sm text-[var(--color-muted)]">
        <span>
          Питання {index + 1} / {total}
        </span>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full bg-[var(--color-accent)] transition-all"
            style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-xl font-medium leading-relaxed">{q.prompt}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {q.options.map((opt, i) => {
          let cls =
            "w-full rounded-xl border px-4 py-3 text-left transition ";
          if (!answered) {
            cls +=
              "border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-hover)]";
          } else if (i === q.correct) {
            cls += "border-[var(--color-success)] bg-[var(--color-success)]/10";
          } else if (i === selected) {
            cls += "border-[var(--color-error)] bg-[var(--color-error)]/10";
          } else {
            cls += "border-[var(--color-border)] opacity-60";
          }
          return (
            <li key={i}>
              <button type="button" className={cls} onClick={() => choose(i)}>
                {opt}
              </button>
            </li>
          );
        })}
      </ul>

      {answered && q.explanation && (
        <p
          className={`mt-4 text-sm ${isCorrect ? "text-[var(--color-success)]" : "text-[var(--color-muted)]"}`}
        >
          {q.explanation}
        </p>
      )}

      {answered && (
        <button
          type="button"
          onClick={next}
          className="mt-6 w-full rounded-xl bg-[var(--color-accent)] py-3 font-medium text-white hover:bg-[var(--color-accent-hover)] sm:w-auto sm:px-8"
        >
          {index + 1 >= total ? "Завершити" : "Далі"}
        </button>
      )}
    </div>
  );
}
