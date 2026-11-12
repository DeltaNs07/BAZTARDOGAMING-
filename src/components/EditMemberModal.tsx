import React, { useState, useEffect } from 'react';
import { RosterMember, PlayerRole } from '../types/clan';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick } from '../utils/soundEffects';
import { X, Shield } from 'lucide-react';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: RosterMember | null;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  memberToEdit,
}) => {
  const { addRosterMember, updateRosterMember } = useClanData();

  const [gamertag, setGamertag] = useState('');
  const [realName, setRealName] = useState('');
  const [role, setRole] = useState<PlayerRole>('Asalto / Fragger');
  const [favoriteOperator, setFavoriteOperator] = useState('D-Wolf (Kai Silva)');
  const [favoriteWeapon, setFavoriteWeapon] = useState('K416 Especial Táctico');
  const [rank, setRank] = useState('Coronel Estrella');
  const [kdRatio, setKdRatio] = useState('3.20');
  const [matchesPlayed, setMatchesPlayed] = useState('250');
  const [winRate, setWinRate] = useState('82.5');
  const [country, setCountry] = useState('Colombia');
  const [countryCode, setCountryCode] = useState('CO');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isStarter, setIsStarter] = useState(true);

  useEffect(() => {
    if (memberToEdit) {
      setGamertag(memberToEdit.gamertag);
      setRealName(memberToEdit.realName || '');
      setRole(memberToEdit.role);
      setFavoriteOperator(memberToEdit.favoriteOperator);
      setFavoriteWeapon(memberToEdit.favoriteWeapon);
      setRank(memberToEdit.rank);
      setKdRatio(String(memberToEdit.kdRatio));
      setMatchesPlayed(String(memberToEdit.matchesPlayed));
      setWinRate(String(memberToEdit.winRate));
      setCountry(memberToEdit.country);
      setCountryCode(memberToEdit.countryCode);
      setAvatarUrl(memberToEdit.avatarUrl);
      setIsStarter(memberToEdit.isStarter);
    } else {
      setGamertag('BZT_');
      setRealName('');
      setRole('Asalto / Fragger');
      setFavoriteOperator('D-Wolf (Kai Silva)');
      setFavoriteWeapon('K416 Especial Táctico');
      setRank('Coronel');
      setKdRatio('2.80');
      setMatchesPlayed('180');
      setWinRate('80.0');
      setCountry('Colombia');
      setCountryCode('CO');
      setAvatarUrl('https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop&q=80');
      setIsStarter(true);
    }
  }, [memberToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      gamertag: gamertag.trim() || 'BZT_OPERATOR',
      realName: realName.trim(),
      role,
      favoriteOperator,
      favoriteWeapon,
      rank,
      kdRatio: parseFloat(kdRatio) || 2.5,
      matchesPlayed: parseInt(matchesPlayed, 10) || 100,
      winRate: parseFloat(winRate) || 75.0,
      country,
      countryCode,
      avatarUrl: avatarUrl.trim() || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop&q=80',
      isStarter,
      joinDate: memberToEdit ? memberToEdit.joinDate : 'Reciente',
    };

    if (memberToEdit) {
      updateRosterMember(memberToEdit.id, payload);
    } else {
      addRosterMember(payload);
    }

    playTacticalClick();
    onClose();
  };

  const countries = [
    { name: 'Colombia', code: 'CO' },
    { name: 'México', code: 'MX' },
    { name: 'Perú', code: 'PE' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Chile', code: 'CL' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'España', code: 'ES' },
    { name: 'EE.UU.', code: 'US' },
  ];

  const operators = [
    'D-Wolf (Kai Silva)',
    'Stinger (Roy Smee)',
    'Luna (Kim Yewon)',
    'Shepherd (Terry Musa)',
    'Hackclaw (Mai Xiaowen)',
    'Vyron (Wang Yuhao)',
    'Uluru (David Fletcher)',
  ];

  const avatarPresets = [
    { label: 'Operador Asalto', url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop&q=80' },
    { label: 'Operador Recon', url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&q=80' },
    { label: 'Operador Soporte', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&q=80' },
    { label: 'Logo Morado BZT', url: '/src/assets/images/logo_baztardos_purple_1794496762825.jpg' },
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
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              {memberToEdit ? 'Editar Operador del Roster' : 'Añadir Operador al Roster'}
            </h3>
            <p className="text-xs text-zinc-400">
              Registra estadísticas, foto/avatar del jugador, rol y operador en Delta Force.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Gamertag (ID de Juego)
              </label>
              <input
                type="text"
                required
                value={gamertag}
                onChange={(e) => setGamertag(e.target.value)}
                placeholder="Ej: BZT_MIGUEL"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Nombre Real (Opcional)
              </label>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Ej: Miguel Pabón"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Avatar with File Upload from Device */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Avatar / Foto del Jugador"
              value={avatarUrl}
              onChange={setAvatarUrl}
              presets={avatarPresets}
              aspectRatio="square"
              helperText="Sube una foto del jugador desde tu dispositivo o usa un preset."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Rol en la Escuadra
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as PlayerRole)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value="Líder / IGL">Líder / IGL (Comandante)</option>
                <option value="Co-Líder">Co-Líder</option>
                <option value="Asalto / Fragger">Asalto / Fragger</option>
                <option value="Recon / Sniper">Recon / Sniper</option>
                <option value="Support / Médico">Support / Médico</option>
                <option value="Ingeniero / Tanquista">Ingeniero / Tanquista</option>
                <option value="Suplente / Reserva">Suplente / Reserva</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                País
              </label>
              <select
                value={country}
                onChange={(e) => {
                  const sel = countries.find((c) => c.name === e.target.value);
                  setCountry(e.target.value);
                  if (sel) setCountryCode(sel.code);
                }}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Operador Delta Force
              </label>
              <select
                value={favoriteOperator}
                onChange={(e) => setFavoriteOperator(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Arma Predilecta
              </label>
              <input
                type="text"
                value={favoriteWeapon}
                onChange={(e) => setFavoriteWeapon(e.target.value)}
                placeholder="Ej: K416 Especial / AWM .338"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                K/D Ratio
              </label>
              <input
                type="number"
                step="0.01"
                value={kdRatio}
                onChange={(e) => setKdRatio(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Partidas Jugadas
              </label>
              <input
                type="number"
                value={matchesPlayed}
                onChange={(e) => setMatchesPlayed(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Win Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={winRate}
                onChange={(e) => setWinRate(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Rango Militar en Delta Force
            </label>
            <input
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="Ej: General de División / Coronel"
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Starter Toggle */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isStarterCheckbox"
              checked={isStarter}
              onChange={(e) => setIsStarter(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-black/60 border-zinc-700 rounded focus:ring-purple-500"
            />
            <label htmlFor="isStarterCheckbox" className="text-xs text-zinc-300 font-semibold cursor-pointer">
              Jugador Titular (Cuadro de Honor principal de torneos)
            </label>
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
              Guardar Operador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
