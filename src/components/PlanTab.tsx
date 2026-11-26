import React, {useState} from 'react';
import {
  Check,
  CheckCircle2,
  ExternalLink,
  Flame,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import {
  CHECKOUT_URL,
  formatDateBR,
  getDaysRemaining,
  MONTHLY_PRICE_TEXT,
  VALID_ACTIVATION_CODES,
} from '../config/subscription';
import {ALL_CATEGORIES, CATEGORY_ACCENT, QUESTIONS} from '../data/questions';
import {
  SimuladoRecord,
  StreakState,
  StudyAnswerRecord,
  SubscriptionState,
} from '../types/app';
import {PWAInstallButton} from './PWAInstallButton';

interface PlanTabProps {
  isPro: boolean;
  subscription: SubscriptionState;
  answers: Record<number, StudyAnswerRecord>;
  simulados: SimuladoRecord[];
  errorCount: number;
  streak: StreakState;
  onActivateCode: (code: string) => boolean;
  onSimulatePro: () => void;
  onRevertToFree: () => void;
  onResetProgress: () => void;
}

export const PlanTab: React.FC<PlanTabProps> = ({
  isPro,
  subscription,
  answers,
  simulados,
  errorCount,
  streak,
  onActivateCode,
  onSimulatePro,
  onRevertToFree,
  onResetProgress,
}) => {
  const [codeInput, setCodeInput] = useState('');
  const [codeMessage, setCodeMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
  const accuracy =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const daysLeft = getDaysRemaining(subscription);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onActivateCode(codeInput);
    if (ok) {
      setCodeMessage({
        type: 'success',
        text: 'Assinatura PRO ativada com sucesso por 30 dias!',
      });
      setCodeInput('');
    } else {
      setCodeMessage({
        type: 'error',
        text: `Código não reconhecido. Use ${VALID_ACTIVATION_CODES[0]} para ativar.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Metrics Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <p className="text-xs font-medium text-[#475569]">
            Questões estudadas
          </p>
          <p className="font-mono text-2xl font-bold text-[#0F172A] tabular-nums mt-1">
            {answeredCount}
            <span className="text-sm font-normal text-[#64748B]">/32</span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <p className="text-xs font-medium text-[#475569]">Taxa de acerto</p>
          <p className="font-mono text-2xl font-bold text-[#15803D] tabular-nums mt-1">
            {accuracy}%
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <p className="text-xs font-medium text-[#475569]">
            Ofensiva de estudo
          </p>
          <p className="font-mono text-2xl font-bold text-[#B45309] tabular-nums mt-1 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-[#D97706]" />
            <span>
              {streak.currentStreak}{' '}
              <span className="text-sm font-normal text-[#64748B]">
                {streak.currentStreak === 1 ? 'dia' : 'dias'}
              </span>
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <p className="text-xs font-medium text-[#475569]">
            Simulados / Erros
          </p>
          <p className="font-mono text-2xl font-bold text-[#1D4ED8] tabular-nums mt-1">
            {simulados.length}{' '}
            <span className="text-sm font-normal text-[#64748B]">
              · {errorCount} erros
            </span>
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Subscription Management Column */}
        <section className="lg:col-span-7 rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#E2E8F0]">
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8]">
                Assinatura Mensal Transparente
              </p>
              <h1 className="font-display text-2xl font-extrabold text-[#0F172A] mt-0.5">
                Mapa da Aprovação PRO — {MONTHLY_PRICE_TEXT}
              </h1>
              <p className="text-sm text-[#475569] mt-1 leading-relaxed">
                Estude poucos minutos por dia com mapas visuais, prevenção de
                pegadinhas, simulado completo e notificações de perguntas.
              </p>
            </div>
            <span
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 ${
                isPro
                  ? 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]'
                  : 'border-[#E2E8F0] bg-[#F1F5F9] text-[#475569]'
              }`}
            >
              {isPro ? 'Plano PRO Ativo' : 'Plano Gratuito'}
            </span>
          </div>

          {isPro && (
            <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-4 space-y-2">
              <p className="text-sm font-bold text-[#15803D] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Sua assinatura mensal de R$ 5,00 está ativa!</span>
              </p>
              <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
                <div>
                  <p className="text-[#475569]">Ativada em</p>
                  <p className="font-mono font-bold text-[#0F172A] tabular-nums">
                    {formatDateBR(subscription.activatedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-[#475569]">Válida até</p>
                  <p className="font-mono font-bold text-[#0F172A] tabular-nums">
                    {formatDateBR(subscription.expiresAt)}
                  </p>
                </div>
                <div>
                  <p className="text-[#475569]">Restam</p>
                  <p className="font-mono font-bold text-[#15803D] tabular-nums">
                    {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Plan comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-[#0F172A]">
                  Gratuito
                </h2>
                <span className="font-mono text-xs font-bold text-[#475569]">
                  R$ 0
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#334155]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>6 primeiras questões ilustradas (Q01–Q06)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Mapas da Resposta das 6 questões liberadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                  <span>Notificações diárias de degustação</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-sm font-bold text-[#1D4ED8]">
                  PRO Mensal
                </h2>
                <span className="font-mono text-xs font-bold text-[#1D4ED8]">
                  {MONTHLY_PRICE_TEXT}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#0F172A]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Todas as 32 questões ilustradas (Q01–Q32)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Todos os 32 Mapas da Resposta + referências CTB</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>Simulado Final (32 questões) + gabarito comentado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                  <span>
                    Caderno de Erros ilimitado + Notificações Diárias completas
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Primary Checkout CTA */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white transition-colors"
          >
            <span>Assinar por {MONTHLY_PRICE_TEXT}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Activation Code Form */}
          <form
            onSubmit={handleActivate}
            className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-2.5"
          >
            <label
              htmlFor="plan-activation-code"
              className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5"
            >
              <KeyRound className="w-4 h-4 text-[#1D4ED8]" />
              <span>Ativar código de assinatura</span>
            </label>
            <p className="text-xs text-[#475569]">
              Após assinar, digite seu código (ex.:{' '}
              <code className="font-mono font-bold text-[#1D4ED8]">
                APROVADO5
              </code>
              ) para liberar 30 dias de acesso completo neste dispositivo.
            </p>
            <div className="flex gap-2">
              <input
                id="plan-activation-code"
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                placeholder="Digite o código (APROVADO5)"
                className="flex-1 min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] px-3.5 text-sm font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-4 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ativar
              </button>
            </div>
            {codeMessage && (
              <p
                className={`text-xs font-semibold ${
                  codeMessage.type === 'success'
                    ? 'text-[#15803D]'
                    : 'text-[#B91C1C]'
                }`}
              >
                {codeMessage.text}
              </p>
            )}
          </form>

          {/* Developer / Test Controls */}
          <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onSimulatePro}
              className="min-h-[42px] px-3.5 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 hover:bg-[#DCFCE7] text-xs font-semibold text-[#15803D] flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simular Assinatura R$ 5/mês (Teste)</span>
            </button>

            <button
              type="button"
              onClick={onRevertToFree}
              className="min-h-[42px] px-3.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] text-xs font-semibold text-[#475569] cursor-pointer"
            >
              Voltar para Plano Gratuito
            </button>
          </div>
        </section>

        {/* Right Column: Progress by Category + PWA Install + Reset */}
        <div className="lg:col-span-5 space-y-5">
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-4">
            <div>
              <h2 className="font-display text-base font-bold text-[#0F172A]">
                Progresso por Tema
              </h2>
              <p className="text-xs text-[#475569] mt-0.5">
                Acompanhe seu domínio em cada matéria cobrada na prova do
                DETRAN.
              </p>
            </div>

            <div className="space-y-3.5">
              {ALL_CATEGORIES.map((cat) => {
                const catQuestions = QUESTIONS.filter(
                  (q) => q.category === cat,
                );
                const catAnswered = catQuestions.filter(
                  (q) => answers[q.id],
                ).length;
                const catCorrect = catQuestions.filter(
                  (q) => answers[q.id]?.isCorrect,
                ).length;
                const pct = Math.round(
                  (catCorrect / catQuestions.length) * 100,
                );
                const accent = CATEGORY_ACCENT[cat];

                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0F172A]">
                        {cat}
                      </span>
                      <span className="font-mono text-[#475569] tabular-nums">
                        {catCorrect}/{catQuestions.length} acertos (
                        {catAnswered} feitas)
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#F1F5F9] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${accent.bar}`}
                        style={{width: `${pct}%`}}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PWA Installation Card */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-sm font-bold text-[#0F172A]">
                  Aplicativo no Celular (PWA)
                </h2>
                <p className="text-xs text-[#475569]">
                  Instale na tela inicial e estude até sem internet.
                </p>
              </div>
            </div>
            <PWAInstallButton variant="full" />
          </section>

          {/* Reset Study Data */}
          <section className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-5 space-y-3">
            <h2 className="font-display text-sm font-bold text-[#0F172A]">
              Reiniciar progresso de estudo
            </h2>
            <p className="text-xs text-[#475569]">
              Apaga respostas, caderno de erros e histórico de simulados salvos
              neste navegador (mantém sua assinatura).
            </p>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="min-h-[40px] px-3.5 rounded-xl border border-[#FECACA] bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] text-xs font-semibold text-[#B91C1C] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zerar progresso de estudo</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="min-h-[40px] px-3.5 rounded-xl bg-[#B91C1C] hover:bg-[#991B1B] text-xs font-semibold text-white cursor-pointer"
                >
                  Confirmar limpeza
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="min-h-[40px] px-3.5 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] text-xs font-semibold text-[#334155] cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
