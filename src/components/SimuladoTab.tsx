import React, {useEffect, useMemo, useState} from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  FileCheck2,
  Lock,
  Play,
  RotateCcw,
  Shuffle,
  XCircle,
} from 'lucide-react';
import {FREE_QUESTION_LIMIT} from '../config/subscription';
import {
  ALL_CATEGORIES,
  CATEGORY_SHORT_LABEL,
  PDF_SIMULADO_ORDER,
  QUESTION_BY_ID,
  QUESTIONS,
} from '../data/questions';
import {OptionKey, SimuladoRecord} from '../types/app';
import {AnswerMapCard} from './AnswerMapCard';
import {QuestionIllustration} from './QuestionIllustration';

interface SimuladoTabProps {
  isPro: boolean;
  history: SimuladoRecord[];
  onCompleteSimulado: (record: SimuladoRecord) => void;
  onOpenPaywall: (reason: string) => void;
}

function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const SimuladoTab: React.FC<SimuladoTabProps> = ({
  isPro,
  history,
  onCompleteSimulado,
  onOpenPaywall,
}) => {
  const [stage, setStage] = useState<'setup' | 'running' | 'result'>('setup');
  const [orderMode, setOrderMode] = useState<'original' | 'shuffled'>(
    'original',
  );
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, OptionKey>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastResult, setLastResult] = useState<SimuladoRecord | null>(null);
  const [expandedMapId, setExpandedMapId] = useState<number | null>(null);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);

  useEffect(() => {
    if (stage !== 'running') return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const startExam = (mode: 'original' | 'shuffled' | 'pdf', isDemoFree = false) => {
    let ids: number[];
    if (isDemoFree) {
      ids = QUESTIONS.slice(0, FREE_QUESTION_LIMIT).map((q) => q.id);
      if (mode === 'shuffled') {
        ids = [...ids].sort(() => Math.random() - 0.5);
      }
    } else if (mode === 'pdf') {
      ids = [...PDF_SIMULADO_ORDER];
    } else if (mode === 'shuffled') {
      ids = QUESTIONS.map((q) => q.id).sort(() => Math.random() - 0.5);
    } else {
      ids = QUESTIONS.map((q) => q.id);
    }

    setOrderMode(mode === 'shuffled' ? 'shuffled' : 'original');
    setQuestionOrder(ids);
    setCurrentIdx(0);
    setExamAnswers({});
    setElapsedSeconds(0);
    setShowUnansweredWarning(false);
    setExpandedMapId(null);
    setStage('running');
  };

  const finishExam = (force = false) => {
    const unanswered = questionOrder.length - Object.keys(examAnswers).length;
    if (unanswered > 0 && !force) {
      setShowUnansweredWarning(true);
      return;
    }

    let correct = 0;
    questionOrder.forEach((qId) => {
      const q = QUESTION_BY_ID[qId];
      if (q && examAnswers[qId] === q.correctOption) {
        correct += 1;
      }
    });

    const record: SimuladoRecord = {
      id: `sim-${Date.now()}`,
      completedAt: new Date().toISOString(),
      orderMode,
      durationSeconds: elapsedSeconds,
      totalQuestions: questionOrder.length,
      correctCount: correct,
      answers: {...examAnswers},
      questionOrder: [...questionOrder],
    };

    setLastResult(record);
    onCompleteSimulado(record);
    setStage('result');
    setShowUnansweredWarning(false);
  };

  const resultCategorySummary = useMemo(() => {
    if (!lastResult) return [];
    return ALL_CATEGORIES.map((cat) => {
      const idsInCat = lastResult.questionOrder.filter(
        (id) => QUESTION_BY_ID[id]?.category === cat,
      );
      if (idsInCat.length === 0) return null;
      const right = idsInCat.filter(
        (id) => lastResult.answers[id] === QUESTION_BY_ID[id]?.correctOption,
      ).length;
      return {
        category: cat,
        total: idsInCat.length,
        correct: right,
        pct: Math.round((right / idsInCat.length) * 100),
      };
    }).filter((x): x is NonNullable<typeof x> => x !== null);
  }, [lastResult]);

  if (stage === 'running') {
    const activeId = questionOrder[currentIdx];
    const activeQuestion = QUESTION_BY_ID[activeId];
    if (!activeQuestion) return null;

    const answeredTotal = Object.keys(examAnswers).length;
    const progressPct = Math.round(
      (answeredTotal / questionOrder.length) * 100,
    );

    return (
      <div className="space-y-5">
        {/* Exam Top Status Bar */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-display font-bold text-[#0F172A]">
              Simulado ({questionOrder.length} questões)
            </span>
            <span aria-hidden="true" className="text-[#CBD5E1]">
              ·
            </span>
            <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
              {answeredTotal}/{questionOrder.length} respondidas
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-xs font-semibold text-[#334155] tabular-nums">
              <Clock className="w-4 h-4 text-[#1D4ED8]" />
              {formatDuration(elapsedSeconds)}
            </span>
            <button
              type="button"
              onClick={() => finishExam(false)}
              className="min-h-[40px] px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] text-xs font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Finalizar Simulado
            </button>
          </div>

          <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full bg-[#1D4ED8] transition-all duration-200"
              style={{width: `${progressPct}%`}}
            />
          </div>
        </div>

        {showUnansweredWarning && (
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FEF3C7] p-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#92400E]">
              Ainda faltam{' '}
              <strong>{questionOrder.length - answeredTotal}</strong> questões
              sem resposta. Deseja finalizar mesmo assim?
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowUnansweredWarning(false)}
                className="min-h-[40px] px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-xs font-semibold text-[#0F172A] cursor-pointer"
              >
                Continuar respondendo
              </button>
              <button
                type="button"
                onClick={() => finishExam(true)}
                className="min-h-[40px] px-3.5 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-xs font-semibold text-white cursor-pointer"
              >
                Finalizar agora
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 items-start">
          {/* Question Navigator */}
          <aside className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 space-y-3">
            <p className="text-xs font-semibold text-[#0F172A]">
              Navegação da Prova
            </p>
            <div className="flex lg:grid lg:grid-cols-4 gap-1.5 overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0">
              {questionOrder.map((qId, idx) => {
                const chosen = examAnswers[qId];
                const isCurrent = idx === currentIdx;
                return (
                  <button
                    key={qId}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`min-w-[42px] min-h-[40px] rounded-xl border text-xs font-mono tabular-nums font-semibold transition-colors shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                        : chosen
                          ? 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Active Exam Question */}
          <article className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-2 text-xs text-[#475569]">
              <span className="font-mono font-bold text-[#1D4ED8]">
                Questão {currentIdx + 1} de {questionOrder.length}
              </span>
              <span className="font-medium">{activeQuestion.category}</span>
            </div>

            <QuestionIllustration questionId={activeQuestion.id} compact />

            <h2 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
              {activeQuestion.statement}
            </h2>

            <div className="space-y-2.5">
              {activeQuestion.options.map((opt) => {
                const selected = examAnswers[activeQuestion.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => {
                      setExamAnswers((prev) => ({
                        ...prev,
                        [activeQuestion.id]: opt.key,
                      }));
                      setShowUnansweredWarning(false);
                    }}
                    className={`w-full min-h-[52px] flex items-center gap-3.5 rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#1D4ED8] bg-[#EFF6FF] text-[#0F172A] font-semibold'
                        : 'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#93C5FD] hover:bg-[#F8FAFC] text-[#0F172A]'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        selected
                          ? 'bg-[#1D4ED8] text-white'
                          : 'bg-[#F1F5F9] text-[#334155]'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="min-h-[44px] px-4 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] disabled:opacity-40 text-sm font-semibold text-[#0F172A] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {currentIdx < questionOrder.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIdx((i) =>
                      Math.min(questionOrder.length - 1, i + 1),
                    )
                  }
                  className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => finishExam(false)}
                  className="min-h-[44px] px-5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-sm font-semibold text-white cursor-pointer"
                >
                  Finalizar Simulado
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  }

  if (stage === 'result' && lastResult) {
    const pct = Number(
      ((lastResult.correctCount / lastResult.totalQuestions) * 100).toFixed(1),
    );
    const passed = pct >= 70;

    return (
      <div className="space-y-5">
        {/* Result Summary Hero */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  passed
                    ? 'bg-[#DCFCE7] text-[#15803D]'
                    : 'bg-[#FEF3C7] text-[#B45309]'
                }`}
              >
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p
                  className={`text-xs font-bold ${
                    passed ? 'text-[#15803D]' : 'text-[#B45309]'
                  }`}
                >
                  {passed
                    ? 'Desempenho de Aprovação (≥ 70%)'
                    : 'Abaixo de 70% · Revise os Mapas da Resposta'}
                </p>
                <h1 className="font-display text-2xl font-extrabold text-[#0F172A] tabular-nums">
                  {lastResult.correctCount}/{lastResult.totalQuestions} —{' '}
                  {pct.toString().replace('.', ',')}%
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setStage('setup')}
                className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Novo Simulado</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E2E8F0]">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5">
              <p className="text-xs text-[#475569]">Acertos</p>
              <p className="font-mono text-lg font-bold text-[#15803D] tabular-nums mt-0.5">
                {lastResult.correctCount} de {lastResult.totalQuestions}
              </p>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5">
              <p className="text-xs text-[#475569]">Erros (salvos p/ revisão)</p>
              <p className="font-mono text-lg font-bold text-[#B91C1C] tabular-nums mt-0.5">
                {lastResult.totalQuestions - lastResult.correctCount}
              </p>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 col-span-2 sm:col-span-1">
              <p className="text-xs text-[#475569]">Tempo total</p>
              <p className="font-mono text-lg font-bold text-[#0F172A] tabular-nums mt-0.5">
                {formatDuration(lastResult.durationSeconds)}
              </p>
            </div>
          </div>

          {/* Breakdown by Category */}
          <div className="space-y-2.5 pt-2">
            <h2 className="font-display text-sm font-bold text-[#0F172A]">
              Resumo por Categoria
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resultCategorySummary.map((row) => (
                <div
                  key={row.category}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0F172A]">
                      {row.category}
                    </span>
                    <span className="font-mono font-bold tabular-nums text-[#334155]">
                      {row.correct}/{row.total} ({row.pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        row.pct >= 70 ? 'bg-[#15803D]' : 'bg-[#D97706]'
                      }`}
                      style={{width: `${row.pct}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gabarito Comentado */}
        <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              Gabarito Comentado
            </h2>
            <p className="text-xs text-[#475569] mt-0.5">
              Toque em qualquer questão para abrir o Mapa da Resposta completo.
            </p>
          </div>

          <div className="space-y-3">
            {lastResult.questionOrder.map((qId, idx) => {
              const q = QUESTION_BY_ID[qId];
              if (!q) return null;
              const chosen = lastResult.answers[qId];
              const isRight = chosen === q.correctOption;
              const isOpen = expandedMapId === qId;

              return (
                <div
                  key={qId}
                  className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedMapId(isOpen ? null : qId)}
                    className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {isRight ? (
                        <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-[#B91C1C] shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-[#475569] font-medium">
                          #{idx + 1} · {q.code} ·{' '}
                          {CATEGORY_SHORT_LABEL[q.category]}
                        </p>
                        <p className="text-sm font-semibold text-[#0F172A] mt-0.5 leading-snug">
                          {q.statement}
                        </p>
                        <p className="text-xs mt-1.5 text-[#334155]">
                          Sua resposta:{' '}
                          <strong
                            className={
                              isRight ? 'text-[#15803D]' : 'text-[#B91C1C]'
                            }
                          >
                            {chosen ?? 'Em branco'}
                          </strong>
                          <span className="mx-2 text-[#CBD5E1]">|</span>
                          Correta:{' '}
                          <strong className="text-[#15803D]">
                            {q.correctOption}
                          </strong>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1D4ED8] flex items-center gap-1 whitespace-nowrap shrink-0 mt-0.5">
                      <span>Mapa</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 bg-[#FFFFFF] border-t border-[#E2E8F0]">
                      <div className="pt-4">
                        <AnswerMapCard question={q} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // Setup screen
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <section className="lg:col-span-7 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 space-y-5">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0F172A]">
                Simulado Final CNH (32 Questões)
              </h1>
              <p className="text-sm text-[#475569] mt-1 leading-relaxed">
                Treine em formato real de prova com cronômetro, nota percentual,
                desempenho por tema e gabarito comentado ligado aos Mapas da
                Resposta.
              </p>
            </div>
          </div>

          {!isPro ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 space-y-2">
                <p className="text-sm font-bold text-[#92400E] flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Simulado completo de 32 questões exclusivo PRO</span>
                </p>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Assine o Plano PRO por <strong>R$ 5,00/mês</strong> para
                  liberar o Simulado Final com todas as 32 questões e gabarito
                  comentado completo. Você também pode experimentar o mini
                  simulado gratuito de 6 questões agora mesmo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenPaywall(
                      'Desbloqueie o Simulado Final completo de 32 questões com gabarito comentado por R$ 5,00/mês.',
                    )
                  }
                  className="flex-1 min-h-[48px] rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] px-5 text-sm font-semibold text-white transition-colors cursor-pointer"
                >
                  Liberar Simulado 32 Questões · R$ 5/mês
                </button>
                <button
                  type="button"
                  onClick={() => startExam('shuffled', true)}
                  className="min-h-[48px] px-4 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-sm font-semibold text-[#0F172A] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Mini Simulado Grátis (6)
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => startExam('original')}
                  className="min-h-[84px] rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] p-4 text-left transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1D4ED8]">
                    <Play className="w-4 h-4 fill-[#1D4ED8]" />
                    <span>Ordem Original (Q01–Q32)</span>
                  </div>
                  <p className="text-xs text-[#334155]">
                    Percorra todos os temas na sequência organizada do caderno.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => startExam('shuffled')}
                  className="min-h-[84px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-4 text-left transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                    <Shuffle className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Ordem Embaralhada</span>
                  </div>
                  <p className="text-xs text-[#475569]">
                    Mistura todas as 32 questões como no exame oficial do
                    DETRAN.
                  </p>
                </button>
              </div>

              <button
                type="button"
                onClick={() => startExam('pdf')}
                className="w-full min-h-[44px] rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F8FAFC] px-4 text-xs font-semibold text-[#334155] transition-colors cursor-pointer"
              >
                Iniciar na ordem oficial do Simulado Final do caderno (32
                questões)
              </button>
            </div>
          )}
        </section>

        {/* Past Simulado History */}
        <aside className="lg:col-span-5 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3.5">
          <h2 className="font-display text-base font-bold text-[#0F172A]">
            Histórico de Simulados
          </h2>

          {history.length === 0 ? (
            <p className="text-xs text-[#64748B] leading-relaxed">
              Nenhum simulado concluído ainda. Ao finalizar uma prova, sua nota,
              tempo e evolução ficam salvos aqui automaticamente.
            </p>
          ) : (
            <div className="space-y-2.5">
              {history.slice(0, 6).map((item) => {
                const pct = Math.round(
                  (item.correctCount / item.totalQuestions) * 100,
                );
                const ok = pct >= 70;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setLastResult(item);
                      setExpandedMapId(null);
                      setStage('result');
                    }}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] p-3.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-mono text-sm font-bold text-[#0F172A] tabular-nums">
                        {item.correctCount}/{item.totalQuestions} ({pct}%)
                      </p>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {new Date(item.completedAt).toLocaleDateString('pt-BR')}{' '}
                        · {formatDuration(item.durationSeconds)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold whitespace-nowrap shrink-0 ${
                        ok ? 'text-[#15803D]' : 'text-[#B45309]'
                      }`}
                    >
                      {ok ? 'Aprovado' : 'Revisar'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
