import { useState } from "react";
import { QuestionsContext } from "./QuestionsContext";
import allQuestions from "../assets/questions.json";

export const QuestionsProvider = ({ children }) => {
  const randomQuestions = () => {
    const copy = [...allQuestions];
    const selected = [];

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * copy.length);
      selected.push(copy[randomIndex]);
      copy.splice(randomIndex, 1);
    }

    return selected;
  };

  const [questions, setQuestions] = useState(randomQuestions);
  const [answers, setAnswers] = useState([]);

  const registerAnswer = (userAnswer) => {
    // console.log(userAnswer);
    setAnswers([...answers, userAnswer]);
  };

  const resetTest = () => {
    const newQuestions = randomQuestions();
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
