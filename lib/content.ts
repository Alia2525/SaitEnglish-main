import type {
  FillBlankExercise,
  GrammarExercise,
  VocabularySet,
} from "./types";

import presentSimple from "@/content/grammar/present-simple.json";
import pastSimple from "@/content/grammar/past-simple.json";
import dailyWords from "@/content/vocabulary/daily-words.json";
import articles from "@/content/fill-blank/articles.json";

export const grammarExercises: GrammarExercise[] = [
  presentSimple as GrammarExercise,
  pastSimple as GrammarExercise,
];

export const vocabularySets: VocabularySet[] = [
  dailyWords as VocabularySet,
];

export const fillBlankExercises: FillBlankExercise[] = [
  articles as FillBlankExercise,
];

export function getGrammarById(id: string): GrammarExercise | undefined {
  return grammarExercises.find((e) => e.id === id);
}

export function getVocabularyById(id: string): VocabularySet | undefined {
  return vocabularySets.find((s) => s.id === id);
}

export function getFillBlankById(id: string): FillBlankExercise | undefined {
  return fillBlankExercises.find((e) => e.id === id);
}
