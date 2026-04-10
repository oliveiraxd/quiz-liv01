import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizQuestion } from "@/components/QuizQuestion";
import { LeadCapture } from "@/components/LeadCapture";
import { ResultPage } from "@/components/ResultPage";
import { questions } from "@/data/questions";
import { calculateResult } from "@/utils/quiz";
import { UserData, QuizAnswer } from "@/types/quiz";
import { Loader2 } from "lucide-react";

type QuizState = 'hero' | 'quiz' | 'lead-capture' | 'calculating' | 'result';

const Index = () => {
  const [state, setState] = useState<QuizState>('hero');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleStartQuiz = () => {
    setState('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (answer: QuizAnswer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setState('lead-capture');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      setState('hero');
    }
  };

  const handleLeadSubmit = (data: UserData) => {
    setUserData(data);
    
    // We only care about the points from the first question (base size) for the final result
    const baseSizeAnswer = answers.find(a => a.questionId === 1);
    const score = baseSizeAnswer ? baseSizeAnswer.points : 50; 
    
    const quizResult = calculateResult(score);
    setResult(quizResult);
    setState('calculating');
  };

  useEffect(() => {
    if (state === 'calculating') {
      const timer = setTimeout(() => {
        setState('result');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleRestart = () => {
    setState('hero');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setUserData(null);
    setResult(null);
  };

  switch (state) {
    case 'hero':
      return <HeroSection onStartQuiz={handleStartQuiz} />;
    
    case 'quiz':
      return (
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      );
    
    case 'lead-capture':
      return <LeadCapture onSubmit={handleLeadSubmit} quizAnswers={answers} />;
      
    case 'calculating':
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <Loader2 className="w-16 h-16 text-red-500 animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2 animate-pulse">
            Analisando prejuízo na sua base...
          </h2>
          <p className="text-muted-foreground">Cruzando dados de conversão e mercado.</p>
        </div>
      );
    
    case 'result':
      return (
        <ResultPage
          result={result}
          userData={userData!}
          onRestart={handleRestart}
        />
      );

    default:
      return <HeroSection onStartQuiz={handleStartQuiz} />;
  }
};

export default Index;
