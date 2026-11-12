import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { GalleryItem } from '../types/clan';
import { playTacticalClick } from '../utils/soundEffects';
import { Image, Plus, Trash2, X, ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  onAddImage: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onAddImage }) => {
  const { state, isAdmin, deleteGalleryItem } = useClanData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'victorias', label: 'Victorias' },
    { id: 'torneos', label: 'Torneos' },
    { id: 'jugadas', label: 'Jugadas Épicas' },
    { id: 'comunidad', label: 'Comunidad' },
  ];

  const filteredItems = state.gallery.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
            <Image className="w-4 h-4" />
            <span>Archivo Visual de Operaciones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
            Galería del Clan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Momentos legendarios, copas de torneos y capturas de combate en Delta Force.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              onAddImage();
              playTacticalClick();
            }}
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto shadow-md shadow-purple-950/40"
          >
            <Plus className="w-4 h-4" />
            Añadir Captura
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              playTacticalClick();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
              selectedCategory === cat.id
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-950/30'
                : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#0c0d14]/90 border border-zinc-800/80 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Box */}
            <div
              onClick={() => {
                setActiveLightbox(item);
                playTacticalClick();
              }}
              className="relative aspect-video sm:aspect-square overflow-hidden cursor-pointer bg-black/60"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-black/70 text-purple-400">
                  <ZoomIn className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-purple-400 font-heading uppercase mb-1">
                  <span>{item.category}</span>
                  <span className="text-zinc-500">{item.date}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-white uppercase line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>

              {/* Admin delete */}
              {isAdmin && (
                <div className="mt-3 pt-2 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`¿Eliminar la imagen "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1 rounded-lg text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Eliminar foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0c0d14] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-purple-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <div className="text-xs uppercase font-heading text-purple-400 font-bold mb-1">
                {activeLightbox.category} · {activeLightbox.date}
              </div>
              <h3 className="text-xl font-bold uppercase text-white font-heading">
                {activeLightbox.title}
              </h3>
              <p className="text-sm text-zinc-300 mt-2">
                {activeLightbox.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
