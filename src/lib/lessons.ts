export type { Lesson } from "./lessons/en";
export {
  lessons as lessonsEn,
  getLessonById as getLessonByIdEn,
  getLessonsByDifficulty as getLessonsByDifficultyEn,
} from "./lessons/en";
export {
  lessons as lessonsTh,
  getLessonById as getLessonByIdTh,
  getLessonsByDifficulty as getLessonsByDifficultyTh,
} from "./lessons/th";

import { lessons as lessonsEn } from "./lessons/en";
import { lessons as lessonsTh } from "./lessons/th";
import type { Lesson } from "./lessons/en";

export type Language = "en" | "th";

export const lessonsByLanguage: Record<Language, Lesson[]> = {
  en: lessonsEn,
  th: lessonsTh,
};

export function getLessons(language: Language): Lesson[] {
  return lessonsByLanguage[language];
}

export function getLessonById(
  language: Language,
  id: string,
): Lesson | undefined {
  return lessonsByLanguage[language].find((lesson) => lesson.id === id);
}

export function getLessonsByDifficulty(
  language: Language,
  difficulty: Lesson["difficulty"],
): Lesson[] {
  return lessonsByLanguage[language].filter(
    (lesson) => lesson.difficulty === difficulty,
  );
}
