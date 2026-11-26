import React, {useMemo, useState} from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  RotateCcw,
  Search,
  X,
  XCircle,
} from 'lucide-react';
import {FREE_QUESTION_LIMIT} from '../config/subscription';
import {
  ALL_CATEGORIES,
  CATEGORY_SHORT_LABEL,
  QUESTIONS,
} from '../data/questions';
import {Category, OptionKey, StudyAnswerRecord} from '../types/app';
import {AnswerMapCard} from './AnswerMapCard';
import {QuestionIllustration} from './QuestionIllustration';

interface StudyTabProps {
  isPro: boolean;
  answers: Record<number, StudyAnswerRecord>;
  reviewMarks: number[];
  selectedQuestionId: number;
  onSelectQuestion: (id: number) => void;
  onAnswerQuestion: (questionId: number, option: OptionKey) => void;
  onClearAnswer: (questionId: number) => void;
  onToggleReviewMark: (questionId: number) => void;
  onOpenPaywall: (reason: string) => void;
}

export const StudyTab: React.FC<StudyTabProps> = ({
  isPro,
  answers,
  reviewMarks,
  selectedQuestionId,
  onSelectQuestion,
  onAnswerQuestion,
  onClearAnswer,
  onToggleReviewMark,
  onOpenPaywall,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'Todas' | Category>(
    'Todas',
  );
  const [statusFilter, setStatusFilter] = useState<
    'todas' | 'nao-respondidas' | 'revisao'
  >('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();
    return QUESTIONS.filter((q) => {
      if (categoryFilter !== 'Todas' && q.category !== categoryFilter) {
        return false;
      }
      if (statusFilter === 'nao-respondidas' && answers[q.id]) {
        return false;
      }
      if (statusFilter === 'revisao' && !reviewMarks.includes(q.id)) {
        return false;
      }
      if (!qLower) return true;
      const haystack = [
        q.code,
        q.category,
        q.mapTitle,
        q.statement,
        q.why,
        q.trap,
        q.tip,
        q.ref,
        ...q.options.map((o) => o.text),
        ...q.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(qLower);
    });
  }, [categoryFilter, statusFilter, searchQuery, answers, reviewMarks]);

  const activeQuestion = useMemo(() => {
    const inFiltered = filteredQuestions.find(
      (q) => q.id === selectedQuestionId,
    );
    if (inFiltered) return inFiltered;
    return filteredQuestions[0] ?? QUESTIONS[0];
  }, [filteredQuestions, selectedQuestionId]);

  const activeIndex = filteredQuestions.findIndex(
    (q) => q.id === activeQuestion.id,
  );
  const isLocked = !isPro && activeQuestion.id > FREE_QUESTION_LIMIT;
  const answerRecord = answers[activeQuestion.id];
  const isMarked = reviewMarks.includes(activeQuestion.id);

  const goPrev = () => {
    if (activeIndex > 0) {
      onSelectQuestion(filteredQuestions[activeIndex - 1].id);
    }
  };

  const goNext = () => {
    if (activeIndex >= 0 && activeIndex < filteredQuestions.length - 1) {
      onSelectQuestion(filteredQuestions[activeIndex + 1].id);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;

  return (
    <div className="space-y-5">
      {/* Search and Category Filters */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Buscar por palavra-chave (ex.: "neblina", "celular", "via local", "pneu")'
              className="w-full min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] pl-10 pr-9 text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#1D4ED8] focus:bg-[#FFFFFF]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#64748B] hover:text-[#0F172A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F1F5F9] self-start sm:self-auto shrink-0">
            {(
              [
                {id: 'todas', label: 'Todas'},
                {id: 'nao-respondidas', label: 'Pendentes'},
                {id: 'revisao', label: `Revisão (${reviewMarks.length})`},
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStatusFilter(item.id)}
                className={`min-h-[36px] px-3 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  statusFilter === item.id
                    ? 'bg-[#FFFFFF] text-[#0F172A] shadow-xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => setCategoryFilter('Todas')}
            className={`min-h-[38px] px-3.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
              categoryFilter === 'Todas'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'
            }`}
          >
            Todas (32)
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const count = QUESTIONS.filter((q) => q.category === cat).length;
            const active = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`min-h-[38px] px-3.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                    : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                }`}
              >
                {CATEGORY_SHORT_LABEL[cat]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-8 text-center space-y-3">
          <p className="font-display text-base font-bold text-[#0F172A]">
            Nenhuma questão encontrada com esse filtro
          </p>
          <p className="text-sm text-[#475569]">
            Limpe a busca ou altere a categoria para continuar estudando.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('Todas');
              setStatusFilter('todas');
              setSearchQuery('');
            }}
            className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white cursor-pointer"
          >
            Mostrar todas as 32 questões
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[296px_1fr] gap-5 items-start">
          {/* Question Navigator Sidebar (Desktop) & Horizontal Strip (Mobile) */}
          <aside className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 space-y-3 lg:sticky lg:top-20">
            <div className="flex items-center justify-between gap-2 text-xs text-[#475569]">
              <span className="font-semibold text-[#0F172A]">
                Caderno ({filteredQuestions.length})
              </span>
              <span className="font-mono tabular-nums">
                {correctCount}/{answeredCount} acertos
              </span>
            </div>

            <div className="flex lg:grid lg:grid-cols-4 gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-1 lg:pb-0">
              {filteredQuestions.map((q) => {
                const rec = answers[q.id];
                const locked = !isPro && q.id > FREE_QUESTION_LIMIT;
                const isActive = q.id === activeQuestion.id;
                const marked = reviewMarks.includes(q.id);

                let style =
                  'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:border-[#93C5FD]';
                if (locked) {
                  style =
                    'border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B] hover:border-[#CBD5E1]';
                } else if (rec?.isCorrect) {
                  style =
                    'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D] font-bold';
                } else if (rec && !rec.isCorrect) {
                  style =
                    'border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C] font-bold';
                }

                if (isActive) {
                  style =
                    'border-[#1D4ED8] bg-[#1D4ED8] text-white font-bold shadow-xs';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onSelectQuestion(q.id)}
                    className={`relative min-w-[46px] min-h-[44px] rounded-xl border text-xs font-mono tabular-nums flex items-center justify-center gap-0.5 transition-colors shrink-0 cursor-pointer ${style}`}
                    aria-label={`Questão ${q.code}`}
                  >
                    <span>{String(q.id).padStart(2, '0')}</span>
                    {locked && <Lock className="w-3 h-3 opacity-75" />}
                    {marked && !locked && (
                      <span
                        className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#FDE68A]' : 'bg-[#B45309]'
                        }`}
                        title="Marcada para revisão"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {!isPro && (
              <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 space-y-2">
                <p className="text-xs font-semibold text-[#1E40AF]">
                  Plano Gratuito · 6 de 32 questões liberadas
                </p>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Desbloqueie Q07 a Q32, todos os Mapas da Resposta e o Simulado
                  Final por apenas R$ 5,00/mês.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onOpenPaywall(
                      'Desbloqueie todas as 32 questões ilustradas e Mapas da Resposta por R$ 5,00/mês.',
                    )
                  }
                  className="w-full min-h-[40px] rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Liberar Plano PRO · R$ 5/mês
                </button>
              </div>
            )}
          </aside>

          {/* Active Question Study Workspace */}
          <div className="space-y-5 min-w-0">
            <article className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 sm:p-6 space-y-5">
              {/* Clean unboxed metadata header + review bookmark */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
                  <span className="font-mono font-bold text-[#1D4ED8]">
                    {activeQuestion.code}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#334155]">
                    {activeQuestion.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span
                    className={
                      isLocked
                        ? 'text-[#64748B] font-medium'
                        : !answerRecord
                          ? 'text-[#475569] font-medium'
                          : answerRecord.isCorrect
                            ? 'text-[#15803D] font-semibold'
                            : 'text-[#B91C1C] font-semibold'
                    }
                  >
                    {isLocked
                      ? 'Exclusiva PRO'
                      : !answerRecord
                        ? 'Não respondida'
                        : answerRecord.isCorrect
                          ? 'Acertou'
                          : 'Errou'}
                  </span>
                </div>

                {!isLocked && (
                  <button
                    type="button"
                    onClick={() => onToggleReviewMark(activeQuestion.id)}
                    className={`min-h-[40px] px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isMarked
                        ? 'border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isMarked ? 'fill-[#B45309]' : ''}`}
                    />
                    <span>{isMarked ? 'Marcada p/ revisão' : 'Marcar revisão'}</span>
                  </button>
                )}
              </div>

              {isLocked ? (
                <div className="space-y-5 py-2">
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="blur-xs opacity-60 pointer-events-none select-none">
                      <QuestionIllustration questionId={activeQuestion.id} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF]/70 p-4">
                      <div className="max-w-sm rounded-2xl border border-[#CBD5E1] bg-[#FFFFFF] p-5 text-center shadow-lg space-y-3">
                        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] mx-auto flex items-center justify-center">
                          <Lock className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-bold text-[#0F172A]">
                          Questão {activeQuestion.code} disponível no Plano PRO
                        </h3>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          O plano gratuito libera as 6 primeiras questões
                          ilustradas. Assine por{' '}
                          <strong className="text-[#0F172A]">
                            R$ 5,00/mês
                          </strong>{' '}
                          para liberar todas as 32 questões, Mapas da Resposta e
                          Simulado Final.
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            onOpenPaywall(
                              `Libere a ${activeQuestion.code} (${activeQuestion.category}) e todas as outras 25 questões PRO por R$ 5,00/mês.`,
                            )
                          }
                          className="w-full min-h-[44px] rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white transition-colors cursor-pointer"
                        >
                          Desbloquear por R$ 5,00/mês
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Custom Vector Scene Illustration */}
                  <QuestionIllustration questionId={activeQuestion.id} />

                  {/* Statement */}
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                    {activeQuestion.statement}
                  </h2>

                  {/* 4 Thumb-Friendly Options */}
                  <div className="space-y-2.5">
                    {activeQuestion.options.map((opt) => {
                      const isAnswered = !!answerRecord;
                      const isSelected =
                        answerRecord?.selectedOption === opt.key;
                      const isCorrectOpt =
                        opt.key === activeQuestion.correctOption;

                      let btnClasses =
                        'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#93C5FD] hover:bg-[#F8FAFC] text-[#0F172A]';
                      let badgeClasses = 'bg-[#F1F5F9] text-[#334155]';

                      if (isAnswered) {
                        if (isCorrectOpt) {
                          btnClasses =
                            'border-[#15803D] bg-[#DCFCE7] text-[#0F172A] font-semibold';
                          badgeClasses = 'bg-[#15803D] text-white';
                        } else if (isSelected && !isCorrectOpt) {
                          btnClasses =
                            'border-[#B91C1C] bg-[#FEE2E2] text-[#0F172A] font-semibold';
                          badgeClasses = 'bg-[#B91C1C] text-white';
                        } else {
                          btnClasses =
                            'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] opacity-75';
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          disabled={isAnswered}
                          onClick={() =>
                            onAnswerQuestion(activeQuestion.id, opt.key)
                          }
                          className={`w-full min-h-[52px] flex items-center gap-3.5 rounded-xl border px-4 py-3 text-left text-sm sm:text-base transition-colors ${
                            isAnswered ? 'cursor-default' : 'cursor-pointer'
                          } ${btnClasses}`}
                        >
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${badgeClasses}`}
                          >
                            {opt.key}
                          </span>
                          <span className="flex-1 leading-snug">
                            {opt.text}
                          </span>
                          {isAnswered && isCorrectOpt && (
                            <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrectOpt && (
                            <XCircle className="w-5 h-5 text-[#B91C1C] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Result feedback bar + retry option */}
                  {answerRecord && (
                    <div
                      className={`rounded-xl border px-4 py-3 flex flex-wrap items-center justify-between gap-3 ${
                        answerRecord.isCorrect
                          ? 'border-[#BBF7D0] bg-[#DCFCE7]/80 text-[#15803D]'
                          : 'border-[#FECACA] bg-[#FEE2E2]/80 text-[#B91C1C]'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        {answerRecord.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span>
                              Acertou! Confira o Mapa da Resposta abaixo para
                              fixar a regra.
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 shrink-0" />
                            <span>
                              Você marcou {answerRecord.selectedOption}, mas a
                              correta é {activeQuestion.correctOption}. Salva no
                              Caderno de Erros.
                            </span>
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onClearAnswer(activeQuestion.id)}
                        className="min-h-[36px] px-3 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Refazer</span>
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Bottom Prev / Next navigation */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={activeIndex <= 0}
                  className="min-h-[44px] px-4 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-[#0F172A] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <span className="text-xs font-mono tabular-nums text-[#475569]">
                  {activeIndex + 1} / {filteredQuestions.length}
                </span>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={activeIndex >= filteredQuestions.length - 1}
                  className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold text-white flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* MAPA DA RESPOSTA immediately below when answered */}
            {!isLocked && answerRecord && (
              <AnswerMapCard question={activeQuestion} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
