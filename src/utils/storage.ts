import {FREE_QUESTION_LIMIT} from '../config/subscription';
import {QUESTIONS} from '../data/questions';
import {
  Category,
  NotificationSettings,
  ScheduledSlot,
  StreakState,
} from '../types/app';

export const STORAGE_KEYS = {
  ANSWERS: 'mapa_cnh_answers_v1',
  REVIEW_MARKS: 'mapa_cnh_review_marks_v1',
  ERROR_IDS: 'mapa_cnh_error_ids_v1',
  SIMULADOS: 'mapa_cnh_simulados_v1',
  SUBSCRIPTION: 'mapa_cnh_subscription_v1',
  NOTIFICATIONS: 'mapa_cnh_notifications_v1',
  STREAK: 'mapa_cnh_streak_v1',
  SOUND_MUTED: 'mapa_cnh_sound_muted_v1',
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private mode errors
  }
}

export function getTodayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getCurrentHHMM(date = new Date()): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function parseTimeToMinutes(hhmm: string): number {
  const [hStr, mStr] = hhmm.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return Math.max(0, Math.min(1439, h * 60 + m));
}

export function minutesToHHMM(totalMinutes: number): string {
  const clamped = Math.max(0, Math.min(1439, Math.round(totalMinutes)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function recordStudyStreak(prev: StreakState): StreakState {
  const today = getTodayKey();
  if (prev.lastStudiedDate === today) {
    return prev;
  }
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getTodayKey(yesterdayDate);

  const nextStreak =
    prev.lastStudiedDate === yesterday ? prev.currentStreak + 1 : 1;

  const studiedDates = prev.studiedDates.includes(today)
    ? prev.studiedDates
    : [...prev.studiedDates.slice(-59), today];

  return {
    currentStreak: nextStreak,
    lastStudiedDate: today,
    studiedDates,
  };
}

export function pickNotificationPool(
  isPro: boolean,
  topicMode: NotificationSettings['topicMode'],
  selectedCategories: Category[],
  errorIds: number[],
): number[] {
  const allowedQuestions = isPro
    ? QUESTIONS
    : QUESTIONS.filter((q) => q.id <= FREE_QUESTION_LIMIT);

  if (topicMode === 'errors') {
    const allowedErrors = errorIds.filter((id) =>
      allowedQuestions.some((q) => q.id === id),
    );
    if (allowedErrors.length > 0) return allowedErrors;
  }

  if (topicMode === 'categories' && selectedCategories.length > 0) {
    const filtered = allowedQuestions
      .filter((q) => selectedCategories.includes(q.category))
      .map((q) => q.id);
    if (filtered.length > 0) return filtered;
  }

  return allowedQuestions.map((q) => q.id);
}

export function generateRandomTimes(
  startHHMM: string,
  endHHMM: string,
  count: number,
): string[] {
  const startMin = parseTimeToMinutes(startHHMM);
  let endMin = parseTimeToMinutes(endHHMM);
  if (endMin <= startMin + 15) {
    endMin = Math.min(1435, startMin + 180);
  }
  const safeCount = Math.max(1, Math.min(5, count));
  const span = endMin - startMin;
  const bucketSize = span / safeCount;

  const times: number[] = [];
  for (let i = 0; i < safeCount; i++) {
    const bucketStart = startMin + i * bucketSize;
    const bucketEnd = bucketStart + bucketSize;
    const pad = Math.min(10, bucketSize * 0.15);
    const minVal = bucketStart + pad;
    const maxVal = Math.max(minVal, bucketEnd - pad);
    const picked = Math.floor(minVal + Math.random() * (maxVal - minVal + 1));
    times.push(picked);
  }

  times.sort((a, b) => a - b);
  return times.map(minutesToHHMM);
}

export function buildDailySlots(
  settings: Pick<
    NotificationSettings,
    | 'mode'
    | 'dailyCount'
    | 'fixedTimes'
    | 'randomWindowStart'
    | 'randomWindowEnd'
    | 'topicMode'
    | 'selectedCategories'
  >,
  isPro: boolean,
  errorIds: number[],
): ScheduledSlot[] {
  const today = getTodayKey();
  const nowMinutes = parseTimeToMinutes(getCurrentHHMM());
  const pool = pickNotificationPool(
    isPro,
    settings.topicMode,
    settings.selectedCategories,
    errorIds,
  );

  const times =
    settings.mode === 'fixed'
      ? [...settings.fixedTimes]
          .filter((t) => /^\d{2}:\d{2}$/.test(t))
          .sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b))
      : generateRandomTimes(
          settings.randomWindowStart,
          settings.randomWindowEnd,
          settings.dailyCount,
        );

  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

  return times.map((time, idx) => {
    const qId = shuffledPool[idx % shuffledPool.length] ?? 1;
    const slotMin = parseTimeToMinutes(time);
    return {
      id: `${today}-${time}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      time,
      questionId: qId,
      status: slotMin <= nowMinutes ? 'due' : 'pending',
    };
  });
}

export function createDefaultNotificationSettings(
  isPro: boolean,
  errorIds: number[],
): NotificationSettings {
  const base = {
    enabled: true,
    mode: 'fixed' as const,
    dailyCount: 3,
    fixedTimes: ['08:30', '12:30', '18:00'],
    randomWindowStart: '08:00',
    randomWindowEnd: '22:00',
    topicMode: 'all' as const,
    selectedCategories: ['Circulação', 'Infrações'] as Category[],
  };
  return {
    ...base,
    scheduleDate: getTodayKey(),
    todaySlots: buildDailySlots(base, isPro, errorIds),
    history: [],
  };
}
