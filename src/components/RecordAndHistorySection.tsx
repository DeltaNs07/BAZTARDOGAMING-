import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { MatchHistoryItem } from '../types/clan';
import { playTacticalClick, playVictoryChime } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Trophy, Plus, Edit2, Trash2, MapPin, Award, ExternalLink } from 'lucide-react';

interface RecordAndHistorySectionProps {
  onAddHistoryMatch: () => void;
  onEditHistoryMatch: (match: MatchHistoryItem) => void;
}

export const RecordAndHistorySection: React.FC<RecordAndHistorySectionProps> = ({
  onAddHistoryMatch,
  onEditHistoryMatch,
}) => {
  const { state, stats, isAdmin, deleteHistoryMatch } = useClanData();
  const [filterOutcome, setFilterOutcome] = useState<'all' | 'win' | 'loss' | 'draw'>('all');
  const [filterModality, setFilterModality] = useState<string>('all');

  const triggerConfetti = () => {
    playVictoryChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#7e22ce', '#10b981', '#ffffff', '#38bdf8'],
    });
  };

  const filteredHistory = state.history.filter((m) => {
    if (filterOutcome !== 'all' && m.outcome !== filterOutcome) return false;
    if (filterModality !== 'all' && !m.modality.toLowerCase().includes(filterModality.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
            <Trophy className="w-4 h-4" />
            <span>Récord Competitivo & Registro de Guerra</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
            Historial de Partidos
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Balance general de victorias, empates y derrotas del clan en Garena Delta Force.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              onAddHistoryMatch();
              playTacticalClick();
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-md shadow-purple-950/40"
          >
            <Plus className="w-4 h-4" />
            Registrar Partido
          </button>
        )}
      </div>

      {/* Récord Hero KPI Strip (W - D - L) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-10">
        {/* Total Matches */}
        <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-4 sm:p-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-heading">
            Partidos Jugados
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono-numbers mt-1">
            {stats.totalMatches}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">Temporada Oficial</div>
        </div>

        {/* Wins */}
        <div 
          onClick={triggerConfetti}
          className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-center cursor-pointer hover:border-emerald-400 transition-all group"
          title="Haz clic para celebrar victorias"
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 font-heading flex items-center justify-center gap-1">
            <span>Victorias</span>
            <span className="text-[10px] text-emerald-500 group-hover:scale-110 transition-transform">🎉</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono-numbers mt-1">
            {stats.wins}
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1">Tasa Éxito Dominante</div>
        </div>

        {/* Draws */}
        <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-4 sm:p-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-heading">
            Empates
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono-numbers mt-1">
            {stats.draws}
          </div>
          <div className="text-[11px] text-purple-300/80 mt-1">Tiempo Extra Reñido</div>
        </div>

        {/* Losses */}
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 sm:p-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-heading">
            Derrotas
          </div>
          <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono-numbers mt-1">
            {stats.losses}
          </div>
          <div className="text-[11px] text-rose-300/80 mt-1">Aprendizaje y Ajuste</div>
        </div>

        {/* Win Rate % */}
        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-purple-950/50 via-zinc-900 to-black border border-purple-500/40 rounded-2xl p-4 sm:p-5 text-center shadow-lg shadow-purple-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-heading">
            Win Rate Global
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-300 font-mono-numbers mt-1">
            {stats.winRate}%
          </div>
          <div className="text-[11px] text-zinc-300 mt-1">Efectividad de Clan</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => { setFilterOutcome('all'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterOutcome === 'all' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todos ({state.history.length})
          </button>
          <button
            onClick={() => { setFilterOutcome('win'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterOutcome === 'win' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Victorias ({stats.wins})
          </button>
          <button
            onClick={() => { setFilterOutcome('draw'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterOutcome === 'draw' ? 'bg-purple-700 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Empates ({stats.draws})
          </button>
          <button
            onClick={() => { setFilterOutcome('loss'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterOutcome === 'loss' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Derrotas ({stats.losses})
          </button>
        </div>

        {/* Modality Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Modo:</span>
          <select
            value={filterModality}
            onChange={(e) => {
              setFilterModality(e.target.value);
              playTacticalClick();
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos los Modos</option>
            {Array.from(new Set(state.history.map((h) => h.modality.trim()).filter(Boolean))).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* History Cards List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => {
          const isWin = item.outcome === 'win';
          const isLoss = item.outcome === 'loss';

          return (
            <div
              key={item.id}
              className={`bg-[#0c0d14]/90 border rounded-2xl p-4 sm:p-5 backdrop-blur-sm transition-all hover:border-purple-500/40 ${
                isWin
                  ? 'border-emerald-500/20'
                  : isLoss
                  ? 'border-rose-500/20'
                  : 'border-purple-500/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Date & Status Badge */}
                <div className="flex items-center gap-3 min-w-[170px]">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-heading font-black uppercase tracking-wider ${
                      isWin
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isLoss
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                    }`}
                  >
                    {isWin ? 'Victoria' : isLoss ? 'Derrota' : 'Empate'}
                  </span>
                  <div className="text-xs text-zinc-400 font-mono-numbers">
                    {item.date}
                  </div>
                </div>

                {/* Middle: Clan vs Rival & Scoreboard */}
                <div className="flex items-center justify-center gap-4 sm:gap-6 flex-1">
                  {/* Our Clan */}
                  <div className="flex items-center gap-2.5 text-right">
                    <div>
                      <div className="font-heading font-bold text-sm text-white uppercase">
                        {state.info.name}
                      </div>
                      <div className="text-[11px] text-purple-400 font-mono-numbers">
                        {state.info.tag}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-purple-500/30 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={state.info.logoUrl}
                        alt="Baztardos"
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Big Score Box */}
                  <div className="px-3.5 py-1.5 bg-black/60 border border-zinc-800 rounded-xl text-center min-w-[90px]">
                    <div className="text-lg sm:text-xl font-black font-mono-numbers tracking-wider">
                      <span className={item.ourScore >= item.opponentScore ? 'text-purple-400' : 'text-zinc-300'}>
                        {item.ourScore}
                      </span>
                      <span className="text-zinc-500 mx-1">-</span>
                      <span className={item.opponentScore >= item.ourScore ? 'text-rose-400' : 'text-zinc-300'}>
                        {item.opponentScore}
                      </span>
                    </div>
                    {item.ticketsDifference && (
                      <div className="text-[10px] text-zinc-400 font-heading uppercase">
                        {item.ticketsDifference}
                      </div>
                    )}
                  </div>

                  {/* Rival Clan */}
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-10 h-10 rounded-xl bg-black/60 border border-zinc-700 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={item.opponentLogo}
                        alt={item.opponentName}
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm text-white uppercase">
                        {item.opponentName}
                      </div>
                      <div className="text-[11px] text-rose-400 font-mono-numbers">
                        {item.opponentTag}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Map & MVP */}
                <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 min-w-[200px] text-xs">
                  <div className="text-left lg:text-right">
                    <div className="text-zinc-300 font-semibold">{item.modality}</div>
                    <div className="text-zinc-400 flex items-center lg:justify-end gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      {item.map}
                    </div>
                  </div>

                  {item.vodLink && (
                    <a
                      href={item.vodLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                      title="Ver repetición"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          onEditHistoryMatch(item);
                          playTacticalClick();
                        }}
                        className="p-1.5 rounded-lg bg-purple-950/60 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors border border-purple-500/30"
                        title="Editar Partido"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar este registro de partido contra ${item.opponentName}?`)) {
                            deleteHistoryMatch(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-rose-500 hover:text-white transition-colors"
                        title="Eliminar Registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* MVP & Tactical Notes footer */}
              {(item.mvp || item.notes) && (
                <div className="mt-3 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                  {item.mvp && (
                    <div className="flex items-center gap-1.5 text-purple-300">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span className="font-semibold">MVP:</span>
                      <span>{item.mvp}</span>
                    </div>
                  )}
                  {item.notes && (
                    <div className="italic text-zinc-400 max-w-xl truncate">
                      "{item.notes}"
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
