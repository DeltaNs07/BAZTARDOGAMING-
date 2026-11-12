import React, { useState, useEffect } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { getCountdown, getAllZoneTimes, formatMatchTimeForZone } from '../utils/timezones';
import { playTacticalClick } from '../utils/soundEffects';
import { Clock, MapPin, Tv, Edit3, Shield, Swords, Calendar, Radio, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface HeroCountdownProps {
  onEditNextMatch?: () => void;
  onEditLogos?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToRoster?: () => void;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({
  onEditNextMatch,
  onEditLogos,
  onNavigateToCalendar,
  onNavigateToRoster,
}) => {
  const { state, isAdmin, selectedTimezone } = useClanData();
  const nextMatch = state.upcomingMatches[0];

  const [countdown, setCountdown] = useState(() =>
    nextMatch ? getCountdown(nextMatch.matchDate) : null
  );

  useEffect(() => {
    if (!nextMatch) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(nextMatch.matchDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextMatch?.matchDate]);

  const zoneTimes = nextMatch ? getAllZoneTimes(nextMatch.matchDate) : [];
  const primaryTimeFormatted = nextMatch
    ? formatMatchTimeForZone(nextMatch.matchDate, selectedTimezone)
    : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#130a22] via-[#090a10] to-[#07080c] border-b border-zinc-800/80 pt-8 pb-14 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Texture & Subtle Light Scrim */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none bg-cover bg-center mix-blend-luminosity filter blur-[1px]"
        style={{ backgroundImage: `url(${state.info.bannerUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-black/40 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 tactical-grid pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto">
        {/* Clan Top Announcement Kicker (Editable) */}
        {state.info.announcement && (
          <div className="mb-6 max-w-4xl mx-auto bg-purple-950/40 border border-purple-500/40 rounded-xl px-4 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm text-purple-200 shadow-lg shadow-purple-950/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold uppercase tracking-wider text-purple-400 font-heading shrink-0 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
                COMUNICADO:
              </span>
              <span className="truncate text-zinc-200">{state.info.announcement}</span>
            </div>
            {isAdmin && (
              <button
                onClick={onEditNextMatch}
                className="shrink-0 text-purple-400 hover:text-white underline text-xs ml-2 font-heading uppercase"
              >
                Editar
              </button>
            )}
          </div>
        )}

        {/* Header Text & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 font-heading mb-2">
            <span>Garena Delta Force: Hawk Ops</span>
            <span>·</span>
            <span>Escuadrón Táctico Oficial</span>
            <span>·</span>
            <span className="text-zinc-400 font-mono-numbers">{state.info.tag}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white font-heading">
            {state.info.name}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto italic">
            "{state.info.motto}"
          </p>
        </div>

        {/* Main Versus Card */}
        {nextMatch ? (
          <div className="max-w-5xl mx-auto bg-[#0d0f17]/95 border border-purple-500/30 rounded-2xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/90 tactical-corner-tl">
            {/* Top Match Bar: Tournament & Modality & Admin Edit */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-zinc-800/80 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <Swords className="w-4 h-4 text-purple-400" />
                <span className="font-bold uppercase tracking-wider text-purple-400 font-heading">
                  {nextMatch.tournamentName || 'Enfrentamiento de Clanes'}
                </span>
                <span>·</span>
                <span className="text-zinc-300">{nextMatch.modality}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  {nextMatch.map}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    {onEditLogos && (
                      <button
                        onClick={() => {
                          onEditLogos();
                          playTacticalClick();
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold uppercase tracking-wider text-[11px] transition-colors"
                        title="Cambiar logo y portada del clan"
                      >
                        <ImageIcon className="w-3 h-3 text-purple-400" />
                        Logos
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (onEditNextMatch) onEditNextMatch();
                        playTacticalClick();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950/60 text-purple-300 border border-purple-500/50 hover:bg-purple-600 hover:text-white font-semibold uppercase tracking-wider text-[11px] transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      Editar Versus
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* The Versus Clash: Our Clan vs Opponent Clan */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
              {/* Left Side: BAZTARDOS GAMING */}
              <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right group">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/80 border-2 border-purple-500/50 p-2 shadow-xl shadow-purple-950/50 flex items-center justify-center overflow-hidden mb-3 group-hover:border-purple-400 transition-all">
                    <img
                      src={state.info.logoUrl}
                      alt={state.info.name}
                      className="w-full h-full object-contain filter drop-shadow"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {isAdmin && onEditLogos && (
                    <button
                      onClick={onEditLogos}
                      className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white shadow-lg transition-transform hover:scale-110"
                      title="Cambiar Logo de BAZTARDOS"
                    >
                      <ImageIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white font-heading">
                  {state.info.name}
                </h2>
                <div className="text-xs text-purple-400 font-mono-numbers mt-0.5">
                  {state.info.tag} · Local / Desafiante
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Capitán: {state.roster[0]?.gamertag || 'Comandante BZT'}
                </div>
              </div>

              {/* Center: Live Status / Countdown or VS Emblem */}
              <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-2">
                {countdown?.isLive ? (
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-600/30 border border-rose-500 text-rose-300 text-xs font-bold uppercase tracking-widest animate-pulse mb-3">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    ¡MATCH EN VIVO AHORA!
                  </div>
                ) : countdown?.isPast ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs uppercase tracking-wider mb-3">
                    Match Finalizado
                  </div>
                ) : (
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    Cuenta Regresiva
                  </div>
                )}

                {/* Digital Countdown Timer Blocks */}
                {!countdown?.isPast && (
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-xs mb-3">
                    <div className="bg-black/70 border border-zinc-800 rounded-xl p-1.5 sm:p-2 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono-numbers">
                        {String(countdown?.days ?? 0).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-heading">Días</div>
                    </div>
                    <div className="bg-black/70 border border-zinc-800 rounded-xl p-1.5 sm:p-2 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono-numbers">
                        {String(countdown?.hours ?? 0).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-heading">Horas</div>
                    </div>
                    <div className="bg-black/70 border border-zinc-800 rounded-xl p-1.5 sm:p-2 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono-numbers">
                        {String(countdown?.minutes ?? 0).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-heading">Min</div>
                    </div>
                    <div className="bg-black/70 border border-zinc-800 rounded-xl p-1.5 sm:p-2 text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono-numbers">
                        {String(countdown?.seconds ?? 0).padStart(2, '0')}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-heading">Seg</div>
                    </div>
                  </div>
                )}

                <div className="text-2xl font-black italic text-purple-400 font-heading tracking-widest">
                  VS
                </div>

                <div className="text-xs text-zinc-300 mt-2 font-mono-numbers">
                  {primaryTimeFormatted?.fullString}
                </div>
              </div>

              {/* Right Side: Opponent Clan */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left group">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/80 border-2 border-zinc-700/80 p-2 shadow-xl flex items-center justify-center overflow-hidden mb-3 group-hover:border-zinc-500 transition-all">
                    <img
                      src={nextMatch.opponentLogo}
                      alt={nextMatch.opponentName}
                      className="w-full h-full object-contain filter drop-shadow"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {isAdmin && onEditNextMatch && (
                    <button
                      onClick={onEditNextMatch}
                      className="absolute -bottom-1 -left-1 p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-purple-400 shadow-lg transition-transform hover:scale-110 border border-zinc-600"
                      title="Cambiar Logo de Clan Rival"
                    >
                      <ImageIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white font-heading">
                  {nextMatch.opponentName}
                </h2>
                <div className="text-xs text-rose-400 font-mono-numbers mt-0.5">
                  {nextMatch.opponentTag} · Clan Rival
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Región: {nextMatch.serverRegion}
                </div>
              </div>
            </div>

            {/* Timezone Matrix Strip across Multiple Countries */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-heading flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  Horarios del Versus por País:
                </span>
                <span className="text-[11px] text-zinc-400">
                  Calculado automáticamente según huso horario oficial
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {zoneTimes.map((zone) => (
                  <div
                    key={zone.code}
                    className="bg-black/50 border border-zinc-800/80 hover:border-purple-500/50 rounded-xl p-2 text-center transition-colors"
                  >
                    <div className="text-base mb-0.5">{zone.flag}</div>
                    <div className="text-[11px] font-semibold text-zinc-200 truncate">
                      {zone.country}
                    </div>
                    <div className="text-xs font-bold text-purple-400 font-mono-numbers mt-0.5">
                      {zone.time}
                    </div>
                    <div className="text-[9px] text-zinc-500">{zone.utcOffset}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Actions / Links */}
            <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                {nextMatch.streamUrl && (
                  <a
                    href={nextMatch.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-purple-950/40"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    Ver Transmisión en Vivo
                  </a>
                )}
                {onNavigateToRoster && (
                  <button
                    onClick={() => {
                      onNavigateToRoster();
                      playTacticalClick();
                    }}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors border border-zinc-700"
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    Roster Titular
                  </button>
                )}
              </div>

              {onNavigateToCalendar && (
                <button
                  onClick={() => {
                    onNavigateToCalendar();
                    playTacticalClick();
                  }}
                  className="text-xs font-semibold uppercase tracking-wider text-purple-400 hover:text-purple-300 font-heading flex items-center gap-1 transition-colors"
                >
                  Ver Calendario Completo de Versus
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Empty match state */
          <div className="max-w-2xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center">
            <Swords className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white font-heading">
              No hay versus programado actualmente
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Los administradores pueden agendar el próximo encuentro competitivo desde el panel.
            </p>
            {isAdmin && onEditNextMatch && (
              <button
                onClick={onEditNextMatch}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md"
              >
                + Agendar Nuevo Versus
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
