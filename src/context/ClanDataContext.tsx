import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { ClanState, ClanInfo, UpcomingMatch, RosterMember, MatchHistoryItem, GalleryItem } from '../types/clan';
import { INITIAL_CLAN_STATE } from '../data/initialClanData';
import { playTacticalClick, playVictoryChime } from '../utils/soundEffects';

const STORAGE_KEY = 'baztardos_clan_state_v1';
const ADMIN_SESSION_KEY = 'baztardos_admin_session';

interface ClanContextType {
  state: ClanState;
  isAdmin: boolean;
  selectedTimezone: string;
  setSelectedTimezone: (tz: string) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  // Updaters
  updateClanInfo: (info: Partial<ClanInfo>) => void;
  // Upcoming matches
  addUpcomingMatch: (match: Omit<UpcomingMatch, 'id'>) => void;
  updateUpcomingMatch: (id: string, match: Partial<UpcomingMatch>) => void;
  deleteUpcomingMatch: (id: string) => void;
  // Roster
  addRosterMember: (member: Omit<RosterMember, 'id'>) => void;
  updateRosterMember: (id: string, member: Partial<RosterMember>) => void;
  deleteRosterMember: (id: string) => void;
  // History & Record
  addHistoryMatch: (match: Omit<MatchHistoryItem, 'id'>) => void;
  updateHistoryMatch: (id: string, match: Partial<MatchHistoryItem>) => void;
  deleteHistoryMatch: (id: string) => void;
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  // Backup & Reset
  resetToDefaults: () => void;
  exportBackupJson: () => void;
  importBackupJson: (jsonString: string) => boolean;
  // Computed Record
  stats: {
    totalMatches: number;
    wins: number;
    draws: number;
    losses: number;
    winRate: string;
    totalRoster: number;
    startersCount: number;
    avgKd: string;
    tournamentsCount: number;
  };
}

const ClanContext = createContext<ClanContextType | undefined>(undefined);

export const ClanDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ClanState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure structure validity
        if (parsed.info && Array.isArray(parsed.upcomingMatches) && Array.isArray(parsed.roster)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_CLAN_STATE;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [selectedTimezone, setSelectedTimezone] = useState<string>('America/Bogota');

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save clan state to localStorage', e);
    }
  }, [state]);

  const loginAdmin = (pin: string): boolean => {
    // El único código de acceso autorizado es estrictamente 2507
    if (pin.trim() === '2507') {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {
        // Ignore
      }
      playVictoryChime();
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore
    }
    playTacticalClick();
  };

  const updateClanInfo = (infoUpdates: Partial<ClanInfo>) => {
    setState((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        ...infoUpdates,
      },
    }));
    playTacticalClick();
  };

  // Upcoming matches CRUD
  const addUpcomingMatch = (newMatch: Omit<UpcomingMatch, 'id'>) => {
    const match: UpcomingMatch = {
      ...newMatch,
      id: `match-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      upcomingMatches: [match, ...prev.upcomingMatches],
    }));
    playTacticalClick();
  };

  const updateUpcomingMatch = (id: string, matchUpdates: Partial<UpcomingMatch>) => {
    setState((prev) => ({
      ...prev,
      upcomingMatches: prev.upcomingMatches.map((m) =>
        m.id === id ? { ...m, ...matchUpdates } : m
      ),
    }));
    playTacticalClick();
  };

  const deleteUpcomingMatch = (id: string) => {
    setState((prev) => ({
      ...prev,
      upcomingMatches: prev.upcomingMatches.filter((m) => m.id !== id),
    }));
    playTacticalClick();
  };

  // Roster CRUD
  const addRosterMember = (newMember: Omit<RosterMember, 'id'>) => {
    const member: RosterMember = {
      ...newMember,
      id: `ros-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      roster: [...prev.roster, member],
    }));
    playTacticalClick();
  };

  const updateRosterMember = (id: string, memberUpdates: Partial<RosterMember>) => {
    setState((prev) => ({
      ...prev,
      roster: prev.roster.map((r) => (r.id === id ? { ...r, ...memberUpdates } : r)),
    }));
    playTacticalClick();
  };

  const deleteRosterMember = (id: string) => {
    setState((prev) => ({
      ...prev,
      roster: prev.roster.filter((r) => r.id !== id),
    }));
    playTacticalClick();
  };

  // History CRUD
  const addHistoryMatch = (newHistory: Omit<MatchHistoryItem, 'id'>) => {
    const match: MatchHistoryItem = {
      ...newHistory,
      id: `hist-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      history: [match, ...prev.history],
    }));
    playVictoryChime();
  };

  const updateHistoryMatch = (id: string, matchUpdates: Partial<MatchHistoryItem>) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.map((h) => (h.id === id ? { ...h, ...matchUpdates } : h)),
    }));
    playTacticalClick();
  };

  const deleteHistoryMatch = (id: string) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.filter((h) => h.id !== id),
    }));
    playTacticalClick();
  };

  // Gallery CRUD
  const addGalleryItem = (newItem: Omit<GalleryItem, 'id'>) => {
    const item: GalleryItem = {
      ...newItem,
      id: `gal-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      gallery: [item, ...prev.gallery],
    }));
    playTacticalClick();
  };

  const deleteGalleryItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
    playTacticalClick();
  };

  // Reset & Backup
  const resetToDefaults = () => {
    setState(INITIAL_CLAN_STATE);
    localStorage.removeItem(STORAGE_KEY);
    playTacticalClick();
  };

  const exportBackupJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BAZTARDOS_GAMING_BACKUP_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackupJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.info && Array.isArray(parsed.upcomingMatches) && Array.isArray(parsed.roster)) {
        setState(parsed);
        playVictoryChime();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  // Computed Clan Stats from History and Roster
  const stats = useMemo(() => {
    const wins = state.history.filter((h) => h.outcome === 'win').length;
    const draws = state.history.filter((h) => h.outcome === 'draw').length;
    const losses = state.history.filter((h) => h.outcome === 'loss').length;
    const totalMatches = wins + draws + losses;
    const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(1) : '0.0';

    const totalRoster = state.roster.length;
    const startersCount = state.roster.filter((r) => r.isStarter).length;

    const totalKd = state.roster.reduce((acc, curr) => acc + (curr.kdRatio || 0), 0);
    const avgKd = totalRoster > 0 ? (totalKd / totalRoster).toFixed(2) : '0.00';

    return {
      totalMatches,
      wins,
      draws,
      losses,
      winRate,
      totalRoster,
      startersCount,
      avgKd,
      tournamentsCount: 4, // 4 titles won
    };
  }, [state.history, state.roster]);

  return (
    <ClanContext.Provider
      value={{
        state,
        isAdmin,
        selectedTimezone,
        setSelectedTimezone,
        loginAdmin,
        logoutAdmin,
        updateClanInfo,
        addUpcomingMatch,
        updateUpcomingMatch,
        deleteUpcomingMatch,
        addRosterMember,
        updateRosterMember,
        deleteRosterMember,
        addHistoryMatch,
        updateHistoryMatch,
        deleteHistoryMatch,
        addGalleryItem,
        deleteGalleryItem,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
        stats,
      }}
    >
      {children}
    </ClanContext.Provider>
  );
};

export const useClanData = () => {
  const context = useContext(ClanContext);
  if (!context) {
    throw new Error('useClanData must be used within a ClanDataProvider');
  }
  return context;
};
