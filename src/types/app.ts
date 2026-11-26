export type Category =
  | 'Circulação'
  | 'Sinalização'
  | 'Infrações'
  | 'Direção Defensiva'
  | 'Primeiros Socorros'
  | 'Meio Ambiente e Manutenção';

export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface QuestionOption {
  key: OptionKey;
  text: string;
}

export interface Question {
  id: number;
  code: string; // Q01 .. Q32
  category: Category;
  mapTitle: string;
  statement: string;
  options: QuestionOption[];
  correctOption: OptionKey;
  why: string;
  trap: string;
  tip: string;
  ref: string;
  keywords: string[];
}

export interface StudyAnswerRecord {
  selectedOption: OptionKey;
  isCorrect: boolean;
  answeredAt: string;
  attempts: number;
}

export interface SimuladoRecord {
  id: string;
  completedAt: string;
  orderMode: 'original' | 'shuffled';
  durationSeconds: number;
  totalQuestions: number;
  correctCount: number;
  answers: Record<number, OptionKey>;
  questionOrder: number[];
}

export interface SubscriptionState {
  plan: 'free' | 'pro';
  activatedAt: string | null;
  expiresAt: string | null;
  activationSource: 'code' | 'test' | null;
  codeUsed?: string;
}

export type NotificationMode = 'fixed' | 'random';

export type NotificationTopicMode = 'all' | 'errors' | 'categories';

export interface ScheduledSlot {
  id: string;
  time: string; // HH:MM
  questionId: number;
  status: 'pending' | 'due' | 'answered';
  selectedOption?: OptionKey;
  isCorrect?: boolean;
  answeredAt?: string;
  browserNotified?: boolean;
}

export interface NotificationHistoryItem {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  questionId: number;
  selectedOption: OptionKey;
  isCorrect: boolean;
  answeredAt: string;
}

export interface NotificationSettings {
  enabled: boolean;
  mode: NotificationMode;
  dailyCount: number; // 1..5
  fixedTimes: string[]; // ['08:30', '12:30', '18:00']
  randomWindowStart: string; // '08:00'
  randomWindowEnd: string; // '22:00'
  topicMode: NotificationTopicMode;
  selectedCategories: Category[];
  scheduleDate: string; // YYYY-MM-DD
  todaySlots: ScheduledSlot[];
  history: NotificationHistoryItem[];
}

export interface StreakState {
  currentStreak: number;
  lastStudiedDate: string | null; // YYYY-MM-DD
  studiedDates: string[];
}

export type ActiveTab = 'estudar' | 'notificacoes' | 'simulado' | 'erros' | 'plano';
