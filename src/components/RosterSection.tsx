import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { RosterMember } from '../types/clan';
import { playTacticalClick } from '../utils/soundEffects';
import { Shield, Plus, Edit2, Trash2, Award, Crosshair, Star, Check, Image as ImageIcon } from 'lucide-react';

interface RosterSectionProps {
  onAddMember: () => void;
  onEditMember: (member: RosterMember) => void;
}

export const RosterSection: React.FC<RosterSectionProps> = ({
  onAddMember,
  onEditMember,
}) => {
  const { state, isAdmin, deleteRosterMember, updateRosterMember } = useClanData();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'starters' | 'reserves'>('all');

  const filteredMembers = state.roster.filter((member) => {
    if (filterType === 'starters' && !member.isStarter) return false;
    if (filterType === 'reserves' && member.isStarter) return false;
    if (roleFilter !== 'all' && member.role !== roleFilter) return false;
    return true;
  });

  const roles = [
    'all',
    'Líder / IGL',
    'Co-Líder',
    'Asalto / Fragger',
    'Recon / Sniper',
    'Support / Médico',
    'Ingeniero / Tanquista',
    'Suplente / Reserva',
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
            <Shield className="w-4 h-4" />
            <span>Escuadrón Táctico BAZTARDOS GAMING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
            Roster Oficial Delta Force
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Operadores activos, estadísticas de combate, avatares y roles de escuadra.
          </p>
        </div>

        {/* Action button */}
        {isAdmin && (
          <button
            onClick={() => {
              onAddMember();
              playTacticalClick();
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-md shadow-purple-950/40"
          >
            <Plus className="w-4 h-4" />
            Añadir Jugador
          </button>
        )}
      </div>

      {/* Filter Bars */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Starters vs Reserves segmented control */}
        <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          <button
            onClick={() => { setFilterType('all'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterType === 'all' ? 'bg-purple-600 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todos ({state.roster.length})
          </button>
          <button
            onClick={() => { setFilterType('starters'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterType === 'starters' ? 'bg-purple-600 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Titulares ({state.roster.filter((r) => r.isStarter).length})
          </button>
          <button
            onClick={() => { setFilterType('reserves'); playTacticalClick(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              filterType === 'reserves' ? 'bg-purple-600 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Reservas ({state.roster.filter((r) => !r.isStarter).length})
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">Rol:</span>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              playTacticalClick();
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
          >
            <option value="all">Todos los Roles</option>
            {roles.filter((r) => r !== 'all').map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Players */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`bg-[#0c0d14]/90 border rounded-2xl overflow-hidden backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20 flex flex-col justify-between ${
              member.isStarter
                ? 'border-purple-500/35 hover:border-purple-400'
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div>
              {/* Card Header: Avatar & Status */}
              <div className="relative h-32 bg-gradient-to-t from-[#0c0d14] via-zinc-900 to-purple-950/30 p-4 flex items-end">
                <div className="absolute top-2 right-2 text-right">
                  {member.isStarter ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-300 font-heading bg-purple-950/70 border border-purple-500/40 px-2 py-0.5 rounded-lg">
                      <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                      Titular
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-heading bg-zinc-800/80 px-2 py-0.5 rounded-lg border border-zinc-700">
                      Reserva
                    </span>
                  )}
                </div>

                {/* Avatar with optional admin quick change */}
                <div className="relative -mb-6 w-16 h-16 rounded-2xl border-2 border-purple-500/50 bg-black overflow-hidden shadow-lg shadow-black">
                  <img
                    src={member.avatarUrl}
                    alt={member.gamertag}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {isAdmin && (
                    <button
                      onClick={() => onEditMember(member)}
                      className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity text-purple-300"
                      title="Cambiar Foto"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="pt-8 px-4 pb-4">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-lg font-bold uppercase tracking-wide text-white font-heading truncate">
                    {member.gamertag}
                  </h3>
                  <span className="text-xs text-zinc-400" title={member.country}>
                    {member.country}
                  </span>
                </div>

                {member.realName && (
                  <div className="text-xs text-zinc-400 truncate mt-0.5">
                    {member.realName}
                  </div>
                )}

                <div className="mt-2.5 inline-block text-[11px] font-semibold uppercase tracking-wider text-purple-400 font-heading">
                  {member.role}
                </div>

                {/* Military Rank in Delta Force */}
                <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-300">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span className="truncate">{member.rank}</span>
                </div>

                {/* Favorite Operator & Weapon */}
                <div className="mt-4 pt-3 border-t border-zinc-800 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">Operador:</span>
                    <span className="text-zinc-200 font-medium truncate max-w-[150px]">
                      {member.favoriteOperator}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Crosshair className="w-3 h-3 text-zinc-400" />
                      Arma:
                    </span>
                    <span className="text-zinc-200 font-medium truncate max-w-[150px]">
                      {member.favoriteWeapon}
                    </span>
                  </div>
                </div>

                {/* Combat Stats Grid */}
                <div className="mt-4 grid grid-cols-3 gap-2 bg-black/40 border border-zinc-800 rounded-xl p-2 text-center">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">K/D</div>
                    <div className="text-sm font-bold text-purple-400 font-mono-numbers">
                      {member.kdRatio.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Partidas</div>
                    <div className="text-sm font-bold text-zinc-200 font-mono-numbers">
                      {member.matchesPlayed}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Win %</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono-numbers">
                      {member.winRate}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Controls on Card */}
            {isAdmin && (
              <div className="px-4 py-2.5 bg-black/50 border-t border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    updateRosterMember(member.id, { isStarter: !member.isStarter });
                    playTacticalClick();
                  }}
                  className="text-zinc-400 hover:text-purple-400 flex items-center gap-1 text-[11px]"
                >
                  <Check className={`w-3 h-3 ${member.isStarter ? 'text-purple-400' : 'text-zinc-600'}`} />
                  {member.isStarter ? 'Hacer Reserva' : 'Hacer Titular'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onEditMember(member);
                      playTacticalClick();
                    }}
                    className="p-1 text-zinc-400 hover:text-purple-400 transition-colors"
                    title="Editar Operador y Foto"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar a ${member.gamertag} del roster?`)) {
                        deleteRosterMember(member.id);
                      }
                    }}
                    className="p-1 text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Eliminar Operador"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
