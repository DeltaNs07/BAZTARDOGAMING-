import React, { useState, useEffect } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick, playVictoryChime } from '../utils/soundEffects';
import { X, Image, Sparkles } from 'lucide-react';

interface EditLogosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditLogosModal: React.FC<EditLogosModalProps> = ({ isOpen, onClose }) => {
  const { state, updateClanInfo } = useClanData();
  const [logoUrl, setLogoUrl] = useState(state.info.logoUrl);
  const [bannerUrl, setBannerUrl] = useState(state.info.bannerUrl);

  useEffect(() => {
    if (isOpen) {
      setLogoUrl(state.info.logoUrl);
      setBannerUrl(state.info.bannerUrl);
    }
  }, [isOpen, state.info]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClanInfo({
      logoUrl: logoUrl.trim() || '/src/assets/images/logo_baztardos_purple_1794496762825.jpg',
      bannerUrl: bannerUrl.trim() || '/src/assets/images/hero_baztardos_purple_1794496763381.jpg',
    });
    playVictoryChime();
    onClose();
  };

  const logoPresets = [
    { label: 'Morado Metálico [BZT]', url: '/src/assets/images/logo_baztardos_purple_1794496762825.jpg' },
    { label: 'Dorado Original [BZT]', url: '/src/assets/images/logo_baztardos_gaming_1794495591983.jpg' },
    { label: 'Escuadrón Rival Verde', url: '/src/assets/images/logo_rival_clan_1794495592613.jpg' },
  ];

  const bannerPresets = [
    { label: 'Noche Metálica Morada', url: '/src/assets/images/hero_baztardos_purple_1794496763381.jpg' },
    { label: 'Operativo Presa Cero', url: '/src/assets/images/map_zero_dam_1794495592834.jpg' },
    { label: 'Escuadra Táctica Combate', url: '/src/assets/images/hero_baztardos_clan_1794495592212.jpg' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0c0d14] border border-purple-500/50 rounded-2xl p-6 shadow-2xl relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              Editor de Logos e Imágenes del Clan
            </h3>
            <p className="text-xs text-zinc-400">
              Personaliza el logo insignia y el banner de fondo subiendo imágenes desde tu dispositivo o usando enlaces.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Field */}
          <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80">
            <ImageUploadInput
              label="Logo Oficial de BAZTARDOS GAMING"
              value={logoUrl}
              onChange={setLogoUrl}
              presets={logoPresets}
              aspectRatio="square"
              helperText="Formato recomendado: imagen cuadrada (PNG transparente o JPG). Puedes subir tu propio archivo desde tu teléfono o PC."
            />
          </div>

          {/* Banner Field */}
          <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80">
            <ImageUploadInput
              label="Banner de Fondo Hero / Portada"
              value={bannerUrl}
              onChange={setBannerUrl}
              presets={bannerPresets}
              aspectRatio="banner"
              helperText="Formato panorámico (16:9). Se mostrará detrás de la cuenta regresiva estelar con efecto de textura militar."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
            <span className="text-[11px] text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Los cambios se guardan y actualizan en toda la web.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-heading font-semibold uppercase tracking-wider"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={() => playTacticalClick()}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-heading font-bold uppercase tracking-wider shadow-lg shadow-purple-900/40"
              >
                Guardar Logos
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
