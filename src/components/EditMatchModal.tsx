import React, { useState, useEffect } from 'react';
import { UpcomingMatch } from '../types/clan';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick } from '../utils/soundEffects';
import { X, Swords } from 'lucide-react';

interface EditMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchToEdit?: UpcomingMatch | null;
}

export const EditMatchModal: React.FC<EditMatchModalProps> = ({
  isOpen,
  onClose,
  matchToEdit,
}) => {
  const { addUpcomingMatch, updateUpcomingMatch } = useClanData();

  const [opponentName, setOpponentName] = useState('');
  const [opponentTag, setOpponentTag] = useState('');
  const [opponentLogo, setOpponentLogo] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [modality, setModality] = useState('Havoc Warfare 32v32');
  const [map, setMap] = useState('Presa Cero (Zero Dam)');
  const [serverRegion, setServerRegion] = useState('SA - São Paulo / Bogotá');
  const [streamUrl, setStreamUrl] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (matchToEdit) {
      setOpponentName(matchToEdit.opponentName);
      setOpponentTag(matchToEdit.opponentTag);
      setOpponentLogo(matchToEdit.opponentLogo);
      try {
        const d = new Date(matchToEdit.matchDate);
        const isoLocal = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        setMatchDate(isoLocal);
      } catch {
        setMatchDate('');
      }
      setModality(matchToEdit.modality);
      setMap(matchToEdit.map);
      setServerRegion(matchToEdit.serverRegion);
      setStreamUrl(matchToEdit.streamUrl || '');
      setTournamentName(matchToEdit.tournamentName || '');
      setNotes(matchToEdit.notes || '');
    } else {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 3);
      defaultDate.setHours(21, 0, 0, 0);
      const isoLocal = new Date(defaultDate.getTime() - defaultDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

      setOpponentName('VIPER SQUADRON');
      setOpponentTag('[VPR]');
      setOpponentLogo('/src/assets/images/logo_rival_clan_1794495592613.jpg');
      setMatchDate(isoLocal);
      setModality('Havoc Warfare 32v32');
      setMap('Presa Cero (Zero Dam)');
      setServerRegion('SA - São Paulo / Bogotá');
      setStreamUrl('https://twitch.tv');
      setTournamentName('Copa Continental Delta Force');
      setNotes('');
    }
  }, [matchToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalIsoDate = new Date().toISOString();
    try {
      finalIsoDate = new Date(matchDate).toISOString();
    } catch {
      // fallback
    }

    const payload = {
      opponentName: opponentName.trim() || 'Clan Rival',
      opponentTag: opponentTag.trim() || '[RIVAL]',
      opponentLogo: opponentLogo.trim() || '/src/assets/images/logo_rival_clan_1794495592613.jpg',
      matchDate: finalIsoDate,
      modality,
      map,
      serverRegion,
      streamUrl: streamUrl.trim(),
      tournamentName: tournamentName.trim(),
      notes: notes.trim(),
    };

    if (matchToEdit) {
      updateUpcomingMatch(matchToEdit.id, payload);
    } else {
      addUpcomingMatch(payload);
    }

    playTacticalClick();
    onClose();
  };

  const sampleLogos = [
    { label: 'Viper Squadron', url: '/src/assets/images/logo_rival_clan_1794495592613.jpg' },
    { label: 'Escudo Apex', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop&q=80' },
    { label: 'Lobo Cyber', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop&q=80' },
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
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              {matchToEdit ? 'Editar Datos del Versus' : 'Agendar Nuevo Versus'}
            </h3>
            <p className="text-xs text-zinc-400">
              Personaliza el rival, sube su logo, configura fecha y hora por países.
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
                placeholder="Ej: VIPER SQUADRON"
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
                placeholder="Ej: [VPR]"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
          </div>

          {/* Logo with Device Upload & Preview */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Logo del Clan Contrincante"
              value={opponentLogo}
              onChange={setOpponentLogo}
              presets={sampleLogos}
              aspectRatio="square"
              helperText="Puedes subir el logo del rival directamente desde tu galería o pegar una URL."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Fecha y Hora (Local de Edición)
              </label>
              <input
                type="datetime-local"
                required
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
              <p className="text-[10px] text-zinc-400 mt-1">
                Se sincronizará en automático para Colombia, México, Perú, Argentina, Chile, España, etc.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-heading font-semibold uppercase text-zinc-300">
                  Modalidad de Juego (Escribe libremente)
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
                {['Havoc Warfare 32v32', 'Operaciones Tácticas 5v5', 'Hazard Operations (Extracción)', 'Duelo 4v4', 'Competitivo Bo3'].map((m) => (
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-heading font-semibold uppercase text-zinc-300">
                  Mapa Oficial / Rotación (Escribe libremente)
                </label>
                <span className="text-[10px] text-purple-400 font-sans">Texto libre</span>
              </div>
              <input
                type="text"
                required
                value={map}
                onChange={(e) => setMap(e.target.value)}
                placeholder="Ej: Presa Cero, Ascensión, Rotación de 3 Mapas..."
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
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Servidor / Región
              </label>
              <input
                type="text"
                value={serverRegion}
                onChange={(e) => setServerRegion(e.target.value)}
                placeholder="Ej: SA - São Paulo / Bogotá"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Torneo / Evento
              </label>
              <input
                type="text"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="Ej: Copa Continental Delta Force"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Enlace de Transmisión (Twitch / YouTube)
              </label>
              <input
                type="url"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="https://twitch.tv/..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Notas Tácticas o Reglas del Match
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Partida al mejor de 3 mapas con rotación táctica."
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
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
              Guardar Versus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
