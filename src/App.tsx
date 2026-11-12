import { useState } from 'react';
import { ClanDataProvider, useClanData } from './context/ClanDataContext';
import { Header } from './components/Header';
import { HeroCountdown } from './components/HeroCountdown';
import { MatchScheduleCalendar } from './components/MatchScheduleCalendar';
import { RosterSection } from './components/RosterSection';
import { RecordAndHistorySection } from './components/RecordAndHistorySection';
import { StatsSection } from './components/StatsSection';
import { GallerySection } from './components/GallerySection';
import { ClanInfoSection } from './components/ClanInfoSection';
import { Footer } from './components/Footer';

// Modals
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { EditMatchModal } from './components/EditMatchModal';
import { EditMemberModal } from './components/EditMemberModal';
import { EditHistoryModal } from './components/EditHistoryModal';
import { EditClanInfoModal } from './components/EditClanInfoModal';
import { EditLogosModal } from './components/EditLogosModal';
import { AddGalleryModal } from './components/AddGalleryModal';
import { RecordResultModal } from './components/RecordResultModal';

import { UpcomingMatch, RosterMember, MatchHistoryItem } from './types/clan';
import { playTacticalClick } from './utils/soundEffects';
import { Shield, Trophy, Users, Image as ImageIcon } from 'lucide-react';

function ClanAppContent() {
  const { state, isAdmin } = useClanData();
  const [activeTab, setActiveTab] = useState<string>('versus');

  // Modal states
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Logo & images edit modal
  const [isEditLogosOpen, setIsEditLogosOpen] = useState(false);

  // Match edit modal
  const [isEditMatchOpen, setIsEditMatchOpen] = useState(false);
  const [matchToEdit, setMatchToEdit] = useState<UpcomingMatch | null>(null);

  // Record match result modal
  const [isRecordResultOpen, setIsRecordResultOpen] = useState(false);
  const [matchToRecord, setMatchToRecord] = useState<UpcomingMatch | null>(null);

  // Roster edit modal
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<RosterMember | null>(null);

  // History edit modal
  const [isEditHistoryOpen, setIsEditHistoryOpen] = useState(false);
  const [historyToEdit, setHistoryToEdit] = useState<MatchHistoryItem | null>(null);

  // Clan info edit modal
  const [isEditClanInfoOpen, setIsEditClanInfoOpen] = useState(false);

  // Gallery add modal
  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);

  // Handlers for child components
  const handleAddNewMatch = () => {
    setMatchToEdit(null);
    setIsEditMatchOpen(true);
  };

  const handleEditMatch = (match: UpcomingMatch) => {
    setMatchToEdit(match);
    setIsEditMatchOpen(true);
  };

  const handleRecordResult = (match: UpcomingMatch) => {
    setMatchToRecord(match);
    setIsRecordResultOpen(true);
  };

  const handleAddMember = () => {
    setMemberToEdit(null);
    setIsEditMemberOpen(true);
  };

  const handleEditMember = (member: RosterMember) => {
    setMemberToEdit(member);
    setIsEditMemberOpen(true);
  };

  const handleAddHistory = () => {
    setHistoryToEdit(null);
    setIsEditHistoryOpen(true);
  };

  const handleEditHistory = (history: MatchHistoryItem) => {
    setHistoryToEdit(history);
    setIsEditHistoryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenLogosModal={() => setIsEditLogosOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'versus' && (
          <div>
            {/* Hero Countdown & Main Versus Arena */}
            <HeroCountdown
              onEditNextMatch={() => {
                if (state.upcomingMatches[0]) {
                  handleEditMatch(state.upcomingMatches[0]);
                } else {
                  handleAddNewMatch();
                }
              }}
              onEditLogos={() => setIsEditLogosOpen(true)}
              onNavigateToCalendar={() => {
                setActiveTab('calendario');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToRoster={() => {
                setActiveTab('roster');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Teasers of Calendar, Roster & Record */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
              {/* Quick Roster Spotlight */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <h3 className="font-heading font-bold text-lg uppercase text-white">
                      Escuadrón Titular Destacado
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('roster');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      playTacticalClick();
                    }}
                    className="text-xs font-heading uppercase text-purple-400 hover:text-purple-300 hover:underline font-semibold"
                  >
                    Ver Roster Completo ({state.roster.length}) →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {state.roster.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveTab('roster');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-[#0c0d14]/90 border border-zinc-800 hover:border-purple-500/40 rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all hover:-translate-y-0.5"
                    >
                      <img
                        src={p.avatarUrl}
                        alt={p.gamertag}
                        className="w-10 h-10 rounded-xl object-cover border border-purple-500/30"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                      <div className="overflow-hidden">
                        <div className="font-heading font-bold text-xs uppercase text-white truncate">
                          {p.gamertag}
                        </div>
                        <div className="text-[11px] text-purple-400 truncate">
                          {p.role}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono-numbers">
                          {p.kdRatio} K/D · {p.favoriteOperator.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Record Teaser */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-950 to-black border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-950/20">
                <div>
                  <div className="text-xs font-heading font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4" />
                    Récord Competitivo BAZTARDOS GAMING
                  </div>
                  <div className="text-xl sm:text-2xl font-bold uppercase font-heading text-white">
                    Dominando Torneos Oficiales de Garena Delta Force
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 max-w-xl">
                    Consulta el registro de partidos ganados, empatados y perdidos, detalles de tickets y estadísticas de la escuadra.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('record');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      playTacticalClick();
                    }}
                    className="px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-950/40"
                  >
                    Ver Récord & Historial
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('stats');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      playTacticalClick();
                    }}
                    className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-heading font-semibold text-xs uppercase tracking-wider transition-colors border border-zinc-700"
                  >
                    Estadísticas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <MatchScheduleCalendar
            onAddNewMatch={handleAddNewMatch}
            onEditMatch={handleEditMatch}
            onRecordResult={handleRecordResult}
          />
        )}

        {activeTab === 'roster' && (
          <RosterSection
            onAddMember={handleAddMember}
            onEditMember={handleEditMember}
          />
        )}

        {activeTab === 'record' && (
          <RecordAndHistorySection
            onAddHistoryMatch={handleAddHistory}
            onEditHistoryMatch={handleEditHistory}
          />
        )}

        {activeTab === 'stats' && <StatsSection />}

        {activeTab === 'galeria' && (
          <GallerySection onAddImage={() => setIsAddGalleryOpen(true)} />
        )}

        {activeTab === 'info' && (
          <ClanInfoSection
            onEditInfo={() => setIsEditClanInfoOpen(true)}
            onEditLogos={() => setIsEditLogosOpen(true)}
          />
        )}
      </main>

      {/* Floating Admin Quick Bar if Admin is logged in */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-40 bg-[#0c0d14]/95 border border-purple-500/60 rounded-xl p-2.5 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 pl-1">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span className="font-heading font-bold uppercase text-purple-300">
              Modo Admin
            </span>
          </div>

          <button
            onClick={() => {
              setIsEditLogosOpen(true);
              playTacticalClick();
            }}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-purple-300 border border-purple-500/30 font-heading font-bold uppercase text-xs transition-colors flex items-center gap-1.5"
            title="Cambiar Logo y Portada"
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
            <span>Editar Logos</span>
          </button>

          <button
            onClick={() => {
              setIsAdminPanelOpen(true);
              playTacticalClick();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold uppercase text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-purple-950/40"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Panel General</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          playTacticalClick();
        }}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Modals */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={() => setIsAdminPanelOpen(true)}
      />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onAddNewMatch={handleAddNewMatch}
        onEditMatch={handleEditMatch}
        onRecordResult={handleRecordResult}
        onAddMember={handleAddMember}
        onEditMember={handleEditMember}
        onAddHistory={handleAddHistory}
        onEditHistory={handleEditHistory}
        onEditClanInfo={() => setIsEditClanInfoOpen(true)}
        onEditLogos={() => setIsEditLogosOpen(true)}
      />

      <EditLogosModal
        isOpen={isEditLogosOpen}
        onClose={() => setIsEditLogosOpen(false)}
      />

      <EditMatchModal
        isOpen={isEditMatchOpen}
        onClose={() => setIsEditMatchOpen(false)}
        matchToEdit={matchToEdit}
      />

      <EditMemberModal
        isOpen={isEditMemberOpen}
        onClose={() => setIsEditMemberOpen(false)}
        memberToEdit={memberToEdit}
      />

      <EditHistoryModal
        isOpen={isEditHistoryOpen}
        onClose={() => setIsEditHistoryOpen(false)}
        matchToEdit={historyToEdit}
      />

      <EditClanInfoModal
        isOpen={isEditClanInfoOpen}
        onClose={() => setIsEditClanInfoOpen(false)}
      />

      <AddGalleryModal
        isOpen={isAddGalleryOpen}
        onClose={() => setIsAddGalleryOpen(false)}
      />

      <RecordResultModal
        isOpen={isRecordResultOpen}
        onClose={() => setIsRecordResultOpen(false)}
        match={matchToRecord}
      />
    </div>
  );
}

export default function App() {
  return (
    <ClanDataProvider>
      <ClanAppContent />
    </ClanDataProvider>
  );
}
