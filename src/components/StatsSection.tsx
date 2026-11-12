import React from 'react';
import { useClanData } from '../context/ClanDataContext';
import { BarChart3, TrendingUp, Crosshair, Award, Shield, Target } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { state, stats } = useClanData();

  const topFraggers = [...state.roster]
    .sort((a, b) => b.kdRatio - a.kdRatio)
    .slice(0, 5);

  const mapStats = [
    { name: 'Presa Cero (Zero Dam)', winRate: 92, played: 14, bestScore: '1000 - 540' },
    { name: 'Ascensión (Ascension)', winRate: 85, played: 8, bestScore: '7 - 2' },
    { name: 'Pozo (Shaft)', winRate: 80, played: 6, bestScore: '1000 - 720' },
    { name: 'Layali Grove', winRate: 75, played: 5, bestScore: '1000 - 810' },
    { name: 'Ciudad Espacial (Space City)', winRate: 70, played: 4, bestScore: '7 - 4' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
          <BarChart3 className="w-4 h-4" />
          <span>Inteligencia Operacional & Métricas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
          Estadísticas de Combate
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Rendimiento táctico de la escuadra BAZTARDOS GAMING en competencias oficiales.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0c0d14]/90 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-purple-950/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-heading">
              Win Rate Global
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-4xl font-black text-white font-mono-numbers">
            {stats.winRate}%
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Basado en {stats.totalMatches} versus oficiales registrados.
          </p>
          <div className="w-full bg-zinc-800 h-2 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${stats.winRate}%` }}
            />
          </div>
        </div>

        <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-heading">
              K/D Promedio Escuadrón
            </span>
            <Crosshair className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-4xl font-black text-purple-400 font-mono-numbers">
            {stats.avgKd}
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Ratio de bajas por muerte consolidado del roster activo.
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
            <span>Rango: 2.30 - 4.15</span>
            <span className="text-purple-300 font-semibold">Tier Competitivo S</span>
          </div>
        </div>

        <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-heading">
              Trofeos & Torneos
            </span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-4xl font-black text-white font-mono-numbers">
            {stats.tournamentsCount}
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            Campeonatos y copas de clanes ganadas en Delta Force.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-purple-300">
            <span>🏆 Campeón Copa Continental 2026</span>
          </div>
        </div>
      </div>

      {/* Two Column Split: Top Players & Map Win Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Fraggers Leaderboard */}
        <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            <h3 className="font-heading font-bold text-base uppercase text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              Líderes de K/D en el Clan
            </h3>
            <span className="text-xs text-zinc-400">Top 5 Operadores</span>
          </div>

          <div className="space-y-3">
            {topFraggers.map((player, idx) => (
              <div
                key={player.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-heading font-bold text-sm ${
                    idx === 0 ? 'text-purple-400' : idx === 1 ? 'text-zinc-300' : 'text-zinc-500'
                  }`}>
                    #{idx + 1}
                  </span>
                  <img
                    src={player.avatarUrl}
                    alt={player.gamertag}
                    className="w-9 h-9 rounded-full object-cover border border-purple-500/30"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                  <div>
                    <div className="font-heading font-bold text-sm text-white truncate max-w-[140px] sm:max-w-none">
                      {player.gamertag}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {player.role} · {player.favoriteOperator}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-purple-400 font-mono-numbers">
                    {player.kdRatio.toFixed(2)} K/D
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono-numbers">
                    {player.winRate}% Win
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Win Rate & Fortress */}
        <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            <h3 className="font-heading font-bold text-base uppercase text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Efectividad por Mapa
            </h3>
            <span className="text-xs text-zinc-400">Delta Force Rotation</span>
          </div>

          <div className="space-y-4">
            {mapStats.map((map) => (
              <div key={map.name}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-200">{map.name}</span>
                  <span className="text-purple-400 font-mono-numbers font-bold">
                    {map.winRate}% ({map.played} PJ)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-700 to-purple-500 h-full rounded-full"
                    style={{ width: `${map.winRate}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                  <span>Mejor marcador: {map.bestScore}</span>
                  <span className="text-purple-400 font-semibold">{map.winRate >= 80 ? 'Fortaleza del Clan' : 'Mapa Competitivo'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
