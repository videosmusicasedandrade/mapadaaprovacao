import React, {useState} from 'react';
import {Check, ExternalLink, KeyRound, Lock, ShieldCheck, X} from 'lucide-react';
import {
  CHECKOUT_URL,
  MONTHLY_PRICE_TEXT,
  VALID_ACTIVATION_CODES,
} from '../config/subscription';

interface PaywallModalProps {
  reason?: string;
  onActivateCode: (code: string) => boolean;
  onSimulatePro: () => void;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  reason,
  onActivateCode,
  onSimulatePro,
  onClose,
}) => {
  const [codeInput, setCodeInput] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success';
    msg: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onActivateCode(codeInput);
    if (ok) {
      setFeedback({
        type: 'success',
        msg: 'Assinatura PRO ativada por 30 dias!',
      });
      setTimeout(onClose, 700);
    } else {
      setFeedback({
        type: 'error',
        msg: `Código inválido. Para testar, use ${VALID_ACTIVATION_CODES[0]}.`,
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F172A]/45 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto"
    >
      <div className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8]">
                Plano PRO Mensal
              </p>
              <h2
                id="paywall-title"
                className="font-display text-xl font-bold text-[#0F172A]"
              >
                Libere tudo por {MONTHLY_PRICE_TEXT}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {reason && (
          <p className="rounded-xl border border-[#FDE68A] bg-[#FEF3C7]/70 px-4 py-3 text-sm text-[#92400E]">
            {reason}
          </p>
        )}

        <ul className="space-y-2.5 text-sm text-[#334155]">
          {[
            'Todas as 32 questões ilustradas com cena vetorial própria',
            'Todos os 32 Mapas da Resposta (Por Quê, Pegadinha, Dica de Prova e CTB)',
            'Simulado Final completo (32 questões) com gabarito comentado',
            'Caderno de Erros ilimitado para revisar até acertar',
            'Notificações diárias completas (horários fixos ou aleatórios no dia)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white transition-colors"
        >
          <span>Assinar por {MONTHLY_PRICE_TEXT}</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <div className="border-t border-[#E2E8F0] pt-4 space-y-3">
          <form onSubmit={handleSubmit} className="space-y-2">
            <label
              htmlFor="paywall-code"
              className="text-xs font-semibold text-[#334155] flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>Já assinou? Ativar código de assinatura</span>
            </label>
            <div className="flex gap-2">
              <input
                id="paywall-code"
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                placeholder="Ex.: APROVADO5"
                className="flex-1 min-h-[44px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 text-sm font-mono text-[#0F172A] focus:outline-none focus:border-[#1D4ED8] focus:bg-[#FFFFFF]"
              />
              <button
                type="submit"
                className="min-h-[44px] rounded-xl border border-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] px-4 text-sm font-semibold text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ativar
              </button>
            </div>
            {feedback && (
              <p
                className={`text-xs font-medium ${
                  feedback.type === 'success'
                    ? 'text-[#15803D]'
                    : 'text-[#B91C1C]'
                }`}
              >
                {feedback.msg}
              </p>
            )}
          </form>

          <button
            type="button"
            onClick={() => {
              onSimulatePro();
              onClose();
            }}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] px-4 text-xs font-semibold text-[#334155] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>Simular Assinatura R$ 5/mês (Teste)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
