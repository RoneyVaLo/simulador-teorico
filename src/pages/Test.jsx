import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../context/useQuestions";
import { useAuth } from "../context/useAuth";
import useNavigationBlocker from "../hooks/useNavigationBlocker";

const TEST_DURATION_MS = 1 * 60 * 1000; // 1 minutos

const Test = () => {
  const { user } = useAuth();
  const { questions, registerAnswer } = useQuestions();

  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [blocked, setBlocked] = useState(true);

  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const currentQuestion = questions[questionIndex];

  useNavigationBlocker({ enabled: blocked });

  const nextQuestion = () => {
    if (answerSelected) {
      registerAnswer(answerSelected);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setAnswerSelected(false);
      } else {
        finishTest();
      }
    }
  };

  const finishTest = () => {
    clearTimeout(timeoutRef.current);
    setBlocked(false);

    const elapsedTime = startTimeRef.current
      ? Date.now() - startTimeRef.current
      : 0;

    navigate("/summary", {
      state: {
        elapsedTime,
      },
    });
  };

  useEffect(() => {
    startTimeRef.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      finishTest();
    }, TEST_DURATION_MS);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-[#E1F4F9] min-h-screen flex font-sans">
      <div className="min-h-screen w-250 h-150 p-10 pl-2 text-[#2c3e50]">
        <div className="text-[1.2rem] font-bold text-[#444] mb-7.5 uppercase">
          <span className="lowercase mr-2">ci{user[0].id}</span>
          <span>{user[0].name}</span>
        </div>

        <div className="w-full flex justify-between items-center mb-10 pl-10">
          <div className=" mr-20">
            <span className="text-[#4A90E2] font-bold text-[1.2rem] mr-2.5">
              PREGUNTA No. {questionIndex + 1}
            </span>
            <span className="text-[1.1rem] uppercase leading-[1.4]">
              SELECCIONE LA RESPUESTA CORRECTA Y LUEGO OPRIMA EL BOTÓN
              "Siguiente" PARA CONTINUAR.
            </span>
          </div>

          <div className="w-80">
            <img
              src={currentQuestion.image ? currentQuestion.image : "/logo.webp"}
              alt="Señal Zona Escolar"
              className="w-full object-contain contrast-[1.1]"
            />
          </div>
        </div>

        <div className="text-[1.1rem] font-bold mb-7.5 uppercase text-[#444] max-w-[80%] pl-10">
          {currentQuestion.text}
        </div>

        <ul className="list-none p-0 ml-24">
          {currentQuestion.options.map((opt) => (
            <li
              className="mb-6 text-[1.1rem] text-[#555] flex items-center cursor-pointer"
              key={opt.id}
            >
              <input
                type="radio"
                name="answer"
                id={opt.id}
                className="mr-3.75 scale-[1.2]"
                checked={answerSelected?.answer?.id === opt.id}
                onChange={() =>
                  setAnswerSelected({
                    questionId: currentQuestion.id,
                    answer: opt,
                  })
                }
              />
              <label for={opt.id} className="uppercase cursor-pointer">
                {opt.text}
              </label>
            </li>
          ))}
        </ul>

        <div className="pl-10">
          <button
            onClick={nextQuestion}
            className="mt-10 border-2 border-gray-700 bg-gray-200 text-black px-10 py-1 font-bold cursor-pointer capitalize hover:bg-gray-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
};

export default Test;
