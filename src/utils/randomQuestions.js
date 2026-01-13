import { shuffleArray } from "./shuffle";

export function getRandomQuestions(allQuestions, amount = 3) {
  const shuffledQuestions = shuffleArray(allQuestions);

  const selected = shuffledQuestions.slice(0, amount).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));

  return selected;
}
