
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  OPEN_ENDED = 'OPEN_ENDED'
}

export interface Choice {
  id: string;
  text: string;
  points: number;
}

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  description?: string;
  choices?: Choice[];
  placeholder?: string;
}

export interface QuizResultProfile {
  title: string;
  description: string;
  icon: string;
  color: string;
  minScore: number;
  pillars: string[];
}

export interface CandidateRecord {
  id: string;
  date: string;
  name: string;
  experience: string;
  score: number;
  profileTitle: string;
  openAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string | number>;
  isFinished: boolean;
  userName?: string;
  userExperience?: string;
  step: 'landing' | 'registration' | 'quiz' | 'finished' | 'admin_login' | 'admin_panel';
}
