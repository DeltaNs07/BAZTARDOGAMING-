import React, { useState, useEffect } from 'react';
import { UpcomingMatch, MatchResultStatus } from '../types/clan';
import { useClanData } from '../context/ClanDataContext';
import { playVictoryChime } from '../utils/soundEffects';
import { X, CheckCircle2 } from 'lucide-react';

interface RecordResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: UpcomingMatch | null;
}

export const RecordResultModal: React.FC<RecordResultModalProps> = ({
  isOpen,
  onClose,
  match,
}) => {
  const { addHistoryMatch, deleteUpcomingMatch } = useClanData();

  const [ourScore, setOurScore] = useState('1000');
  const [opponentScore, setOpponentScore] = useState('750');
  const [outcome, setOutcome] = useState<MatchResultStatus>('win');
  const [mvp, setMvp] = useState('');
  const [ticketsDifference, setTicketsDifference] = useState('+250 Tickets');
  const [notes, setNotes] = useState('');
  const [removeFromUpcoming, setRemoveFromUpcoming] = useState(true);

  useEffect(() => {
    if (match) {
      setMvp('BZT_MIGUEL (35 Kills)');
      setNotes(`Enfrentamiento oficial contra ${match.opponentName} en ${match.map}.`);
    }
  }, [match]);

  const handleScoreChange = (our: string, opp: string) => {
    const nOur = parseInt(our, 10) || 0;
    const nOpp = parseInt(opp, 10) || 0;
    if (nOur > nOpp) setOutcome('win');
    else if (nOur < nOpp) setOutcome('loss');
    else setOutcome('draw');
  };

  if (!isOpen || !match) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addHistoryMatch({
      opponentName: match.opponentName,
      opponentTag: match.opponentTag,
      opponentLogo: match.opponentLogo,
      date: new Date().toISOString().slice(0, 10),
      modality: match.modality,
      map: match.map,
      ourScore: parseInt(ourScore, 10) || 0,
      opponentScore: parseInt(opponentScore, 10) || 0,
      outcome,
      mvp: mvp.trim(),
      ticketsDifference: ticketsDifference.trim(),
      notes: notes.trim(),
    });

    if (removeFromUpcoming) {
      deleteUpcomingMatch(match.id);
    }

    playVictoryChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#0c0d14] border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              Registrar Resultado del Versus
            </h3>
            <p className="text-xs text-zinc-400">
              Versus contra: <span className="text-purple-300 font-bold">{match.opponentName} {match.opponentTag}</span> · Modalidad: <span className="text-zinc-300">{match.modality}</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Puntos BAZTARDOS
              </label>
              <input
                type="number"
                required
                value={ourScore}
                onChange={(e) => {
                  setOurScore(e.target.value);
                  handleScoreChange(e.target.value, opponentScore);
                }}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-base text-white text-center font-mono-numbers font-bold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Puntos {match.opponentTag}
              </label>
              <input
                type="number"
                required
                value={opponentScore}
                onChange={(e) => {
                  setOpponentScore(e.target.value);
                  handleScoreChange(ourScore, e.target.value);
                }}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-base text-white text-center font-mono-numbers font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Resultado
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
              <option value="win">Victoria</option>
              <option value="draw">Empate</option>
              <option value="loss">Derrota</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              MVP de la Escuadra
            </label>
            <input
              type="text"
              value={mvp}
              onChange={(e) => setMvp(e.target.value)}
              placeholder="Ej: BZT_MIGUEL (38 Kills)"
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Detalle / Diferencia de Marcador
            </label>
            <input
              type="text"
              value={ticketsDifference}
              onChange={(e) => setTicketsDifference(e.target.value)}
              placeholder="Ej: +250 Tickets o Ronda 7-2"
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="removeFromUpcoming"
              checked={removeFromUpcoming}
              onChange={(e) => setRemoveFromUpcoming(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-black/60 border-zinc-700 rounded focus:ring-purple-500"
            />
            <label htmlFor="removeFromUpcoming" className="text-xs text-zinc-300 cursor-pointer">
              Archivar y quitar de los versus futuros (pasa directo al Historial oficial)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-heading font-semibold uppercase"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-bold uppercase shadow-lg shadow-emerald-950/40"
            >
              Confirmar Resultado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
