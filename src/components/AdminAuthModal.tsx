import React, { useState } from 'react';
import { useClanData } from '../context/ClanDataContext';
import { playTacticalClick } from '../utils/soundEffects';
import { Shield, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginAdmin } = useClanData();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pin)) {
      setError(false);
      setPin('');
      onSuccess();
      onClose();
    } else {
      setError(true);
      playTacticalClick();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#0c0d14] border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg uppercase text-white">
              Acceso de Administración
            </h3>
            <p className="text-xs text-zinc-400">
              Panel exclusivo para el líder y administradores de BAZTARDOS.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-heading font-semibold uppercase text-zinc-300 mb-1.5">
              PIN de Seguridad
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={pin}
                maxLength={8}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="••••"
                className="w-full bg-black/60 border border-zinc-800 focus:border-purple-500 rounded-lg pl-9 pr-4 py-2.5 text-base text-white focus:outline-none font-mono tracking-widest"
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                PIN de seguridad incorrecto. Acceso denegado.
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-950/40"
            >
              Verificar & Desbloquear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
