export interface Question {
  id: number;
  text: string;
  options: Option[];
  allowMultiple?: boolean;
  maxPoints?: number;
}

export interface Option {
  text: string;
  points: number;
}

export interface QuizResult {
  score: number;
  level: string;
  title: string;
  message: string;
  ctaText: string;
  financialLoss?: string;
}

export interface QuizAnswer {
  questionId: number;
  questionText: string;
  selectedAnswers: string[];
  points: number;
}

export interface UserData {
  name: string;
  email: string;
  whatsapp: string;
}