"use client";

import { useMemo, useState } from "react";
import type { VocabularySet } from "@/lib/types";
import { saveScore } from "@/lib/progress";

type Props = {
  set: VocabularySet;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardTrainer({ set }: Props) {
  const [round, setRound] = useState(0);
  const cards = useMemo(() => {
    void round;
    return shuffle(set.cards);
  }, [set.cards, round]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = cards[index];
  const total = cards.length;
  const done = index >= total;

  function mark(knew: boolean) {
    const newKnown = knew ? known + 1 : known;
    if (knew) setKnown(newKnown);
    setFlipped(false);
    if (index + 1 >= total) {
      saveScore(set.id, Math.round((newKnown / total) * 100));
      setIndex(total);
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (done) {
    const pct = Math.round((known / total) * 100);
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-4xl font-bold text-[var(--color-accent)]">{pct}%</p>
        <p className="mt-2 text-[var(--color-muted)]">
          Знаю: {known} з {total} карток
        </p>
        <button
          type="button"
          onClick={() => {
            setRound((r) => r + 1);
            setIndex(0);
            setFlipped(false);
            setKnown(0);
          }}
          className="mt-6 rounded-xl bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          Пройти знову
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-center text-sm text-[var(--color-muted)]">
        Картка {index + 1} / {total}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center transition hover:border-[var(--color-accent)]/40"
      >
        {!flipped ? (
          <>
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              English
            </span>
            <span className="mt-2 text-3xl font-semibold">{card.en}</span>
            <span className="mt-4 text-sm text-[var(--color-muted)]">
              Натисни, щоб перевернути
            </span>
          </>
        ) : (
          <>
            <span className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Українська
            </span>
            <span className="mt-2 text-2xl font-semibold text-[var(--color-accent)]">
              {card.uk}
            </span>
            {card.example && (
              <span className="mt-4 text-sm italic text-[var(--color-muted)]">
                {card.example}
              </span>
            )}
          </>
        )}
      </button>

      {flipped && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => mark(false)}
            className="flex-1 rounded-xl border border-[var(--color-border)] py-3 font-medium hover:bg-[var(--color-surface-hover)]"
          >
            Ще вчу
          </button>
          <button
            type="button"
            onClick={() => mark(true)}
            className="flex-1 rounded-xl bg-[var(--color-success)] py-3 font-medium text-white hover:opacity-90"
          >
            Знаю
          </button>
        </div>
      )}
    </div>
  );
}
