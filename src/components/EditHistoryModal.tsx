import React, { useState, useEffect } from 'react';
import { MatchHistoryItem, MatchResultStatus } from '../types/clan';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick } from '../utils/soundEffects';
import { X, Trophy } from 'lucide-react';

interface EditHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchToEdit?: MatchHistoryItem | null;
}

export const EditHistoryModal: React.FC<EditHistoryModalProps> = ({
  isOpen,
  onClose,
  matchToEdit,
}) => {
  const { addHistoryMatch, updateHistoryMatch } = useClanData();

  const [opponentName, setOpponentName] = useState('');
  const [opponentTag, setOpponentTag] = useState('');
  const [opponentLogo, setOpponentLogo] = useState('');
  const [date, setDate] = useState('');
  const [modality, setModality] = useState('Havoc Warfare 32v32');
  const [map, setMap] = useState('Presa Cero (Zero Dam)');
  const [ourScore, setOurScore] = useState('1000');
  const [opponentScore, setOpponentScore] = useState('650');
  const [outcome, setOutcome] = useState<MatchResultStatus>('win');
  const [mvp, setMvp] = useState('');
  const [ticketsDifference, setTicketsDifference] = useState('+350 Tickets');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (matchToEdit) {
      setOpponentName(matchToEdit.opponentName);
      setOpponentTag(matchToEdit.opponentTag);
      setOpponentLogo(matchToEdit.opponentLogo);
      setDate(matchToEdit.date);
      setModality(matchToEdit.modality);
      setMap(matchToEdit.map);
      setOurScore(String(matchToEdit.ourScore));
      setOpponentScore(String(matchToEdit.opponentScore));
      setOutcome(matchToEdit.outcome);
      setMvp(matchToEdit.mvp || '');
      setTicketsDifference(matchToEdit.ticketsDifference || '');
      setNotes(matchToEdit.notes || '');
    } else {
      const today = new Date().toISOString().slice(0, 10);
      setOpponentName('VIPER SQUADRON');
      setOpponentTag('[VPR]');
      setOpponentLogo('/src/assets/images/logo_rival_clan_1794495592613.jpg');
      setDate(today);
      setModality('Havoc Warfare 32v32');
      setMap('Presa Cero (Zero Dam)');
      setOurScore('1000');
      setOpponentScore('720');
      setOutcome('win');
      setMvp('BZT_MIGUEL (38 Kills)');
      setTicketsDifference('+280 Tickets');
      setNotes('Gran coordinación ofensiva capturando el objetivo Alpha.');
    }
  }, [matchToEdit, isOpen]);

  const handleScoreChange = (our: string, opp: string) => {
    const nOur = parseInt(our, 10) || 0;
    const nOpp = parseInt(opp, 10) || 0;
    if (nOur > nOpp) setOutcome('win');
    else if (nOur < nOpp) setOutcome('loss');
    else setOutcome('draw');
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      opponentName: opponentName.trim() || 'Rival Clan',
      opponentTag: opponentTag.trim() || '[RIVAL]',
      opponentLogo: opponentLogo.trim() || '/src/assets/images/logo_rival_clan_1794495592613.jpg',
      date: date || new Date().toISOString().slice(0, 10),
      modality,
      map,
      ourScore: parseInt(ourScore, 10) || 0,
      opponentScore: parseInt(opponentScore, 10) || 0,
      outcome,
      mvp: mvp.trim(),
      ticketsDifference: ticketsDifference.trim(),
      notes: notes.trim(),
    };

    if (matchToEdit) {
      updateHistoryMatch(matchToEdit.id, payload);
    } else {
      addHistoryMatch(payload);
    }

    playTacticalClick();
    onClose();
  };

  const sampleLogos = [
    { label: 'Viper Squadron', url: '/src/assets/images/logo_rival_clan_1794495592613.jpg' },
    { label: 'Apex Predator', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop&q=80' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0c0d14] border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              {matchToEdit ? 'Editar Partido del Récord' : 'Registrar Nuevo Resultado al Récord'}
            </h3>
            <p className="text-xs text-zinc-400">
              Suma o ajusta victorias, empates y derrotas en el historial competitivo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Nombre del Clan Rival
              </label>
              <input
                type="text"
                required
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                placeholder="Ej: TITANES DELTA"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Tag del Clan Rival
              </label>
              <input
                type="text"
                required
                value={opponentTag}
                onChange={(e) => setOpponentTag(e.target.value)}
                placeholder="Ej: [TTN]"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Logo del Rival en el Historial"
              value={opponentLogo}
              onChange={setOpponentLogo}
              presets={sampleLogos}
              aspectRatio="square"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Fecha del Encuentro
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Resultado Oficial
              </label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value as MatchResultStatus)}
                className={`w-full bg-black/60 border rounded-lg px-3 py-2 text-sm font-heading font-bold uppercase focus:outline-none ${
                  outcome === 'win'
                    ? 'border-emerald-500 text-emerald-400'
                    : outcome === 'loss'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-purple-500 text-purple-300'
                }`}
              >
                <option value="win">Victoria (W)</option>
                <option value="draw">Empate (D)</option>
                <option value="loss">Derrota (L)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Puntos BAZTARDOS GAMING
              </label>
              <input
                type="number"
                required
                value={ourScore}
                onChange={(e) => {
                  setOurScore(e.target.value);
                  handleScoreChange(e.target.value, opponentScore);
                }}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers text-center font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Puntos Clan Contrincante
              </label>
              <input
                type="number"
                required
                value={opponentScore}
                onChange={(e) => {
                  setOpponentScore(e.target.value);
                  handleScoreChange(ourScore, e.target.value);
                }}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers text-center font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-heading font-semibold uppercase text-zinc-300">
                  Modalidad Jugada (Escribe libremente)
                </label>
                <span className="text-[10px] text-purple-400 font-sans">Texto libre</span>
              </div>
              <input
                type="text"
                required
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                placeholder="Ej: Havoc Warfare 32v32, 5v5 Buscar y Destruir..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Havoc Warfare 32v32', 'Operaciones Tácticas 5v5', 'Hazard Operations', 'Torneo Oficial Bo3'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModality(m)}
                    className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 hover:bg-purple-950/60 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 transition-colors"
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-heading font-semibold uppercase text-zinc-300">
                  Mapa Disputado (Escribe libremente)
                </label>
                <span className="text-[10px] text-purple-400 font-sans">Texto libre</span>
              </div>
              <input
                type="text"
                required
                value={map}
                onChange={(e) => setMap(e.target.value)}
                placeholder="Ej: Presa Cero, Ascensión, Pozo..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Presa Cero (Zero Dam)', 'Ascensión (Ascension)', 'Pozo (Shaft)', 'Layali Grove', 'Ciudad Espacial', 'Umbral (Threshold)'].map((mp) => (
                  <button
                    key={mp}
                    type="button"
                    onClick={() => setMap(mp)}
                    className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 hover:bg-purple-950/60 border border-zinc-800 hover:border-purple-500/40 text-zinc-300 transition-colors"
                  >
                    {mp}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                MVP de la Partida
              </label>
              <input
                type="text"
                value={mvp}
                onChange={(e) => setMvp(e.target.value)}
                placeholder="Ej: BZT_MIGUEL (42 Kills · 8 Banderas)"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Diferencia / Detalle
              </label>
              <input
                type="text"
                value={ticketsDifference}
                onChange={(e) => setTicketsDifference(e.target.value)}
                placeholder="Ej: +320 Tickets o Ronda 7-3"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Notas Tácticas del Encuentro
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Dominio total del punto B con defensa hermética."
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-heading font-semibold uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-heading font-bold uppercase tracking-wider shadow-lg shadow-purple-950/40"
            >
              Guardar en Récord
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
