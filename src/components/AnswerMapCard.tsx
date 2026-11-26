import React from 'react';
import {AlertTriangle, BookOpen, CheckCircle2, Lightbulb} from 'lucide-react';
import {Question} from '../types/app';

interface AnswerMapCardProps {
  question: Question;
  compact?: boolean;
}

export const AnswerMapCard: React.FC<AnswerMapCardProps> = ({
  question,
  compact = false,
}) => {
  const correctOpt = question.options.find(
    (o) => o.key === question.correctOption,
  );

  return (
    <section
      aria-label="Mapa da Resposta"
      className={`rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] ${
        compact ? 'p-4 space-y-3' : 'p-5 sm:p-6 space-y-4'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
        <div>
          <p className="text-xs font-medium text-[#475569]">
            Mapa da Resposta · {question.code}
          </p>
          <h3
            className={`font-display font-bold text-[#0F172A] ${
              compact ? 'text-base' : 'text-lg sm:text-xl'
            }`}
          >
            {question.mapTitle}
          </h3>
        </div>
        <span className="font-mono text-xs font-medium text-[#4338CA] bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg px-2.5 py-1 whitespace-nowrap shrink-0">
          {question.ref}
        </span>
      </div>

      <div
        className={`grid gap-3 ${
          compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        }`}
      >
        {/* Resposta Correta */}
        <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#15803D] mb-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Resposta Correta</span>
          </div>
          <p className="text-sm font-semibold text-[#0F172A] leading-snug">
            {question.correctOption}) {correctOpt?.text}
          </p>
        </div>

        {/* Por Quê */}
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] mb-1.5">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Por Quê</span>
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">
            {question.why}
          </p>
        </div>

        {/* Pegadinha */}
        <div className="rounded-xl border border-[#FDE68A] bg-[#FEF3C7]/80 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B45309] mb-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Pegadinha</span>
          </div>
          <p className="text-sm text-[#334155] leading-relaxed">
            {question.trap}
          </p>
        </div>
      </div>

      {/* Dica de Prova */}
      <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#B45309] mb-1">Dica de Prova</p>
          <p className="text-sm text-[#0F172A] leading-relaxed">
            {question.tip}
          </p>
        </div>
      </div>
    </section>
  );
};
