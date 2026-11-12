import React, { useState, useEffect } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick } from '../utils/soundEffects';
import { X, Settings } from 'lucide-react';

interface EditClanInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditClanInfoModal: React.FC<EditClanInfoModalProps> = ({ isOpen, onClose }) => {
  const { state, updateClanInfo } = useClanData();
  const info = state.info;

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [motto, setMotto] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [discordUrl, setDiscordUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [recruitmentOpen, setRecruitmentOpen] = useState(true);
  const [requirementsText, setRequirementsText] = useState('');
  const [customAdminPin, setCustomAdminPin] = useState('');

  useEffect(() => {
    if (info) {
      setName(info.name);
      setTag(info.tag);
      setMotto(info.motto);
      setLogoUrl(info.logoUrl);
      setBannerUrl(info.bannerUrl);
      setDiscordUrl(info.discordUrl || '');
      setWhatsappUrl(info.whatsappUrl || '');
      setYoutubeUrl(info.youtubeUrl || '');
      setAnnouncement(info.announcement || '');
      setRecruitmentOpen(info.recruitmentOpen);
      setRequirementsText((info.recruitmentRequirements || []).join('\n'));
      setCustomAdminPin(info.customAdminPin || '2507');
    }
  }, [info, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requirements = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    updateClanInfo({
      name: name.trim() || 'BAZTARDOS GAMING',
      tag: tag.trim() || '[BZT]',
      motto: motto.trim(),
      logoUrl: logoUrl.trim() || '/src/assets/images/logo_baztardos_purple_1794496762825.jpg',
      bannerUrl: bannerUrl.trim() || '/src/assets/images/hero_baztardos_purple_1794496763381.jpg',
      discordUrl: discordUrl.trim(),
      whatsappUrl: whatsappUrl.trim(),
      youtubeUrl: youtubeUrl.trim(),
      announcement: announcement.trim(),
      recruitmentOpen,
      recruitmentRequirements: requirements,
      customAdminPin: '2507',
    });

    playTacticalClick();
    onClose();
  };

  const logoPresets = [
    { label: 'Morado Metálico [BZT]', url: '/src/assets/images/logo_baztardos_purple_1794496762825.jpg' },
    { label: 'Dorado Original [BZT]', url: '/src/assets/images/logo_baztardos_gaming_1794495591983.jpg' },
  ];

  const bannerPresets = [
    { label: 'Noche Metálica Morada', url: '/src/assets/images/hero_baztardos_purple_1794496763381.jpg' },
    { label: 'Presa Cero Táctica', url: '/src/assets/images/map_zero_dam_1794495592834.jpg' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#0c0d14] border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              Editar Información General del Clan
            </h3>
            <p className="text-xs text-zinc-400">
              Personaliza el nombre, logo, lema, portada, anuncio y requisitos de reclutamiento.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Nombre del Clan
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Tag Oficial
              </label>
              <input
                type="text"
                required
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-mono-numbers"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Lema de Batalla
            </label>
            <input
              type="text"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none italic"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Comunicado Superior / Anuncio del Día (Barra Hero)
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Ej: 🔥 Próxima Scrim oficial este viernes a las 20:00 Col..."
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-purple-300 focus:outline-none"
            />
          </div>

          {/* Logo Upload with Device support */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Logo de BAZTARDOS GAMING"
              value={logoUrl}
              onChange={setLogoUrl}
              presets={logoPresets}
              aspectRatio="square"
              helperText="Sube tu imagen PNG o JPG desde tu dispositivo."
            />
          </div>

          {/* Banner Upload with Device support */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Banner de Portada / Fondo Hero"
              value={bannerUrl}
              onChange={setBannerUrl}
              presets={bannerPresets}
              aspectRatio="banner"
              helperText="Formato panorámico para el fondo de la portada."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Discord Oficial
              </label>
              <input
                type="url"
                value={discordUrl}
                onChange={(e) => setDiscordUrl(e.target.value)}
                placeholder="https://discord.gg/..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                WhatsApp del Clan
              </label>
              <input
                type="url"
                value={whatsappUrl}
                onChange={(e) => setWhatsappUrl(e.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Canal de YouTube
              </label>
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300">
                Requisitos de Reclutamiento (1 por línea)
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-300">
                <input
                  type="checkbox"
                  checked={recruitmentOpen}
                  onChange={(e) => setRecruitmentOpen(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-black border-zinc-700 rounded"
                />
                Reclutamiento Abierto
              </label>
            </div>
            <textarea
              rows={4}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none font-sans"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-heading font-semibold uppercase text-zinc-300">
                Código Maestro de Acceso Admin
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                El acceso al panel está blindado y restringido exclusivamente bajo el código 2507.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-lg">
              Blindado (2507)
            </span>
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
