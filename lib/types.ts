export type Level = "A1" | "A2" | "B1" | "B2";

export type MultipleChoiceQuestion = {
  prompt: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export type GrammarExercise = {
  id: string;
  title: string;
  description: string;
  level: Level;
  type: "multiple_choice";
  questions: MultipleChoiceQuestion[];
};

export type VocabCard = {
  en: string;
  uk: string;
  example?: string;
};

export type VocabularySet = {
  id: string;
  title: string;
  description: string;
  level: Level;
  cards: VocabCard[];
};

export type FillBlankQuestion = {
  sentence: string;
  blank: string;
  options: string[];
  correct: number;
  explanation?: string;
};

export type FillBlankExercise = {
  id: string;
  title: string;
  description: string;
  level: Level;
  type: "fill_blank";
  questions: FillBlankQuestion[];
};

export type TrainerKind = "grammar" | "vocabulary" | "fill-blank";
