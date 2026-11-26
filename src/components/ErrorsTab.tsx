import React, {useMemo, useState} from 'react';
import {
  CheckCircle2,
  ClipboardCheck,
  Lock,
  RotateCcw,
  Trash2,
  XCircle,
} from 'lucide-react';
import {FREE_QUESTION_LIMIT} from '../config/subscription';
import {CATEGORY_SHORT_LABEL, QUESTION_BY_ID} from '../data/questions';
import {OptionKey} from '../types/app';
import {AnswerMapCard} from './AnswerMapCard';
import {QuestionIllustration} from './QuestionIllustration';

interface ErrorsTabProps {
  isPro: boolean;
  errorIds: number[];
  onPracticeResult: (questionId: number, option: OptionKey) => void;
  onResolveError: (questionId: number) => void;
  onGoToStudy: () => void;
  onOpenPaywall: (reason: string) => void;
}

export const ErrorsTab: React.FC<ErrorsTabProps> = ({
  isPro,
  errorIds,
  onPracticeResult,
  onResolveError,
  onGoToStudy,
  onOpenPaywall,
}) => {
  const [activeId, setActiveId] = useState<number | null>(errorIds[0] ?? null);
  const [attemptOption, setAttemptOption] = useState<OptionKey | null>(null);

  const errorQuestions = useMemo(
    () =>
      errorIds
        .map((id) => QUESTION_BY_ID[id])
        .filter((q): q is NonNullable<typeof q> => Boolean(q)),
    [errorIds],
  );

  const currentQuestion = useMemo(() => {
    if (errorQuestions.length === 0) return null;
    const found = errorQuestions.find((q) => q.id === activeId);
    return found ?? errorQuestions[0];
  }, [errorQuestions, activeId]);

  const handleSelectQuestion = (id: number) => {
    setActiveId(id);
    setAttemptOption(null);
  };

  const handleChooseOption = (option: OptionKey) => {
    if (!currentQuestion || attemptOption) return;
    setAttemptOption(option);
    onPracticeResult(currentQuestion.id, option);
  };

  const handleRemoveMastered = () => {
    if (!currentQuestion) return;
    const currentIndex = errorQuestions.findIndex(
      (q) => q.id === currentQuestion.id,
    );
    const nextQ =
      errorQuestions[currentIndex + 1] ?? errorQuestions[currentIndex - 1];
    onResolveError(currentQuestion.id);
    setActiveId(nextQ ? nextQ.id : null);
    setAttemptOption(null);
  };

  if (errorQuestions.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] text-[#15803D] mx-auto flex items-center justify-center">
          <ClipboardCheck className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h1 className="font-display text-xl font-bold text-[#0F172A]">
            Caderno de Erros zerado
          </h1>
          <p className="text-sm text-[#475569] max-w-md mx-auto leading-relaxed">
            Sempre que você errar uma questão no Estudo, no Simulado ou nas
            Notificações Diárias, ela aparece aqui automaticamente para revisão
            até você dominar a regra.
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToStudy}
          className="min-h-[44px] px-5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white transition-colors cursor-pointer"
        >
          Ir para as Questões
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const isLocked = !isPro && currentQuestion.id > FREE_QUESTION_LIMIT;
  const isCorrectAttempt = attemptOption === currentQuestion.correctOption;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-[#0F172A]">
            Caderno de Erros ({errorQuestions.length}{' '}
            {errorQuestions.length === 1 ? 'pendência' : 'pendências'})
          </h1>
          <p className="text-sm text-[#475569] mt-0.5">
            Pratique somente as questões que você errou. Acertando, remova da
            lista de pendências.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 items-start">
        {/* Pending Errors List */}
        <aside className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 space-y-2.5 lg:sticky lg:top-20">
          <p className="text-xs font-semibold text-[#0F172A] px-1">
            Questões para revisar
          </p>
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-0.5">
            {errorQuestions.map((q) => {
              const selected = q.id === currentQuestion.id;
              const locked = !isPro && q.id > FREE_QUESTION_LIMIT;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSelectQuestion(q.id)}
                  className={`w-full rounded-xl border p-3 text-left transition-colors cursor-pointer ${
                    selected
                      ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono font-bold text-[#B91C1C]">
                      {q.code}
                    </span>
                    <span className="text-[#475569] truncate">
                      {CATEGORY_SHORT_LABEL[q.category]}
                    </span>
                    {locked && <Lock className="w-3.5 h-3.5 text-[#64748B]" />}
                  </div>
                  <p className="text-xs font-medium text-[#0F172A] mt-1 line-clamp-2 leading-snug">
                    {q.statement}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Active Practice Card */}
        <div className="space-y-5 min-w-0">
          <article className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0] text-xs">
              <div className="flex items-center gap-2 text-[#475569]">
                <span className="font-mono font-bold text-[#B91C1C]">
                  {currentQuestion.code}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#334155]">
                  {currentQuestion.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>Revisão ativa</span>
              </div>

              <button
                type="button"
                onClick={handleRemoveMastered}
                className="min-h-[36px] px-2.5 rounded-lg text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remover da lista</span>
              </button>
            </div>

            {isLocked ? (
              <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-6 text-center space-y-3">
                <Lock className="w-7 h-7 text-[#1D4ED8] mx-auto" />
                <h2 className="font-display text-base font-bold text-[#0F172A]">
                  Revisão ilimitada disponível no Plano PRO
                </h2>
                <p className="text-xs text-[#334155] max-w-sm mx-auto">
                  Assine por R$ 5,00/mês para revisar todas as 32 questões no
                  Caderno de Erros com Mapa da Resposta completo.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onOpenPaywall(
                      'Libere o Caderno de Erros ilimitado para revisar todas as 32 questões por R$ 5,00/mês.',
                    )
                  }
                  className="min-h-[44px] px-5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white cursor-pointer"
                >
                  Liberar por R$ 5,00/mês
                </button>
              </div>
            ) : (
              <>
                <QuestionIllustration questionId={currentQuestion.id} />

                <h2 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                  {currentQuestion.statement}
                </h2>

                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt) => {
                    const answered = attemptOption !== null;
                    const isSelected = attemptOption === opt.key;
                    const isRight = opt.key === currentQuestion.correctOption;

                    let cls =
                      'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#93C5FD] hover:bg-[#F8FAFC] text-[#0F172A]';
                    let badge = 'bg-[#F1F5F9] text-[#334155]';

                    if (answered) {
                      if (isRight) {
                        cls =
                          'border-[#15803D] bg-[#DCFCE7] text-[#0F172A] font-semibold';
                        badge = 'bg-[#15803D] text-white';
                      } else if (isSelected && !isRight) {
                        cls =
                          'border-[#B91C1C] bg-[#FEE2E2] text-[#0F172A] font-semibold';
                        badge = 'bg-[#B91C1C] text-white';
                      } else {
                        cls =
                          'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] opacity-75';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={answered}
                        onClick={() => handleChooseOption(opt.key)}
                        className={`w-full min-h-[52px] flex items-center gap-3.5 rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition-colors ${
                          answered ? 'cursor-default' : 'cursor-pointer'
                        } ${cls}`}
                      >
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${badge}`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {attemptOption && (
                  <div
                    className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCorrectAttempt
                        ? 'border-[#BBF7D0] bg-[#DCFCE7]/80 text-[#15803D]'
                        : 'border-[#FECACA] bg-[#FEE2E2]/80 text-[#B91C1C]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {isCorrectAttempt ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 shrink-0" />
                          <span>
                            Excelente! Você acertou esta revisão. Já pode
                            marcar como dominada.
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 shrink-0" />
                          <span>
                            Ainda errou — revise o Mapa da Resposta abaixo e
                            tente novamente.
                          </span>
                        </>
                      )}
                    </div>

                    {isCorrectAttempt ? (
                      <button
                        type="button"
                        onClick={handleRemoveMastered}
                        className="min-h-[42px] px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] text-xs font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Marcar como dominada
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setAttemptOption(null)}
                        className="min-h-[42px] px-4 rounded-xl bg-[#FFFFFF] border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Tentar de novo</span>
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </article>

          {!isLocked && attemptOption && (
            <AnswerMapCard question={currentQuestion} />
          )}
        </div>
      </div>
    </div>
  );
};
