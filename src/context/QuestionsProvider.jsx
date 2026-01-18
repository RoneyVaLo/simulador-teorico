import { useState } from "react";
import { QuestionsContext } from "./QuestionsContext";
import allQuestions from "../assets/questions.json";
import { getRandomQuestions } from "../utils/randomQuestions";

export const QuestionsProvider = ({ children }) => {
  const AMOUNT = 40;

  const [questions, setQuestions] = useState(() =>
    getRandomQuestions(allQuestions, AMOUNT)
  );
  const [answers, setAnswers] = useState([]);

  const registerAnswer = (userAnswer) => {
    setAnswers([...answers, userAnswer]);
  };

  const resetTest = () => {
    const newQuestions = getRandomQuestions(allQuestions, AMOUNT);
    setQuestions([...newQuestions]);
    setAnswers([]);
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, setQuestions, answers, registerAnswer, resetTest }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
