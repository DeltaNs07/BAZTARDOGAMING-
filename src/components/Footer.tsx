import React from 'react';
import { useClanData } from '../context/ClanDataContext';
import { playTacticalClick } from '../utils/soundEffects';
import { Shield, ChevronUp } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAdminAuth: () => void;
  onOpenAdminPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenAdminAuth,
  onOpenAdminPanel,
}) => {
  const { state, isAdmin } = useClanData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playTacticalClick();
  };

  return (
    <footer className="bg-[#050508] border-t border-zinc-800/80 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center overflow-hidden">
            <img
              src={state.info.logoUrl}
              alt="Baztardos"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
          <div>
            <span className="font-heading font-bold text-sm uppercase text-white tracking-wider">
              {state.info.name}
            </span>
            <div className="text-[11px] text-zinc-400">
              {state.info.game} · {state.info.server}
            </div>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-heading font-semibold uppercase tracking-wider text-xs">
          <button onClick={() => { onSelectTab('versus'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Versus
          </button>
          <button onClick={() => { onSelectTab('calendario'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Calendario
          </button>
          <button onClick={() => { onSelectTab('roster'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Roster
          </button>
          <button onClick={() => { onSelectTab('record'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Récord
          </button>
          <button onClick={() => { onSelectTab('stats'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Estadísticas
          </button>
          <button onClick={() => { onSelectTab('galeria'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Galería
          </button>
          <button onClick={() => { onSelectTab('info'); scrollToTop(); }} className="hover:text-purple-400 transition-colors">
            Info & Reglas
          </button>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors border border-zinc-800"
          title="Volver arriba"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Sub-row */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
        <div>
          <span>© {new Date().getFullYear()} {state.info.name}. Todos los derechos reservados.</span>
          <span className="mx-2">·</span>
          <span>Comunidad Competitiva Garena Delta Force</span>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={onOpenAdminPanel}
              className="text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1.5 font-heading uppercase font-bold"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              Panel de Administración (Activo)
            </button>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="text-zinc-400 hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-purple-500/80" />
              Acceso Líder / Admins
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
