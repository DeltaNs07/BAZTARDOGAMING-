import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { ImageUploadInput } from './ImageUploadInput';
import { playTacticalClick } from '../utils/soundEffects';
import { X, Image as ImageIcon } from 'lucide-react';

interface AddGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGalleryModal: React.FC<AddGalleryModalProps> = ({ isOpen, onClose }) => {
  const { addGalleryItem } = useClanData();

  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'victorias' | 'torneos' | 'jugadas' | 'comunidad'>('victorias');
  const [date, setDate] = useState('Noviembre 2026');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addGalleryItem({
      title: title.trim() || 'Captura de Combate',
      caption: caption.trim() || 'Momento destacado de la escuadra BAZTARDOS.',
      imageUrl: imageUrl.trim() || '/src/assets/images/hero_baztardos_purple_1794496763381.jpg',
      category,
      date: date.trim() || 'Reciente',
    });

    playTacticalClick();
    onClose();
  };

  const presetImages = [
    { label: 'Noche Metálica Morada', url: '/src/assets/images/hero_baztardos_purple_1794496763381.jpg' },
    { label: 'Logo Morado BAZTARDOS', url: '/src/assets/images/logo_baztardos_purple_1794496762825.jpg' },
    { label: 'Presa Cero (Zero Dam)', url: '/src/assets/images/map_zero_dam_1794495592834.jpg' },
    { label: 'Logo Dorado Clásico', url: '/src/assets/images/logo_baztardos_gaming_1794495591983.jpg' },
  ];

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
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              Añadir Captura a la Galería
            </h3>
            <p className="text-xs text-zinc-400">
              Sube fotos desde tu dispositivo o usa enlaces de victorias y torneos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Título de la Captura
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Campeones Regionales Havoc"
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
              Descripción / Pie de Foto
            </label>
            <textarea
              rows={2}
              required
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ej: Captura del momento exacto de la victoria en Presa Cero con el escuadrón completo."
              className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'victorias' | 'torneos' | 'jugadas' | 'comunidad')}
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              >
                <option value="victorias">Victorias</option>
                <option value="torneos">Torneos & Copas</option>
                <option value="jugadas">Jugadas Épicas</option>
                <option value="comunidad">Comunidad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1">
                Fecha / Período
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Ej: Noviembre 2026"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Image Uploader */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
            <ImageUploadInput
              label="Archivo de Imagen"
              value={imageUrl}
              onChange={setImageUrl}
              presets={presetImages}
              aspectRatio="video"
              helperText="Sube una captura de pantalla desde tu PC o celular."
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
              Guardar en Galería
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
