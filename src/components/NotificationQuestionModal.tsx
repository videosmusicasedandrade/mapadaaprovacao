import React, {useState} from 'react';
import {BellRing, CheckCircle2, Clock, X, XCircle} from 'lucide-react';
import {OptionKey, Question} from '../types/app';
import {AnswerMapCard} from './AnswerMapCard';
import {QuestionIllustration} from './QuestionIllustration';

interface NotificationQuestionModalProps {
  question: Question;
  scheduledTime: string;
  isTest?: boolean;
  onAnswer: (selectedOption: OptionKey) => void;
  onClose: () => void;
}

export const NotificationQuestionModal: React.FC<
  NotificationQuestionModalProps
> = ({question, scheduledTime, isTest = false, onAnswer, onClose}) => {
  const [selected, setSelected] = useState<OptionKey | null>(null);

  const isAnswered = selected !== null;
  const isCorrect = selected === question.correctOption;

  const handleSelect = (key: OptionKey) => {
    if (isAnswered) return;
    setSelected(key);
    onAnswer(key);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notif-question-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F172A]/45 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto"
    >
      <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#FFFFFF] px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
              <BellRing className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="notif-question-title"
                className="font-display text-base font-bold text-[#0F172A] truncate"
              >
                {isTest
                  ? 'Teste de Pergunta do Dia'
                  : 'Notificação · Pergunta do Dia'}
              </h2>
              <p className="text-xs text-[#475569] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>{scheduledTime}</span>
                <span aria-hidden="true">·</span>
                <span>{question.code}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{question.category}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar notificação"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#475569] hover:bg-[#F1F5F9] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <QuestionIllustration questionId={question.id} compact />

          <p className="font-display text-base sm:text-lg font-bold text-[#0F172A] leading-snug">
            {question.statement}
          </p>

          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selected === opt.key;
              const isRightOpt = opt.key === question.correctOption;

              let buttonStyle =
                'border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#93C5FD] hover:bg-[#F8FAFC] text-[#0F172A]';
              if (isAnswered) {
                if (isRightOpt) {
                  buttonStyle =
                    'border-[#15803D] bg-[#DCFCE7] text-[#0F172A] font-semibold';
                } else if (isSelected && !isRightOpt) {
                  buttonStyle =
                    'border-[#B91C1C] bg-[#FEE2E2] text-[#0F172A] font-semibold';
                } else {
                  buttonStyle =
                    'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] opacity-75';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt.key)}
                  className={`w-full min-h-[48px] flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  } ${buttonStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isAnswered && isRightOpt
                        ? 'bg-[#15803D] text-white'
                        : isAnswered && isSelected && !isRightOpt
                          ? 'bg-[#B91C1C] text-white'
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

          {isAnswered && (
            <div className="space-y-4 pt-1">
              <div
                className={`rounded-xl border p-3.5 flex items-center gap-2.5 text-sm font-semibold ${
                  isCorrect
                    ? 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]'
                    : 'border-[#FECACA] bg-[#FEE2E2] text-[#B91C1C]'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>
                      Acertou! Resposta registrada no seu histórico diário.
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 shrink-0" />
                    <span>
                      Errou desta vez — questão salva automaticamente no Caderno
                      de Erros.
                    </span>
                  </>
                )}
              </div>

              <AnswerMapCard question={question} compact />

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[48px] rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Concluir Pergunta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
