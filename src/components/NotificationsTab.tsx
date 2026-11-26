import React, {useState} from 'react';
import {
  Bell,
  BellOff,
  BellRing,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  Plus,
  RefreshCw,
  ShieldAlert,
  Shuffle,
  Trash2,
  XCircle,
} from 'lucide-react';
import {FREE_QUESTION_LIMIT} from '../config/subscription';
import {
  ALL_CATEGORIES,
  CATEGORY_SHORT_LABEL,
  QUESTION_BY_ID,
} from '../data/questions';
import {
  Category,
  NotificationMode,
  NotificationSettings,
  NotificationTopicMode,
  ScheduledSlot,
} from '../types/app';

interface NotificationsTabProps {
  isPro: boolean;
  settings: NotificationSettings;
  errorCount: number;
  browserPermission: NotificationPermission | 'unsupported';
  onRequestBrowserPermission: () => void;
  onUpdateSettings: (
    updater: (prev: NotificationSettings) => NotificationSettings,
    rebuildSchedule?: boolean,
  ) => void;
  onRegenerateToday: () => void;
  onTriggerTestQuestion: () => void;
  onOpenSlotQuestion: (slot: ScheduledSlot) => void;
  onOpenPaywall: (reason: string) => void;
}

export const NotificationsTab: React.FC<NotificationsTabProps> = ({
  isPro,
  settings,
  errorCount,
  browserPermission,
  onRequestBrowserPermission,
  onUpdateSettings,
  onRegenerateToday,
  onTriggerTestQuestion,
  onOpenSlotQuestion,
  onOpenPaywall,
}) => {
  const [newTime, setNewTime] = useState('20:30');

  const dueSlots = settings.todaySlots.filter((s) => s.status === 'due');

  const handleModeChange = (mode: NotificationMode) => {
    onUpdateSettings((prev) => ({...prev, mode}), true);
  };

  const handleAddFixedTime = () => {
    if (!/^\d{2}:\d{2}$/.test(newTime)) return;
    if (settings.fixedTimes.includes(newTime)) return;
    onUpdateSettings(
      (prev) => ({
        ...prev,
        fixedTimes: [...prev.fixedTimes, newTime].sort(),
        dailyCount: Math.min(5, prev.fixedTimes.length + 1),
      }),
      true,
    );
  };

  const handleRemoveFixedTime = (timeToRemove: string) => {
    if (settings.fixedTimes.length <= 1) return;
    onUpdateSettings(
      (prev) => ({
        ...prev,
        fixedTimes: prev.fixedTimes.filter((t) => t !== timeToRemove),
      }),
      true,
    );
  };

  const handleApplyFixedPreset = (count: number) => {
    const presets: Record<number, string[]> = {
      1: ['19:00'],
      2: ['08:30', '19:30'],
      3: ['08:30', '12:30', '18:30'],
      4: ['08:30', '12:30', '17:30', '21:00'],
      5: ['08:00', '11:30', '15:00', '18:30', '21:00'],
    };
    onUpdateSettings(
      (prev) => ({
        ...prev,
        dailyCount: count,
        fixedTimes: presets[count] ?? prev.fixedTimes,
      }),
      true,
    );
  };

  const handleToggleCategory = (cat: Category) => {
    onUpdateSettings((prev) => {
      const exists = prev.selectedCategories.includes(cat);
      const next = exists
        ? prev.selectedCategories.filter((c) => c !== cat)
        : [...prev.selectedCategories, cat];
      return {
        ...prev,
        selectedCategories: next.length > 0 ? next : [cat],
      };
    }, true);
  };

  return (
    <div className="space-y-5">
      {/* Header Action Bar */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-xl font-bold text-[#0F172A]">
            Notificações Diárias de Perguntas
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Receba questões rápidas ao longo do dia em horários fixos ou
            aleatórios, responda em segundos e fixe o Mapa da Resposta.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onTriggerTestQuestion}
            className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Testar Pergunta Agora</span>
          </button>

          <button
            type="button"
            onClick={() =>
              onUpdateSettings((prev) => ({...prev, enabled: !prev.enabled}))
            }
            className={`min-h-[44px] px-4 rounded-xl border text-sm font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              settings.enabled
                ? 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]'
                : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
            }`}
          >
            {settings.enabled ? (
              <>
                <Bell className="w-4 h-4" />
                <span>Rotina Ativa</span>
              </>
            ) : (
              <>
                <BellOff className="w-4 h-4" />
                <span>Pausada</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Free Tier Notice */}
      {!isPro && (
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" />
            <div className="text-sm text-[#1E3A8A]">
              <p className="font-semibold">
                Modo Degustação ({FREE_QUESTION_LIMIT} questões)
              </p>
              <p className="text-xs text-[#334155] mt-0.5">
                No plano gratuito, as perguntas diárias sorteiam entre Q01 e
                Q06. Assinantes PRO (R$ 5,00/mês) recebem todas as 32 questões e
                Mapas completos.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenPaywall(
                'Receba notificações diárias ilimitadas com todas as 32 questões e Mapas da Resposta por R$ 5,00/mês.',
              )
            }
            className="min-h-[40px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Liberar todas as 32
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Schedule & Permission Configuration */}
        <div className="lg:col-span-7 space-y-5">
          {/* Browser / Mobile Push Permission Card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-bold text-[#0F172A]">
                  Alertas no Navegador e Celular
                </h2>
                <p className="text-xs text-[#475569] mt-0.5">
                  Ative notificações nativas para ser avisado assim que chegar o
                  horário da pergunta.
                </p>
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap shrink-0 ${
                  browserPermission === 'granted'
                    ? 'text-[#15803D]'
                    : browserPermission === 'denied'
                      ? 'text-[#B91C1C]'
                      : 'text-[#B45309]'
                }`}
              >
                {browserPermission === 'granted'
                  ? 'Autorizado'
                  : browserPermission === 'denied'
                    ? 'Bloqueado'
                    : browserPermission === 'unsupported'
                      ? 'Somente no App'
                      : 'Pendente'}
              </span>
            </div>

            {browserPermission === 'granted' ? (
              <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-3.5 flex items-center gap-2.5 text-xs font-medium text-[#15803D]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Notificações do navegador ativadas! Você também pode responder
                  qualquer pergunta diretamente pela fila ao lado.
                </span>
              </div>
            ) : browserPermission === 'denied' ? (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEE2E2]/70 p-3.5 space-y-1.5 text-xs text-[#991B1B]">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>As notificações externas foram bloqueadas pelo navegador</span>
                </p>
                <p className="leading-relaxed text-[#7F1D1D]">
                  Para reativar, clique no ícone de cadeado ou configurações ao
                  lado do endereço do site e mude{' '}
                  <strong>Notificações → Permitir</strong>. Enquanto isso, a{' '}
                  <strong>Central de Perguntas do Dia dentro do app</strong>{' '}
                  continua funcionando normalmente!
                </p>
              </div>
            ) : browserPermission === 'unsupported' ? (
              <div className="rounded-xl border border-[#FDE68A] bg-[#FEF3C7]/70 p-3.5 text-xs text-[#92400E]">
                Este navegador não suporta notificações externas, mas a Central
                de Perguntas dentro do aplicativo entrega e registra todas as
                suas perguntas diárias normalmente.
              </div>
            ) : (
              <button
                type="button"
                onClick={onRequestBrowserPermission}
                className="w-full min-h-[44px] rounded-xl border border-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-sm font-semibold text-[#1D4ED8] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <BellRing className="w-4 h-4" />
                <span>Ativar Notificações no Navegador / Celular</span>
              </button>
            )}
          </section>

          {/* Scheduling Mode Card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-4">
            <div>
              <h2 className="font-display text-base font-bold text-[#0F172A]">
                Modo de Agendamento
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Escolha entre horários exatos definidos por você ou envio
                aleatório durante o dia.
              </p>
            </div>

            {/* Segmented control */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F1F5F9]">
              <button
                type="button"
                onClick={() => handleModeChange('fixed')}
                className={`min-h-[44px] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  settings.mode === 'fixed'
                    ? 'bg-[#FFFFFF] text-[#1D4ED8] shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Horários Fixos</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('random')}
                className={`min-h-[44px] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  settings.mode === 'random'
                    ? 'bg-[#FFFFFF] text-[#1D4ED8] shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <Shuffle className="w-4 h-4" />
                <span>Aleatório no Dia</span>
              </button>
            </div>

            {settings.mode === 'fixed' ? (
              <div className="space-y-4 pt-1">
                <div>
                  <p className="text-xs font-semibold text-[#334155] mb-2">
                    Atalho rápido de perguntas por dia
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleApplyFixedPreset(n)}
                        className={`min-h-[42px] rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          settings.fixedTimes.length === n
                            ? 'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]'
                            : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        {n}/dia
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#334155] mb-2">
                    Seus horários escolhidos ({settings.fixedTimes.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {settings.fixedTimes.map((t) => (
                      <div
                        key={t}
                        className="inline-flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] pl-3.5 pr-1.5 py-1.5"
                      >
                        <span className="font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                          {t}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFixedTime(t)}
                          disabled={settings.fixedTimes.length <= 1}
                          aria-label={`Remover horário ${t}`}
                          className="min-h-[32px] min-w-[32px] rounded-lg flex items-center justify-center text-[#64748B] hover:text-[#B91C1C] hover:bg-[#FEE2E2] disabled:opacity-35 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    aria-label="Novo horário"
                    className="min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 text-sm font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8] focus:bg-[#FFFFFF]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFixedTime}
                    className="min-h-[44px] px-4 rounded-xl border border-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-sm font-semibold text-[#1D4ED8] flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar horário</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-1">
                <div>
                  <p className="text-xs font-semibold text-[#334155] mb-2">
                    Quantidade diária de perguntas aleatórias
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() =>
                          onUpdateSettings(
                            (prev) => ({...prev, dailyCount: n}),
                            true,
                          )
                        }
                        className={`min-h-[42px] rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                          settings.dailyCount === n
                            ? 'border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]'
                            : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        {n}/dia
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="window-start"
                      className="block text-xs font-semibold text-[#334155] mb-1.5"
                    >
                      Janela inicial
                    </label>
                    <input
                      id="window-start"
                      type="time"
                      value={settings.randomWindowStart}
                      onChange={(e) =>
                        onUpdateSettings(
                          (prev) => ({
                            ...prev,
                            randomWindowStart: e.target.value,
                          }),
                          true,
                        )
                      }
                      className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-sm font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="window-end"
                      className="block text-xs font-semibold text-[#334155] mb-1.5"
                    >
                      Janela final
                    </label>
                    <input
                      id="window-end"
                      type="time"
                      value={settings.randomWindowEnd}
                      onChange={(e) =>
                        onUpdateSettings(
                          (prev) => ({
                            ...prev,
                            randomWindowEnd: e.target.value,
                          }),
                          true,
                        )
                      }
                      className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 text-sm font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onRegenerateToday}
                  className="min-h-[44px] px-4 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#0F172A] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Sortear novos horários aleatórios para hoje</span>
                </button>
              </div>
            )}
          </section>

          {/* Topic Filter Card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3.5">
            <div>
              <h2 className="font-display text-base font-bold text-[#0F172A]">
                Filtro de Temas nas Notificações
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Direcione suas perguntas diárias para os temas que você mais
                precisa reforçar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(
                [
                  {
                    id: 'all',
                    title: 'Todos os temas',
                    sub: isPro ? 'Todas as 32 questões' : 'Amostra Q01–Q06',
                  },
                  {
                    id: 'errors',
                    title: 'Foco nos erros',
                    sub: `${errorCount} pendentes`,
                  },
                  {
                    id: 'categories',
                    title: 'Temas escolhidos',
                    sub: 'Personalizado',
                  },
                ] as {id: NotificationTopicMode; title: string; sub: string}[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onUpdateSettings((prev) => ({...prev, topicMode: opt.id}), true)
                  }
                  className={`min-h-[58px] rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                    settings.topicMode === opt.id
                      ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#0F172A]">{opt.title}</p>
                  <p className="text-[11px] text-[#475569] mt-0.5">{opt.sub}</p>
                </button>
              ))}
            </div>

            {settings.topicMode === 'categories' && (
              <div className="flex flex-wrap gap-2 pt-1">
                {ALL_CATEGORIES.map((cat) => {
                  const selected = settings.selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`min-h-[38px] px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                          : 'border-[#E2E8F0] bg-[#FFFFFF] text-[#334155] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      {CATEGORY_SHORT_LABEL[cat]}
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Today's Schedule Queue & History */}
        <div className="lg:col-span-5 space-y-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-base font-bold text-[#0F172A]">
                  Fila de Perguntas de Hoje
                </h2>
                <p className="text-xs text-[#475569] mt-0.5">
                  {settings.mode === 'random'
                    ? `Horários sorteados entre ${settings.randomWindowStart} e ${settings.randomWindowEnd}`
                    : 'Horários programados por você'}
                </p>
              </div>
              {dueSlots.length > 0 && (
                <span className="text-xs font-bold text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] rounded-lg px-2.5 py-1 whitespace-nowrap shrink-0">
                  {dueSlots.length} pronta{dueSlots.length > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {settings.todaySlots.map((slot) => {
                const q = QUESTION_BY_ID[slot.questionId];
                if (!q) return null;
                const isDue = slot.status === 'due';
                const isAnswered = slot.status === 'answered';

                return (
                  <div
                    key={slot.id}
                    className={`rounded-xl border p-3.5 flex items-center justify-between gap-3 ${
                      isDue
                        ? 'border-[#FDE68A] bg-[#FFFBEB]'
                        : isAnswered
                          ? 'border-[#E2E8F0] bg-[#F8FAFC]'
                          : 'border-[#E2E8F0] bg-[#FFFFFF]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-[#0F172A] tabular-nums">
                          {slot.time}
                        </span>
                        <span aria-hidden="true" className="text-[#94A3B8]">
                          ·
                        </span>
                        <span className="font-medium text-[#475569] truncate">
                          {q.code} · {CATEGORY_SHORT_LABEL[q.category]}
                        </span>
                      </div>
                      <p className="text-xs text-[#334155] mt-1 line-clamp-1">
                        {isAnswered
                          ? slot.isCorrect
                            ? 'Respondida · Acertou'
                            : 'Respondida · Errou (salva em Erros)'
                          : isDue
                            ? q.statement
                            : 'Aguardando horário programado'}
                      </p>
                    </div>

                    {isAnswered ? (
                      slot.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#B91C1C] shrink-0" />
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenSlotQuestion(slot)}
                        className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                          isDue
                            ? 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
                            : 'border border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#334155]'
                        }`}
                      >
                        {isDue ? 'Responder' : 'Antecipar'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Notification History */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3">
            <h2 className="font-display text-base font-bold text-[#0F172A]">
              Histórico de Perguntas Notificadas
            </h2>

            {settings.history.length === 0 ? (
              <p className="text-xs text-[#64748B] leading-relaxed">
                Ainda não há perguntas respondidas via notificação. Clique em{' '}
                <strong>Testar Pergunta Agora</strong> acima para experimentar!
              </p>
            ) : (
              <div className="divide-y divide-[#E2E8F0]">
                {settings.history.slice(0, 6).map((item) => {
                  const q = QUESTION_BY_ID[item.questionId];
                  if (!q) return null;
                  return (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0F172A] truncate">
                          {q.code} · {q.mapTitle}
                        </p>
                        <p className="text-[#64748B] font-mono tabular-nums mt-0.5">
                          {item.date} · {item.time} · Marcou {item.selectedOption}
                        </p>
                      </div>
                      <span
                        className={`font-semibold whitespace-nowrap shrink-0 ${
                          item.isCorrect ? 'text-[#15803D]' : 'text-[#B91C1C]'
                        }`}
                      >
                        {item.isCorrect ? 'Acertou' : 'Errou'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
