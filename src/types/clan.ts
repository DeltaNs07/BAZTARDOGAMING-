export type PlayerRole = 
  | 'Líder / IGL'
  | 'Co-Líder'
  | 'Asalto / Fragger'
  | 'Recon / Sniper'
  | 'Support / Médico'
  | 'Ingeniero / Tanquista'
  | 'Suplente / Reserva';

export interface RosterMember {
  id: string;
  gamertag: string;
  realName?: string;
  role: PlayerRole;
  favoriteOperator: string;
  favoriteWeapon: string;
  rank: string;
  kdRatio: number;
  matchesPlayed: number;
  winRate: number;
  country: string;
  countryCode: string;
  avatarUrl: string;
  isStarter: boolean;
  joinDate: string;
}

export type MatchResultStatus = 'win' | 'loss' | 'draw';

export interface MatchHistoryItem {
  id: string;
  opponentName: string;
  opponentTag: string;
  opponentLogo: string;
  date: string; // ISO string or YYYY-MM-DD
  modality: string;
  map: string;
  ourScore: number;
  opponentScore: number;
  outcome: MatchResultStatus;
  mvp: string;
  ticketsDifference?: string;
  notes?: string;
  vodLink?: string;
}

export interface UpcomingMatch {
  id: string;
  opponentName: string;
  opponentTag: string;
  opponentLogo: string;
  matchDate: string; // ISO string e.g. 2026-11-15T21:00:00
  modality: string;
  map: string;
  mapImage?: string;
  serverRegion: string;
  streamUrl: string;
  caster?: string;
  tournamentName?: string;
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'victorias' | 'torneos' | 'jugadas' | 'comunidad';
  date: string;
}

export interface ClanInfo {
  name: string;
  tag: string;
  motto: string;
  game: string;
  server: string;
  logoUrl: string;
  bannerUrl: string;
  discordUrl: string;
  whatsappUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  recruitmentOpen: boolean;
  recruitmentRequirements: string[];
  announcement: string;
  foundedYear: string;
  customAdminPin: string;
}

export interface ClanState {
  info: ClanInfo;
  upcomingMatches: UpcomingMatch[];
  roster: RosterMember[];
  history: MatchHistoryItem[];
  gallery: GalleryItem[];
}
