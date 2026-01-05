import { useContext } from "react";
import { QuestionsContext } from "./QuestionsContext";

export const useQuestions = () => useContext(QuestionsContext);
