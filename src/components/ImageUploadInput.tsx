import React, { useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';

interface PresetItem {
  label: string;
  url: string;
}

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  presets?: PresetItem[];
  aspectRatio?: 'square' | 'video' | 'banner';
  helperText?: string;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value,
  onChange,
  presets,
  aspectRatio = 'square',
  helperText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 4MB for localStorage comfort
    if (file.size > 4 * 1024 * 1024) {
      alert('La imagen seleccionada supera los 4MB. Por favor elige una imagen más ligera o pega un enlace web.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        onChange(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-video w-32'
      : aspectRatio === 'banner'
      ? 'aspect-[21/9] w-48'
      : 'w-16 h-16';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-zinc-300">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-zinc-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Quitar imagen
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Preview thumbnail */}
        <div
          className={`${aspectClass} rounded-xl bg-black/60 border border-purple-500/30 overflow-hidden shrink-0 flex items-center justify-center relative group shadow-md shadow-black`}
        >
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-zinc-600" />
          )}
        </div>

        {/* Action buttons & URL input */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Pega la URL de la imagen (https://...)"
              className="flex-1 bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
              title="Subir archivo desde tu dispositivo"
            >
              <Upload className="w-3.5 h-3.5 text-purple-400" />
              <span>Subir Foto</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {helperText && (
            <p className="text-[10px] text-zinc-400">{helperText}</p>
          )}

          {/* Preset shortcuts if available */}
          {presets && presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-zinc-400">Presets del clan:</span>
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onChange(p.url)}
                  className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 hover:bg-purple-950/60 border border-zinc-800 hover:border-purple-500/50 text-zinc-300 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
