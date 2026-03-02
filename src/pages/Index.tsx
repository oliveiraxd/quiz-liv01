import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { QuizQuestion } from "@/components/QuizQuestion";
import { LeadCapture } from "@/components/LeadCapture";
import { ResultPage } from "@/components/ResultPage";
import { questions } from "@/data/questions";
import { calculateResult } from "@/utils/quiz";
import { UserData, QuizAnswer } from "@/types/quiz";

type QuizState = 'hero' | 'quiz' | 'lead-capture' | 'result';

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
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    const quizResult = calculateResult(totalScore);
    setResult(quizResult);
    setState('result');
  };

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
