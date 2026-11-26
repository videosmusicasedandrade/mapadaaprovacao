import React, {useState} from 'react';
import {Download, Share, WifiOff, X} from 'lucide-react';
import {useOnlineStatus, usePWAInstall} from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    if (variant === 'full') {
      return (
        <div className="rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/70 p-3.5 text-sm font-medium text-[#15803D]">
          Aplicativo já instalado na tela inicial deste dispositivo.
        </div>
      );
    }
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'full'
            ? 'w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] px-4 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer'
            : 'min-h-[40px] flex items-center gap-1.5 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Instalar App</span>
      </button>
    );
  }

  if (isIOS || variant === 'full') {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={
            variant === 'full'
              ? 'w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F1F5F9] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
              : 'min-h-[40px] flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#F1F5F9] px-3 py-1.5 text-xs font-semibold text-[#334155] transition-colors whitespace-nowrap shrink-0 cursor-pointer'
          }
        >
          <Download className="w-4 h-4 shrink-0 text-[#1D4ED8]" />
          <span>{isIOS ? 'Instalar no iPhone' : 'Como instalar (PWA)'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F172A]/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F172A]">
                    Instalar Mapa da Aprovação CNH
                  </h3>
                  <p className="mt-1 text-sm text-[#475569]">
                    Tenha acesso rápido na tela inicial e estude mesmo sem
                    internet.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Fechar instruções"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-sm text-[#334155]">
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <p className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <Share className="w-4 h-4 text-[#1D4ED8]" />
                    No iPhone / iPad (Safari)
                  </p>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                    1. Toque no botão <strong>Compartilhar</strong> na barra do
                    Safari.
                    <br />
                    2. Role para baixo e toque em{' '}
                    <strong>Adicionar à Tela de Início</strong>.
                  </p>
                </div>

                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5">
                  <p className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-[#1D4ED8]" />
                    No Android / Chrome
                  </p>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">
                    Toque no menu <strong>⋮</strong> do navegador e escolha{' '}
                    <strong>Instalar aplicativo</strong> ou{' '}
                    <strong>Adicionar à tela inicial</strong>.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Entendi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 md:right-auto z-50 flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FEF3C7] px-3.5 py-2.5 text-xs font-semibold text-[#92400E] shadow-md"
    >
      <WifiOff className="w-4 h-4 shrink-0 text-[#B45309]" />
      <span>Modo offline ativo — todas as questões continuam disponíveis.</span>
    </div>
  );
};
