import React from 'react';
import { useClanData } from '../context/ClanDataContext';
import { playTacticalClick } from '../utils/soundEffects';
import { Info, Edit2, Shield, Users, CheckCircle, MessageSquare, ExternalLink, Globe, Image as ImageIcon } from 'lucide-react';

interface ClanInfoSectionProps {
  onEditInfo: () => void;
  onEditLogos?: () => void;
}

export const ClanInfoSection: React.FC<ClanInfoSectionProps> = ({ onEditInfo, onEditLogos }) => {
  const { state, isAdmin } = useClanData();
  const info = state.info;

  const rules = [
    { title: 'Respeto y Hermandad', desc: 'Cero toxicidad interna. Se apoya al compañero en victoria y derrota.' },
    { title: 'Puntualidad en Scrims', desc: 'Conexión 15 minutos antes de la hora fijada para el versus en Discord.' },
    { title: 'Comunicación Limpia', desc: 'Silencio en radio en momentos de clutch táctico; solo calls precisos.' },
    { title: 'Tag Obligatorio', desc: 'Todo miembro oficial debe portar el tag [BZT] en su gamertag de Delta Force.' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-heading mb-1">
            <Info className="w-4 h-4" />
            <span>Manifiesto & Reclutamiento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
            Información del Clan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Reglamento interno, canales de contacto y requisitos de ingreso a BAZTARDOS GAMING.
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onEditLogos && (
              <button
                onClick={() => {
                  onEditLogos();
                  playTacticalClick();
                }}
                className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                Editar Logos
              </button>
            )}

            <button
              onClick={() => {
                onEditInfo();
                playTacticalClick();
              }}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md shadow-purple-950/40"
            >
              <Edit2 className="w-4 h-4" />
              Editar Info
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Social Links */}
        <div className="space-y-6">
          <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm relative group">
            <div className="w-20 h-20 rounded-2xl bg-black/60 border border-purple-500/40 p-2 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-purple-950/30 overflow-hidden">
              <img
                src={info.logoUrl}
                alt={info.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <h3 className="text-center font-heading font-bold text-xl uppercase text-white">
              {info.name}
            </h3>
            <div className="text-center text-xs text-purple-400 font-mono-numbers mt-0.5">
              {info.tag} · Fundado en {info.foundedYear}
            </div>
            <p className="text-center text-xs text-zinc-300 italic mt-3">
              "{info.motto}"
            </p>

            <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Juego:</span>
                <span className="font-semibold text-white">{info.game}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Región / Servidor:</span>
                <span className="font-semibold text-purple-400">{info.server}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Reclutamiento:</span>
                <span className={`font-bold uppercase ${info.recruitmentOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {info.recruitmentOpen ? 'Abierto' : 'Cerrado'}
                </span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6">
            <h4 className="font-heading font-bold text-sm uppercase text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              Canales Oficiales
            </h4>
            <div className="space-y-2.5">
              {info.discordUrl && (
                <a
                  href={info.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/30 hover:bg-[#5865F2]/20 text-[#828cf5] hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <MessageSquare className="w-4 h-4" />
                    <span>Discord Oficial del Clan</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {info.whatsappUrl && (
                <a
                  href={info.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Users className="w-4 h-4" />
                    <span>Grupo de WhatsApp</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {info.youtubeUrl && (
                <a
                  href={info.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    <span>YouTube & Transmisiones</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Center & Right Column: Recruitment Requirements & Rules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recruitment Requirements */}
          <div className="bg-[#0c0d14]/90 border border-purple-500/25 rounded-2xl p-6 shadow-md shadow-purple-950/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-lg uppercase text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Requisitos de Postulación
              </h3>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-heading font-bold uppercase ${
                info.recruitmentOpen ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {info.recruitmentOpen ? 'Cupos Disponibles' : 'Reclutamiento Pausado'}
              </span>
            </div>

            <p className="text-xs text-zinc-300 mb-4">
              Para formar parte de BAZTARDOS GAMING y competir en torneos oficiales de Garena Delta Force, cada aspirante debe cumplir los siguientes estándares:
            </p>

            <ul className="space-y-2.5">
              {info.recruitmentRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            {info.recruitmentOpen && (
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400">
                  ¿Cumples los requisitos? Ingresa a nuestro Discord o WhatsApp para prueba de fuego.
                </span>
                <a
                  href={info.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-purple-950/40"
                >
                  Postular Ahora
                </a>
              </div>
            )}
          </div>

          {/* Clan Rules */}
          <div className="bg-[#0c0d14]/90 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg uppercase text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Código de Honor BZT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rules.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-zinc-800/80">
                  <div className="font-heading font-bold text-xs uppercase text-purple-400 mb-1">
                    0{idx + 1}. {rule.title}
                  </div>
                  <p className="text-xs text-zinc-300">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
