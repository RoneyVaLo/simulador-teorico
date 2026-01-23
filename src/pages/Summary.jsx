import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuestions } from "../context/useQuestions";
import { useAuth } from "../context/useAuth";
import useNavigationBlocker from "../hooks/useNavigationBlocker";

const config = {
  totalQuestion: 40,
  maxScore: 100,
  approveScore: 70,
};

const Summary = () => {
  const { user, setUser } = useAuth();
  const { answers, resetTest } = useQuestions();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [testStats, setTestStats] = useState({
    timeUsed: 0,
    totalGoodAnswers: 0,
    totalBadAnswers: 0,
    goodAnswersScore: 0,
    totalObtained: 0,
    result: 0,
    isApproved: false,
  });
  const [blocked, setBlocked] = useState(true);

  useNavigationBlocker({ enabled: blocked });

  useEffect(() => {
    const checkUserAnswers = () => {
      let testResults = {
        timeUsed: Math.floor(state?.elapsedTime / 1000 / 60), // Tiempo en minutos
        totalGoodAnswers: 0,
        totalBadAnswers: 0,
        goodAnswersScore: 0,
        totalObtained: 0,
        result: 0,
        isApproved: false,
      };
      answers.forEach((answ) => {
        const { answer } = answ;

        if (answer.is_correct) {
          testResults.totalGoodAnswers += 1;
        } else {
          testResults.totalBadAnswers += 1;
        }
      });

      const totalQuestions = Number(config.totalQuestion) || 0;
      const approveScore = Number(config.approveScore) || 0;

      const score = (testResults.totalGoodAnswers * 100) / totalQuestions;

      testResults.goodAnswersScore = score;
      testResults.totalObtained = score;
      testResults.result = score;
      testResults.isApproved = score >= approveScore;

      testResults.totalBadAnswers +=
        config.totalQuestion -
        (testResults.totalGoodAnswers + testResults.totalBadAnswers);

      setTestStats(testResults);
    };
    checkUserAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restartTest = () => {
    resetTest();
    setBlocked(false);
    setUser(null);
    navigate("/");
  };

  return (
    <section
      className="min-h-screen font-sans text-slate-800"
      style={{
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="w-full max-w-3xl p-10">
        <header>
          <h1 className="text-2xl font-semibold mb-10">
            Resumen de la prueba teórica
          </h1>
        </header>

        <section>
          <div className="flex mb-4">
            <span className="w-52 text-lg font-medium">Identificación:</span>
            <span className="value">{user[0]?.id}</span>
          </div>
          <div className="flex mb-4">
            <span className="w-52 text-lg font-medium">Nombre:</span>
            <span className="value">{user[0]?.name}</span>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex mb-4">
            <span className="w-52 text-lg font-medium">
              Total de preguntas:
            </span>
            <span className="value">{config.totalQuestion}</span>
          </div>
          <div className="flex mb-4">
            <span className="w-52 text-lg font-medium">Puntaje máximo:</span>
            <span className="value">{config.maxScore}</span>
          </div>
          <div className="flex mb-4">
            <span className="w-52 text-lg font-medium">Tiempo utilizado:</span>
            <span className="value">
              {testStats.timeUsed} <span>minutos</span>
            </span>
          </div>
        </section>

        <section className="mt-8 space-y-2">
          <div className="grid grid-cols-4 gap-4 text-base">
            <span className="w-50">Total preguntas malas:</span>
            <span className="text-left text-white ml-8">
              {testStats.totalBadAnswers}
            </span>
            <span>Puntaje:</span>
            <span className="text-left">{testStats.badAnswersScore || 0}</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-base">
            <span className="w-50">Total preguntas buenas:</span>
            <span className="text-left text-white ml-8">
              {testStats.totalGoodAnswers}
            </span>
            <span>Puntaje:</span>
            <span className="text-left">{testStats.goodAnswersScore}</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-base">
            <span className="w-50">Total obtenido:</span>
            <span className="text-left text-white ml-8">
              {testStats.totalObtained}
            </span>
          </div>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-4 gap-4">
            <span className="w-50 font-bold text-lg">Resultado:</span>
            <span className="font-bold text-lg text-white ml-8">
              {testStats.result}
            </span>
            <span className="text-xl font-bold text-white">
              {testStats.isApproved ? "Aprobado" : "Reprobado"}
            </span>
          </div>
        </section>

        <footer>
          <button
            onClick={restartTest}
            className="mt-12 px-8 py-1.5 bg-gray-200 hover:bg-gray-200/90 border border-gray-400 shadow-sm text-base font-bold cursor-pointer"
          >
            Continuar
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Summary;
