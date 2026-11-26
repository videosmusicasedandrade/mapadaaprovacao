import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AlertCircle,
  Bell,
  BookOpen,
  Crown,
  FileCheck2,
  Flame,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {ErrorsTab} from './components/ErrorsTab';
import {NotificationQuestionModal} from './components/NotificationQuestionModal';
import {NotificationsTab} from './components/NotificationsTab';
import {PaywallModal} from './components/PaywallModal';
import {PlanTab} from './components/PlanTab';
import {OfflineIndicator, PWAInstallButton} from './components/PWAInstallButton';
import {SimuladoTab} from './components/SimuladoTab';
import {StudyTab} from './components/StudyTab';
import {
  createFreeSubscription,
  createProSubscription,
  isSubscriptionActive,
  MONTHLY_PRICE_SHORT,
  VALID_ACTIVATION_CODES,
} from './config/subscription';
import {QUESTION_BY_ID} from './data/questions';
import {
  ActiveTab,
  NotificationSettings,
  OptionKey,
  ScheduledSlot,
  SimuladoRecord,
  StreakState,
  StudyAnswerRecord,
  SubscriptionState,
} from './types/app';
import {
  playCorrectSound,
  playNotificationSound,
  playWrongSound,
} from './utils/sound';
import {
  buildDailySlots,
  createDefaultNotificationSettings,
  getCurrentHHMM,
  getTodayKey,
  loadFromStorage,
  parseTimeToMinutes,
  pickNotificationPool,
  recordStudyStreak,
  saveToStorage,
  STORAGE_KEYS,
} from './utils/storage';

interface ActiveNotificationModalState {
  questionId: number;
  scheduledTime: string;
  slotId?: string;
  isTest?: boolean;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('estudar');
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(1);

  const [subscription, setSubscription] = useState<SubscriptionState>(() =>
    loadFromStorage<SubscriptionState>(
      STORAGE_KEYS.SUBSCRIPTION,
      createFreeSubscription(),
    ),
  );

  const isPro = isSubscriptionActive(subscription);

  const [answers, setAnswers] = useState<Record<number, StudyAnswerRecord>>(
    () =>
      loadFromStorage<Record<number, StudyAnswerRecord>>(
        STORAGE_KEYS.ANSWERS,
        {},
      ),
  );

  const [reviewMarks, setReviewMarks] = useState<number[]>(() =>
    loadFromStorage<number[]>(STORAGE_KEYS.REVIEW_MARKS, []),
  );

  const [errorIds, setErrorIds] = useState<number[]>(() =>
    loadFromStorage<number[]>(STORAGE_KEYS.ERROR_IDS, []),
  );

  const [simulados, setSimulados] = useState<SimuladoRecord[]>(() =>
    loadFromStorage<SimuladoRecord[]>(STORAGE_KEYS.SIMULADOS, []),
  );

  const [streak, setStreak] = useState<StreakState>(() =>
    loadFromStorage<StreakState>(STORAGE_KEYS.STREAK, {
      currentStreak: 0,
      lastStudiedDate: null,
      studiedDates: [],
    }),
  );

  const [soundMuted, setSoundMuted] = useState<boolean>(() =>
    loadFromStorage<boolean>(STORAGE_KEYS.SOUND_MUTED, false),
  );

  const [notifSettings, setNotifSettings] = useState<NotificationSettings>(
    () => {
      const saved = loadFromStorage<NotificationSettings | null>(
        STORAGE_KEYS.NOTIFICATIONS,
        null,
      );
      if (saved && saved.scheduleDate === getTodayKey()) {
        return saved;
      }
      if (saved) {
        return {
          ...saved,
          scheduleDate: getTodayKey(),
          todaySlots: buildDailySlots(
            saved,
            isSubscriptionActive(
              loadFromStorage<SubscriptionState>(
                STORAGE_KEYS.SUBSCRIPTION,
                createFreeSubscription(),
              ),
            ),
            loadFromStorage<number[]>(STORAGE_KEYS.ERROR_IDS, []),
          ),
        };
      }
      return createDefaultNotificationSettings(
        isSubscriptionActive(
          loadFromStorage<SubscriptionState>(
            STORAGE_KEYS.SUBSCRIPTION,
            createFreeSubscription(),
          ),
        ),
        loadFromStorage<number[]>(STORAGE_KEYS.ERROR_IDS, []),
      );
    },
  );

  const [browserPermission, setBrowserPermission] = useState<
    NotificationPermission | 'unsupported'
  >(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return window.Notification.permission;
  });

  const [activeNotifModal, setActiveNotifModal] =
    useState<ActiveNotificationModalState | null>(null);
  const [paywallReason, setPaywallReason] = useState<string | null>(null);

  // Persist all state cleanly in localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SUBSCRIPTION, subscription);
  }, [subscription]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ANSWERS, answers);
  }, [answers]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.REVIEW_MARKS, reviewMarks);
  }, [reviewMarks]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ERROR_IDS, errorIds);
  }, [errorIds]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SIMULADOS, simulados);
  }, [simulados]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.STREAK, streak);
  }, [streak]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SOUND_MUTED, soundMuted);
  }, [soundMuted]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifSettings);
  }, [notifSettings]);

  const sendBrowserNotification = useCallback(
    (questionId: number, timeLabel: string) => {
      if (
        typeof window === 'undefined' ||
        !('Notification' in window) ||
        window.Notification.permission !== 'granted'
      ) {
        return;
      }
      const q = QUESTION_BY_ID[questionId];
      if (!q) return;
      try {
        const n = new window.Notification(
          `Mapa CNH · Pergunta das ${timeLabel}`,
          {
            body: `${q.code} (${q.category}): ${q.statement}`,
            icon: '/pwa-192x192.png',
            tag: `mapa-cnh-${q.id}-${timeLabel}`,
          },
        );
        n.onclick = () => {
          window.focus();
          setActiveNotifModal({
            questionId: q.id,
            scheduledTime: timeLabel,
          });
          n.close();
        };
      } catch {
        // Ignore notification constructor issues inside restricted iframes
      }
    },
    [],
  );

  // Live scheduler loop checking daily slots every 15s
  useEffect(() => {
    if (!notifSettings.enabled) return;

    const checkSchedule = () => {
      const today = getTodayKey();
      const nowMin = parseTimeToMinutes(getCurrentHHMM());

      setNotifSettings((prev) => {
        if (prev.scheduleDate !== today) {
          return {
            ...prev,
            scheduleDate: today,
            todaySlots: buildDailySlots(prev, isPro, errorIds),
          };
        }

        let changed = false;
        let newlyDueSlot: ScheduledSlot | null = null;

        const nextSlots = prev.todaySlots.map((slot) => {
          if (slot.status === 'pending') {
            const slotMin = parseTimeToMinutes(slot.time);
            if (slotMin <= nowMin) {
              changed = true;
              const updated: ScheduledSlot = {
                ...slot,
                status: 'due',
                browserNotified: true,
              };
              if (!newlyDueSlot) newlyDueSlot = updated;
              return updated;
            }
          }
          return slot;
        });

        if (newlyDueSlot) {
          const slotRef = newlyDueSlot as ScheduledSlot;
          playNotificationSound(soundMuted);
          sendBrowserNotification(slotRef.questionId, slotRef.time);
        }

        return changed ? {...prev, todaySlots: nextSlots} : prev;
      });
    };

    checkSchedule();
    const interval = window.setInterval(checkSchedule, 15000);
    return () => window.clearInterval(interval);
  }, [
    notifSettings.enabled,
    isPro,
    errorIds,
    soundMuted,
    sendBrowserNotification,
  ]);

  const registerAnswer = useCallback(
    (questionId: number, option: OptionKey) => {
      const q = QUESTION_BY_ID[questionId];
      if (!q) return false;
      const isCorrect = option === q.correctOption;

      if (isCorrect) {
        playCorrectSound(soundMuted);
      } else {
        playWrongSound(soundMuted);
      }

      setAnswers((prev) => ({
        ...prev,
        [questionId]: {
          selectedOption: option,
          isCorrect,
          answeredAt: new Date().toISOString(),
          attempts: (prev[questionId]?.attempts ?? 0) + 1,
        },
      }));

      if (!isCorrect) {
        setErrorIds((prev) =>
          prev.includes(questionId) ? prev : [questionId, ...prev],
        );
      }

      setStreak((prev) => recordStudyStreak(prev));
      return isCorrect;
    },
    [soundMuted],
  );

  const handleClearAnswer = (questionId: number) => {
    setAnswers((prev) => {
      const copy = {...prev};
      delete copy[questionId];
      return copy;
    });
  };

  const handleToggleReviewMark = (questionId: number) => {
    setReviewMarks((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId],
    );
  };

  const handleResolveError = (questionId: number) => {
    setErrorIds((prev) => prev.filter((id) => id !== questionId));
  };

  const handleCompleteSimulado = (record: SimuladoRecord) => {
    setSimulados((prev) => [record, ...prev.slice(0, 19)]);
    setStreak((prev) => recordStudyStreak(prev));

    // Automatically add missed exam questions to Error Notebook & update answers
    const missedIds: number[] = [];
    record.questionOrder.forEach((qId) => {
      const q = QUESTION_BY_ID[qId];
      const chosen = record.answers[qId];
      if (!q) return;
      if (!chosen || chosen !== q.correctOption) {
        missedIds.push(qId);
      }
    });

    if (missedIds.length > 0) {
      setErrorIds((prev) => {
        const merged = new Set([...missedIds, ...prev]);
        return Array.from(merged);
      });
    }

    const pct = (record.correctCount / record.totalQuestions) * 100;
    if (pct >= 70) {
      playCorrectSound(soundMuted);
    } else {
      playWrongSound(soundMuted);
    }
  };

  const handleRequestBrowserPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setBrowserPermission('unsupported');
      return;
    }
    try {
      const res = await window.Notification.requestPermission();
      setBrowserPermission(res);
    } catch {
      setBrowserPermission(window.Notification.permission);
    }
  };

  const handleUpdateNotifSettings = (
    updater: (prev: NotificationSettings) => NotificationSettings,
    rebuildSchedule = false,
  ) => {
    setNotifSettings((prev) => {
      const next = updater(prev);
      if (rebuildSchedule) {
        return {
          ...next,
          scheduleDate: getTodayKey(),
          todaySlots: buildDailySlots(next, isPro, errorIds),
        };
      }
      return next;
    });
  };

  const handleRegenerateToday = () => {
    setNotifSettings((prev) => ({
      ...prev,
      scheduleDate: getTodayKey(),
      todaySlots: buildDailySlots(prev, isPro, errorIds),
    }));
  };

  const handleTriggerTestQuestion = () => {
    const pool = pickNotificationPool(
      isPro,
      notifSettings.topicMode,
      notifSettings.selectedCategories,
      errorIds,
    );
    const chosenId = pool[Math.floor(Math.random() * pool.length)] ?? 1;
    const nowLabel = getCurrentHHMM();
    playNotificationSound(soundMuted);
    sendBrowserNotification(chosenId, nowLabel);
    setActiveNotifModal({
      questionId: chosenId,
      scheduledTime: nowLabel,
      isTest: true,
    });
  };

  const handleAnswerNotificationQuestion = (option: OptionKey) => {
    if (!activeNotifModal) return;
    const isCorrect = registerAnswer(activeNotifModal.questionId, option);
    const nowIso = new Date().toISOString();

    setNotifSettings((prev) => {
      const nextSlots = activeNotifModal.slotId
        ? prev.todaySlots.map((s) =>
            s.id === activeNotifModal.slotId
              ? {
                  ...s,
                  status: 'answered' as const,
                  selectedOption: option,
                  isCorrect,
                  answeredAt: nowIso,
                }
              : s,
          )
        : prev.todaySlots;

      const historyItem = {
        id: `nh-${Date.now()}`,
        date: getTodayKey(),
        time: activeNotifModal.scheduledTime,
        questionId: activeNotifModal.questionId,
        selectedOption: option,
        isCorrect,
        answeredAt: nowIso,
      };

      return {
        ...prev,
        todaySlots: nextSlots,
        history: [historyItem, ...prev.history.slice(0, 29)],
      };
    });
  };

  const handleActivateCode = (rawCode: string): boolean => {
    const normalized = rawCode.trim().toUpperCase();
    if (!VALID_ACTIVATION_CODES.includes(normalized)) {
      return false;
    }
    const nextSub = createProSubscription('code', normalized);
    setSubscription(nextSub);
    playCorrectSound(soundMuted);
    return true;
  };

  const handleSimulatePro = () => {
    setSubscription(createProSubscription('test', 'TESTE_PRO'));
    playCorrectSound(soundMuted);
  };

  const handleRevertToFree = () => {
    setSubscription(createFreeSubscription());
  };

  const handleResetProgress = () => {
    setAnswers({});
    setReviewMarks([]);
    setErrorIds([]);
    setSimulados([]);
    setStreak({currentStreak: 0, lastStudiedDate: null, studiedDates: []});
  };

  const dueCount = useMemo(
    () =>
      notifSettings.enabled
        ? notifSettings.todaySlots.filter((s) => s.status === 'due').length
        : 0,
    [notifSettings.enabled, notifSettings.todaySlots],
  );

  const navItems: {
    id: ActiveTab;
    label: string;
    mobileLabel: string;
    icon: React.ComponentType<{className?: string}>;
    badge?: number;
  }[] = [
    {id: 'estudar', label: 'Estudar', mobileLabel: 'Estudar', icon: BookOpen},
    {
      id: 'notificacoes',
      label: 'Notificações',
      mobileLabel: 'Alertas',
      icon: Bell,
      badge: dueCount > 0 ? dueCount : undefined,
    },
    {
      id: 'simulado',
      label: 'Simulado',
      mobileLabel: 'Simulado',
      icon: FileCheck2,
    },
    {
      id: 'erros',
      label: 'Erros',
      mobileLabel: 'Erros',
      icon: AlertCircle,
      badge: errorIds.length > 0 ? errorIds.length : undefined,
    },
    {
      id: 'plano',
      label: 'Plano R$ 5',
      mobileLabel: 'Plano R$ 5',
      icon: Crown,
    },
  ];

  const activeModalQuestion = activeNotifModal
    ? QUESTION_BY_ID[activeNotifModal.questionId]
    : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Compact Sticky Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-[#FFFFFF]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => setActiveTab('estudar')}
            className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer"
          >
            <img
              src="/icon.svg"
              alt="Logo Mapa da Aprovação CNH"
              className="w-8 h-8 rounded-lg shrink-0"
            />
            <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-[#0F172A] whitespace-nowrap">
              Mapa da Aprovação CNH
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[40px] px-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#EFF6FF] text-[#1D4ED8]'
                      : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded-md tabular-nums ${
                        item.id === 'erros'
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Quick Actions: Plan Status, Streak, Sound, Notifications Shortcut */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden xl:block">
              <PWAInstallButton variant="compact" />
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('plano')}
              className={`min-h-[36px] px-2.5 rounded-lg border text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isPro
                  ? 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]'
                  : 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE]'
              }`}
              title="Gerenciar assinatura"
            >
              {isPro ? `PRO ${MONTHLY_PRICE_SHORT}` : 'Gratuito'}
            </button>

            <span
              title="Dias seguidos estudando"
              className="hidden sm:inline-flex items-center gap-1 min-h-[36px] px-2.5 rounded-lg bg-[#FEF3C7]/70 border border-[#FDE68A] font-mono text-xs font-bold text-[#B45309] tabular-nums whitespace-nowrap shrink-0"
            >
              <Flame className="w-3.5 h-3.5 text-[#D97706]" />
              <span>{streak.currentStreak}d</span>
            </span>

            <button
              type="button"
              onClick={() => setSoundMuted((m) => !m)}
              aria-label={soundMuted ? 'Ativar sons' : 'Silenciar sons'}
              title={soundMuted ? 'Ativar efeitos sonoros' : 'Silenciar sons'}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              {soundMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('notificacoes')}
              aria-label="Abrir Notificações de Perguntas"
              title="Notificações Diárias de Perguntas"
              className="relative min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-[#475569] hover:text-[#1D4ED8] hover:bg-[#EFF6FF] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {dueCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#B45309] text-white font-mono text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {dueCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-5 pb-24 md:pb-12 space-y-5">
        {/* Pending Daily Question Banner when a scheduled question is due */}
        {dueCount > 0 && activeTab !== 'notificacoes' && (
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm text-[#92400E]">
              <Bell className="w-4 h-4 text-[#B45309] shrink-0" />
              <span>
                Você tem{' '}
                <strong>
                  {dueCount} {dueCount === 1 ? 'pergunta' : 'perguntas'} do dia
                </strong>{' '}
                pronta para responder agora.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const firstDue = notifSettings.todaySlots.find(
                  (s) => s.status === 'due',
                );
                if (firstDue) {
                  setActiveNotifModal({
                    questionId: firstDue.questionId,
                    scheduledTime: firstDue.time,
                    slotId: firstDue.id,
                  });
                }
              }}
              className="min-h-[38px] px-3.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Responder agora
            </button>
          </div>
        )}

        {activeTab === 'estudar' && (
          <StudyTab
            isPro={isPro}
            answers={answers}
            reviewMarks={reviewMarks}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={setSelectedQuestionId}
            onAnswerQuestion={registerAnswer}
            onClearAnswer={handleClearAnswer}
            onToggleReviewMark={handleToggleReviewMark}
            onOpenPaywall={(reason) => setPaywallReason(reason)}
          />
        )}

        {activeTab === 'notificacoes' && (
          <NotificationsTab
            isPro={isPro}
            settings={notifSettings}
            errorCount={errorIds.length}
            browserPermission={browserPermission}
            onRequestBrowserPermission={handleRequestBrowserPermission}
            onUpdateSettings={handleUpdateNotifSettings}
            onRegenerateToday={handleRegenerateToday}
            onTriggerTestQuestion={handleTriggerTestQuestion}
            onOpenSlotQuestion={(slot) =>
              setActiveNotifModal({
                questionId: slot.questionId,
                scheduledTime: slot.time,
                slotId: slot.id,
              })
            }
            onOpenPaywall={(reason) => setPaywallReason(reason)}
          />
        )}

        {activeTab === 'simulado' && (
          <SimuladoTab
            isPro={isPro}
            history={simulados}
            onCompleteSimulado={handleCompleteSimulado}
            onOpenPaywall={(reason) => setPaywallReason(reason)}
          />
        )}

        {activeTab === 'erros' && (
          <ErrorsTab
            isPro={isPro}
            errorIds={errorIds}
            onPracticeResult={registerAnswer}
            onResolveError={handleResolveError}
            onGoToStudy={() => setActiveTab('estudar')}
            onOpenPaywall={(reason) => setPaywallReason(reason)}
          />
        )}

        {activeTab === 'plano' && (
          <PlanTab
            isPro={isPro}
            subscription={subscription}
            answers={answers}
            simulados={simulados}
            errorCount={errorIds.length}
            streak={streak}
            onActivateCode={handleActivateCode}
            onSimulatePro={handleSimulatePro}
            onRevertToFree={handleRevertToFree}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Clean Quiet Desktop Footer */}
      <footer className="hidden md:block border-t border-[#E2E8F0] bg-[#FFFFFF] py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs text-[#64748B]">
          <span>
            Mapa da Aprovação CNH · Material independente de preparação teórica
          </span>
          <span>Plano Mensal PRO {MONTHLY_PRICE_SHORT} · 32 Questões Ilustradas</span>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Navegação inferior mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[#E2E8F0] bg-[#FFFFFF]/95 backdrop-blur-md pb-safe"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`relative h-full flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  active ? 'text-[#1D4ED8]' : 'text-[#64748B]'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 ${active ? 'stroke-[2.4]' : 'stroke-[1.9]'}`}
                  />
                  {item.badge !== undefined && (
                    <span
                      className={`absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-mono font-bold text-white flex items-center justify-center tabular-nums ${
                        item.id === 'erros' ? 'bg-[#B91C1C]' : 'bg-[#B45309]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-tight whitespace-nowrap">
                  {item.mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Live Daily Question Notification Modal */}
      {activeNotifModal && activeModalQuestion && (
        <NotificationQuestionModal
          question={activeModalQuestion}
          scheduledTime={activeNotifModal.scheduledTime}
          isTest={activeNotifModal.isTest}
          onAnswer={handleAnswerNotificationQuestion}
          onClose={() => setActiveNotifModal(null)}
        />
      )}

      {/* PRO Paywall Modal */}
      {paywallReason !== null && (
        <PaywallModal
          reason={paywallReason}
          onActivateCode={handleActivateCode}
          onSimulatePro={handleSimulatePro}
          onClose={() => setPaywallReason(null)}
        />
      )}

      {/* Offline PWA Banner */}
      <OfflineIndicator />
    </div>
  );
}
