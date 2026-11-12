import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { UpcomingMatch, RosterMember, MatchHistoryItem } from '../types/clan';
import { playTacticalClick } from '../utils/soundEffects';
import { 
  X, 
  Shield, 
  Swords, 
  Users, 
  Trophy, 
  Settings, 
  Database, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewMatch: () => void;
  onEditMatch: (match: UpcomingMatch) => void;
  onRecordResult: (match: UpcomingMatch) => void;
  onAddMember: () => void;
  onEditMember: (member: RosterMember) => void;
  onAddHistory: () => void;
  onEditHistory: (history: MatchHistoryItem) => void;
  onEditClanInfo: () => void;
  onEditLogos?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onAddNewMatch,
  onEditMatch,
  onRecordResult,
  onAddMember,
  onEditMember,
  onAddHistory,
  onEditHistory,
  onEditClanInfo,
  onEditLogos,
}) => {
  const { 
    state, 
    stats, 
    deleteUpcomingMatch, 
    deleteRosterMember, 
    deleteHistoryMatch,
    exportBackupJson,
    importBackupJson,
    resetToDefaults,
  } = useClanData();

  const [activeTab, setActiveTab] = useState<'matches' | 'roster' | 'record' | 'info' | 'backup'>('matches');
  const [importJsonText, setImportJsonText] = useState('');
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (importBackupJson(importJsonText)) {
      setImportMsg({ type: 'success', text: '¡Datos restaurados con éxito!' });
      setImportJsonText('');
    } else {
      setImportMsg({ type: 'error', text: 'Error: El formato JSON no es válido.' });
    }
  };

  const handleReset = () => {
    if (confirm('¿Estás seguro de restablecer todos los datos del clan a los valores iniciales? Se borrarán las ediciones no respaldadas.')) {
      resetToDefaults();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#0c0d14] border border-purple-500/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden relative"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg sm:text-xl uppercase text-white">
                  Panel de Control Táctico
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-950/60 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded">
                  Modo Admin Activo
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Edición de Logos, Versus, Cuenta Regresiva, Roster, Récord W-D-L y Galería.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onEditLogos && (
              <button
                onClick={() => {
                  onEditLogos();
                  playTacticalClick();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 text-xs font-heading uppercase font-semibold transition-colors"
                title="Editar Logo y Portada"
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                <span>Editar Logos</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-zinc-800 bg-black/30 px-4 sm:px-6 gap-2">
          <button
            onClick={() => { setActiveTab('matches'); playTacticalClick(); }}
            className={`py-3 px-3 text-xs font-heading font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'matches'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Versus & Horarios ({state.upcomingMatches.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('roster'); playTacticalClick(); }}
            className={`py-3 px-3 text-xs font-heading font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'roster'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Roster ({state.roster.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('record'); playTacticalClick(); }}
            className={`py-3 px-3 text-xs font-heading font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'record'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Récord W-D-L ({stats.wins}V / {stats.draws}E / {stats.losses}D)</span>
          </button>
          <button
            onClick={() => { setActiveTab('info'); playTacticalClick(); }}
            className={`py-3 px-3 text-xs font-heading font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'info'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes & Lema</span>
          </button>
          <button
            onClick={() => { setActiveTab('backup'); playTacticalClick(); }}
            className={`py-3 px-3 text-xs font-heading font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'backup'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Respaldo JSON</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: MATCHES */}
          {activeTab === 'matches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-white">
                    Programación de Enfrentamientos Futuros
                  </h4>
                  <p className="text-xs text-zinc-400">
                    El primer versus de la lista alimenta la cuenta regresiva estelar y el versus de portada.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onAddNewMatch();
                    playTacticalClick();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-purple-950/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Agendar Versus
                </button>
              </div>

              <div className="space-y-3">
                {state.upcomingMatches.map((match, idx) => (
                  <div
                    key={match.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center font-heading font-bold text-purple-400 text-xs shrink-0">
                        {idx === 0 ? '★' : `#${idx + 1}`}
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-black border border-zinc-700 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={match.opponentLogo}
                          alt={match.opponentName}
                          className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <span>VS {match.opponentName}</span>
                          <span className="text-xs text-rose-400">{match.opponentTag}</span>
                          {idx === 0 && (
                            <span className="text-[10px] bg-purple-950/60 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-sans">
                              (Próximo Versus)
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {match.modality} · {match.map} · {match.matchDate.slice(0, 16).replace('T', ' ')}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <button
                        onClick={() => {
                          onRecordResult(match);
                          playTacticalClick();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Finalizar y Registrar en Récord"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Pasar a Récord</span>
                      </button>
                      <button
                        onClick={() => {
                          onEditMatch(match);
                          playTacticalClick();
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-purple-400"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar versus contra ${match.opponentName}?`)) {
                            deleteUpcomingMatch(match.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-rose-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ROSTER */}
          {activeTab === 'roster' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-white">
                    Gestión de Operadores del Clan ({state.roster.length} Miembros)
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Agrega reclutas, edita fotos de perfil, K/D, armas predilectas o cambia entre titulares y suplentes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onAddMember();
                    playTacticalClick();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-purple-950/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Añadir Jugador
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.roster.map((player) => (
                  <div
                    key={player.id}
                    className="p-3 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={player.avatarUrl}
                        alt={player.gamertag}
                        className="w-10 h-10 rounded-lg object-cover border border-purple-500/30"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div>
                        <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                          <span>{player.gamertag}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${player.isStarter ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30' : 'bg-zinc-800 text-zinc-400'}`}>
                            {player.isStarter ? 'Titular' : 'Reserva'}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400">
                          {player.role} · {player.favoriteOperator} · <span className="text-purple-400">{player.kdRatio} K/D</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          onEditMember(player);
                          playTacticalClick();
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-purple-400"
                        title="Editar Jugador y Foto"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar a ${player.gamertag}?`)) {
                            deleteRosterMember(player.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-rose-400"
                        title="Eliminar Jugador"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RECORD */}
          {activeTab === 'record' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-white">
                    Historial de Partidos & Récord Oficial
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Balance actual: {stats.wins} Ganados · {stats.draws} Empatados · {stats.losses} Perdidos ({stats.winRate}% Winrate).
                  </p>
                </div>
                <button
                  onClick={() => {
                    onAddHistory();
                    playTacticalClick();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-purple-950/40"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Registrar Partido
                </button>
              </div>

              <div className="space-y-2.5">
                {state.history.map((h) => (
                  <div
                    key={h.id}
                    className="p-3 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold uppercase ${
                        h.outcome === 'win'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : h.outcome === 'loss'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-purple-950/60 text-purple-300'
                      }`}>
                        {h.outcome === 'win' ? 'Victoria' : h.outcome === 'loss' ? 'Derrota' : 'Empate'}
                      </span>
                      <div>
                        <div className="font-heading font-bold text-sm text-white">
                          BAZTARDOS <span className="text-purple-400 font-mono-numbers">{h.ourScore}</span> - <span className="text-rose-400 font-mono-numbers">{h.opponentScore}</span> {h.opponentName}
                        </div>
                        <div className="text-xs text-zinc-400">
                          {h.date} · {h.map} · {h.modality}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          onEditHistory(h);
                          playTacticalClick();
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-purple-400"
                        title="Editar Resultado"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar este registro contra ${h.opponentName}?`)) {
                            deleteHistoryMatch(h.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-rose-400"
                        title="Eliminar Registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase text-white">
                    Identidad, Lema y Comunicados
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Configuración de los textos principales e imágenes del clan.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onEditLogos && (
                    <button
                      onClick={() => {
                        onEditLogos();
                        playTacticalClick();
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 text-xs font-heading font-semibold uppercase flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                      Editar Logos
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onEditClanInfo();
                      playTacticalClick();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-purple-950/40"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Abrir Editor Completo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                  <div className="text-zinc-400 font-semibold uppercase text-[11px]">Nombre Oficial</div>
                  <div className="text-sm font-bold text-white font-heading">{state.info.name} ({state.info.tag})</div>
                  <div className="text-zinc-400 font-semibold uppercase text-[11px] pt-2">Lema Táctico</div>
                  <div className="text-zinc-200 italic">"{state.info.motto}"</div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                  <div className="text-zinc-400 font-semibold uppercase text-[11px]">Anuncio Superior</div>
                  <div className="text-purple-300">{state.info.announcement || 'Ninguno activo'}</div>
                  <div className="text-zinc-400 font-semibold uppercase text-[11px] pt-2">Seguridad del Panel</div>
                  <div className="text-purple-400 font-mono-numbers font-bold">•••• (Protegido)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="p-5 rounded-xl bg-black/40 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold uppercase text-white font-heading">
                  <Download className="w-4 h-4 text-purple-400" />
                  Descargar Copia de Respaldo JSON
                </div>
                <p className="text-xs text-zinc-300">
                  Exporta todo el estado del clan (logos, imágenes, versus agendados, roster, récord W-D-L y galería) en un archivo JSON descargable.
                </p>
                <button
                  onClick={() => {
                    exportBackupJson();
                    playTacticalClick();
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-purple-950/40"
                >
                  <Download className="w-4 h-4" />
                  Exportar Respaldo BAZTARDOS.json
                </button>
              </div>

              {/* Import JSON */}
              <form onSubmit={handleImportSubmit} className="p-5 rounded-xl bg-black/40 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold uppercase text-white font-heading">
                  <Upload className="w-4 h-4 text-purple-400" />
                  Restaurar desde Archivo o Código JSON
                </div>
                <p className="text-xs text-zinc-300">
                  Pega el contenido JSON de una copia de seguridad para restaurar la configuración completa.
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Pega aquí el contenido JSON..."
                  className="w-full bg-black/70 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 font-mono focus:outline-none focus:border-purple-500"
                />

                {importMsg && (
                  <p className={`text-xs ${importMsg.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {importMsg.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors border border-zinc-700"
                >
                  <Upload className="w-4 h-4" />
                  Aplicar Restauración
                </button>
              </form>

              {/* Reset to Factory Defaults */}
              <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold uppercase text-rose-400 font-heading">
                  <RotateCcw className="w-4 h-4" />
                  Restablecer Datos de Fábrica
                </div>
                <p className="text-xs text-zinc-400">
                  Restaura los versus iniciales, el roster fundador y el historial predeterminado.
                </p>
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 border border-rose-500/50 text-rose-200 text-xs font-heading font-semibold uppercase tracking-wider transition-colors"
                >
                  Restablecer Todo a Valores Iniciales
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
