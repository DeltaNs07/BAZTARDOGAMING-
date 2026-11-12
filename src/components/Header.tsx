import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { TIMEZONES_LIST } from '../utils/timezones';
import { playTacticalClick, toggleSound } from '../utils/soundEffects';
import { Shield, ShieldAlert, Volume2, VolumeX, Globe, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAdminAuth: () => void;
  onOpenAdminPanel: () => void;
  onOpenLogosModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdminAuth,
  onOpenAdminPanel,
  onOpenLogosModal,
}) => {
  const { state, isAdmin, logoutAdmin, selectedTimezone, setSelectedTimezone } = useClanData();
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    playTacticalClick();
  };

  const navItems = [
    { id: 'versus', label: 'Versus' },
    { id: 'calendario', label: 'Calendario' },
    { id: 'roster', label: 'Roster' },
    { id: 'record', label: 'Récord & Historial' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'galeria', label: 'Galería' },
    { id: 'info', label: 'Info & Reglas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07080c]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text/logo Brand mark with quick edit on hover if admin */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div 
            onClick={() => { setActiveTab('versus'); playTacticalClick(); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-md shadow-purple-950/30">
              <img 
                src={state.info.logoUrl} 
                alt="Baztardos Clan Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="text-base sm:text-lg font-bold tracking-wider uppercase font-heading text-white group-hover:text-purple-400 transition-colors whitespace-nowrap">
              {state.info.name}
            </span>
          </div>

          {/* Quick Logo Editor button if Admin */}
          {isAdmin && onOpenLogosModal && (
            <button
              onClick={() => {
                onOpenLogosModal();
                playTacticalClick();
              }}
              className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-[10px] font-heading uppercase tracking-wider transition-colors ml-1"
              title="Cambiar Logo y Portada"
            >
              <ImageIcon className="w-3 h-3 text-purple-400" />
              <span>Logos</span>
            </button>
          )}
        </div>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wide uppercase font-heading text-zinc-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  playTacticalClick();
                }}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-purple-400 font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Timezone selector, sound toggle & Primary Action (Admin) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Timezone Picker */}
          <div className="relative hidden sm:flex items-center">
            <Globe className="w-3.5 h-3.5 text-purple-400 mr-1.5 pointer-events-none" />
            <select
              value={selectedTimezone}
              onChange={(e) => {
                setSelectedTimezone(e.target.value);
                playTacticalClick();
              }}
              className="bg-zinc-900 text-zinc-300 text-xs border border-zinc-800 rounded px-2 py-1 pr-6 cursor-pointer focus:border-purple-500 focus:outline-none appearance-none"
              title="Cambiar zona horaria principal"
            >
              {TIMEZONES_LIST.map((zone) => (
                <option key={zone.code} value={zone.tz} className="bg-zinc-950 text-white">
                  {zone.flag} {zone.country} ({zone.utcOffset})
                </option>
              ))}
            </select>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/40 transition-colors"
            title={soundOn ? 'Sonido táctico activado' : 'Sonido silenciado'}
            aria-label="Toggle sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Admin Action Button */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  onOpenAdminPanel();
                  playTacticalClick();
                }}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider font-heading bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-purple-950/40 border border-purple-400/30"
              >
                <Shield className="w-3.5 h-3.5 text-purple-200" />
                <span>Panel Admin</span>
              </button>
              <button
                onClick={logoutAdmin}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                title="Cerrar sesión de admin"
                aria-label="Cerrar sesión"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAdminAuth();
                playTacticalClick();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider font-heading bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 hover:border-purple-500/50 rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span>Modo Admin</span>
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden pt-3 pb-2 border-t border-zinc-800 mt-3 grid grid-cols-2 gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
                playTacticalClick();
              }}
              className={`text-left px-3 py-2 rounded-lg text-xs font-heading uppercase tracking-wide ${
                activeTab === item.id ? 'bg-purple-950/60 text-purple-300 font-bold border border-purple-500/30' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="col-span-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Zona Horaria:</span>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-zinc-900 text-white text-xs border border-zinc-800 rounded px-2 py-1"
            >
              {TIMEZONES_LIST.map((zone) => (
                <option key={zone.code} value={zone.tz}>
                  {zone.flag} {zone.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
