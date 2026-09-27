const PREFIX = "sait-english-progress-";

export function getStoredScore(exerciseId: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`${PREFIX}${exerciseId}`);
  if (!raw) return null;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

export function saveScore(exerciseId: string, percent: number): void {
  if (typeof window === "undefined") return;
  const prev = getStoredScore(exerciseId);
  if (prev === null || percent > prev) {
    localStorage.setItem(`${PREFIX}${exerciseId}`, String(percent));
  }
}
