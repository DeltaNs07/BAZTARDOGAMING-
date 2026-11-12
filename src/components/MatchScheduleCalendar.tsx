import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { UpcomingMatch } from '../types/clan';
import { TIMEZONES_LIST, formatMatchTimeForZone, getAllZoneTimes, getCountdown } from '../utils/timezones';
import { playTacticalClick } from '../utils/soundEffects';
import { Calendar, Plus, Edit, Trash2, MapPin, Tv, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface MatchScheduleCalendarProps {
  onAddNewMatch: () => void;
  onEditMatch: (match: UpcomingMatch) => void;
  onRecordResult: (match: UpcomingMatch) => void;
}

export const MatchScheduleCalendar: React.FC<MatchScheduleCalendarProps> = ({
  onAddNewMatch,
  onEditMatch,
  onRecordResult,
}) => {
  const { state, isAdmin, selectedTimezone, setSelectedTimezone, deleteUpcomingMatch } = useClanData();
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [filterModality, setFilterModality] = useState<string>('all');

  const modalities = Array.from(
    new Set(['all', ...state.upcomingMatches.map((m) => m.modality.trim()).filter(Boolean)])
  );

  const filteredMatches = state.upcomingMatches.filter((m) => {
    if (filterModality === 'all') return true;
    return m.modality.toLowerCase().includes(filterModality.toLowerCase()) || m.map.toLowerCase().includes(filterModality.toLowerCase());
  });

  const toggleExpand = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
    playTacticalClick();
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
            <Calendar className="w-4 h-4" />
            <span>Calendario Oficial de Competencias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
            Próximos Versus & Scrims
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Horarios sincronizados automáticamente según país seleccionado.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timezone Switcher */}
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5">
            <span className="text-xs text-zinc-400">Ver horas en:</span>
            <select
              value={selectedTimezone}
              onChange={(e) => {
                setSelectedTimezone(e.target.value);
                playTacticalClick();
              }}
              className="bg-transparent text-purple-400 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {TIMEZONES_LIST.map((z) => (
                <option key={z.code} value={z.tz} className="bg-zinc-950 text-white">
                  {z.flag} {z.country} ({z.utcOffset})
                </option>
              ))}
            </select>
          </div>

          {/* Admin Add Match Button */}
          {isAdmin && (
            <button
              onClick={() => {
                onAddNewMatch();
                playTacticalClick();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-purple-950/40"
            >
              <Plus className="w-3.5 h-3.5" />
              Agendar Versus
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {modalities.map((mod) => (
          <button
            key={mod}
            onClick={() => {
              setFilterModality(mod);
              playTacticalClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterModality === mod
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950/30'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {mod === 'all' ? 'Todos los Modos' : mod}
          </button>
        ))}
      </div>

      {/* Match Cards List */}
      {filteredMatches.length === 0 ? (
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center text-zinc-400">
          No hay versus programados con los filtros seleccionados.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMatches.map((match, index) => {
            const formattedTime = formatMatchTimeForZone(match.matchDate, selectedTimezone);
            const countdown = getCountdown(match.matchDate);
            const isExpanded = expandedMatchId === match.id;
            const zoneTimes = getAllZoneTimes(match.matchDate);

            return (
              <div
                key={match.id}
                className="bg-[#0c0d14]/90 border border-zinc-800/80 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all backdrop-blur-sm"
              >
                {/* Main Card Row */}
                <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Index badge & Timing */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-9 h-9 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center font-heading font-black text-purple-400 text-sm shrink-0">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-semibold text-purple-400 font-heading">
                        {formattedTime.formattedDate}
                      </div>
                      <div className="text-xl font-bold text-white font-mono-numbers">
                        {formattedTime.formattedTime}
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        {countdown.isLive ? (
                          <span className="text-rose-400 font-bold animate-pulse">¡EN VIVO AHORA!</span>
                        ) : countdown.isPast ? (
                          <span className="text-zinc-500">Completado</span>
                        ) : (
                          <span>En {countdown.days}d {countdown.hours}h {countdown.minutes}m</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Clan vs Clan Matchup */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 flex-1">
                    {/* BAZTARDOS */}
                    <div className="flex items-center gap-3 text-right">
                      <div className="hidden sm:block">
                        <div className="font-heading font-bold text-sm text-white uppercase">
                          {state.info.name}
                        </div>
                        <div className="text-xs text-purple-400 font-mono-numbers">
                          {state.info.tag}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-black/60 border border-purple-500/30 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={state.info.logoUrl}
                          alt="Baztardos"
                          className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                    </div>

                    <div className="text-sm font-black text-purple-400 font-heading px-2.5 py-1 bg-purple-950/50 border border-purple-500/30 rounded-lg">
                      VS
                    </div>

                    {/* RIVAL */}
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-12 h-12 rounded-xl bg-black/60 border border-zinc-700 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={match.opponentLogo}
                          alt={match.opponentName}
                          className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-white uppercase">
                          {match.opponentName}
                        </div>
                        <div className="text-xs text-rose-400 font-mono-numbers">
                          {match.opponentTag}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Details: Mode & Map & Actions */}
                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 min-w-[220px] pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
                    <div className="text-left lg:text-right">
                      <div className="text-xs font-semibold text-zinc-200">
                        {match.modality}
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center lg:justify-end gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {match.map}
                      </div>
                    </div>

                    {/* Expand Multi-Zone Button */}
                    <button
                      onClick={() => toggleExpand(match.id)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold flex items-center gap-1 transition-colors border border-zinc-700"
                      title="Ver todos los países"
                    >
                      <span>Países</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Stream link if present */}
                    {match.streamUrl && (
                      <a
                        href={match.streamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-purple-950/60 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors border border-purple-500/30"
                        title="Ver Transmisión"
                      >
                        <Tv className="w-4 h-4" />
                      </a>
                    )}

                    {/* Admin Action Bar */}
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onRecordResult(match);
                            playTacticalClick();
                          }}
                          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                          title="Registrar Resultado en Récord"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onEditMatch(match);
                            playTacticalClick();
                          }}
                          className="p-1.5 rounded-lg bg-purple-950/60 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors border border-purple-500/30"
                          title="Editar Versus y Logo Rival"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar versus contra ${match.opponentName}?`)) {
                              deleteUpcomingMatch(match.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Eliminar Versus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Multi-Country Timezone Matrix */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 bg-black/40 border-t border-zinc-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-heading mb-2">
                      Horas del encuentro en cada país:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                      {zoneTimes.map((zone) => (
                        <div
                          key={zone.code}
                          className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2 text-center"
                        >
                          <div className="text-base">{zone.flag}</div>
                          <div className="text-[11px] font-semibold text-zinc-300 truncate">
                            {zone.country}
                          </div>
                          <div className="text-xs font-bold text-purple-400 font-mono-numbers mt-0.5">
                            {zone.time}
                          </div>
                        </div>
                      ))}
                    </div>
                    {match.notes && (
                      <div className="mt-3 text-xs text-zinc-300 italic bg-white/5 p-2 rounded-lg">
                        <strong>Instrucciones tácticas:</strong> {match.notes}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
