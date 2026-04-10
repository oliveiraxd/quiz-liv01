import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizQuestion } from "@/components/QuizQuestion";
import { LeadCapture } from "@/components/LeadCapture";
import { ResultPage } from "@/components/ResultPage";
import { questionsFase1, questionsFase2 } from "@/data/questions";
import { calculateResult } from "@/utils/quiz";
import { UserData, QuizAnswer } from "@/types/quiz";
import { Loader2 } from "lucide-react";

type QuizState = 'intro' | 'quiz1' | 'loading' | 'result' | 'quiz2' | 'capture';

const Index = () => {
  const [state, setState] = useState<QuizState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersFase1, setAnswersFase1] = useState<QuizAnswer[]>([]);
  const [answersFase2, setAnswersFase2] = useState<QuizAnswer[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex, state]);

  const handleStartQuiz = () => {
    setState('quiz1');
    setCurrentQuestionIndex(0);
    setAnswersFase1([]);
    setAnswersFase2([]);
  };

  const handleAnswerFase1 = (answer: QuizAnswer) => {
    const newAnswers = [...answersFase1, answer];
    setAnswersFase1(newAnswers);

    if (currentQuestionIndex < questionsFase1.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Find score from question 1 (id: 1)
      const baseSizeAnswer = newAnswers.find(a => a.questionId === 1);
      const score = baseSizeAnswer ? baseSizeAnswer.points : 50; 
      
      const quizResult = calculateResult(score);
      setResult(quizResult);
      setState('loading');
    }
  };

  const handleAnswerFase2 = (answer: QuizAnswer) => {
    const newAnswers = [...answersFase2, answer];
    setAnswersFase2(newAnswers);

    if (currentQuestionIndex < questionsFase2.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setState('capture');
    }
  };

  const handleBackFase1 = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswersFase1(answersFase1.slice(0, -1));
    } else {
      setState('intro');
    }
  };

  const handleBackFase2 = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswersFase2(answersFase2.slice(0, -1));
    } else {
      setState('result');
    }
  };

  useEffect(() => {
    if (state === 'loading') {
      const timer = setTimeout(() => {
        setState('result');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleContinueToDiagnosis = () => {
    setCurrentQuestionIndex(0);
    setState('quiz2');
  };

  const handleLeadSubmit = (data: UserData) => {
    setUserData(data);
    // Em uma aplicação real, aqui você mostraria a tela final de agradecimento
    // ou redirecionaria para uma recompensa em PDF
    window.location.href = "https://chat.whatsapp.com/Lv7czJrmdD7JjobU5XQqba"; // Link de comunidade/contato
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentQuestionIndex(0);
    setAnswersFase1([]);
    setAnswersFase2([]);
    setUserData(null);
    setResult(null);
  };

  switch (state) {
    case 'intro':
      return <HeroSection onStartQuiz={handleStartQuiz} />;
    
    case 'quiz1':
      return (
        <QuizQuestion
          question={questionsFase1[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questionsFase1.length}
          onAnswer={handleAnswerFase1}
          onBack={handleBackFase1}
        />
      );
    
    case 'loading':
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2 animate-pulse text-center">
            Calculando o tamanho do seu prejuízo invisível...
          </h2>
          <p className="text-muted-foreground text-center">Cruzando os dados da sua base com o volume de prêmios deixados na mesa no último ano...</p>
        </div>
      );
    
    case 'result':
      return (
        <ResultPage
          result={result}
          onContinue={handleContinueToDiagnosis}
        />
      );

    case 'quiz2':
      return (
        <QuizQuestion
          question={questionsFase2[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questionsFase2.length}
          onAnswer={handleAnswerFase2}
          onBack={handleBackFase2}
        />
      );

    case 'capture':
      return <LeadCapture onSubmit={handleLeadSubmit} quizAnswers={[...answersFase1, ...answersFase2]} />;

    default:
      return <HeroSection onStartQuiz={handleStartQuiz} />;
  }
};

export default Index;
