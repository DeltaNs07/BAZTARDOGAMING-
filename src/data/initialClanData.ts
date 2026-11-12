import { ClanState } from '../types/clan';

// Calculate an upcoming match date 2 days 6 hours ahead of now
const getFutureMatchDate = (daysAhead = 2, hoursAhead = 18): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hoursAhead, 0, 0, 0);
  return d.toISOString();
};

const getSecondaryFutureDate = (daysAhead = 5, hoursAhead = 20): string => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hoursAhead, 30, 0, 0);
  return d.toISOString();
};

export const INITIAL_CLAN_STATE: ClanState = {
  info: {
    name: "BAZTARDOS GAMING",
    tag: "[BZT]",
    motto: "Sin piedad en el frente de batalla. Dominio táctico y supremacía en Delta Force.",
    game: "Garena Delta Force: Hawk Ops",
    server: "Latinoamérica / Global",
    logoUrl: "/src/assets/images/logo_baztardos_purple_1794496762825.jpg",
    bannerUrl: "/src/assets/images/hero_baztardos_purple_1794496763381.jpg",
    discordUrl: "https://discord.gg/baztardosgaming",
    whatsappUrl: "https://chat.whatsapp.com/baztardosclan",
    youtubeUrl: "https://youtube.com/@baztardosgaming",
    tiktokUrl: "https://tiktok.com/@baztardosdeltaforce",
    recruitmentOpen: true,
    recruitmentRequirements: [
      "Rango competitivo mínimo: Teniente Coronel o superior.",
      "K/D Ratio global comprobable superior a 2.30.",
      "Disponibilidad horaria para Scrims y Torneos nocturnos (20:00 - 23:00 Col/Mex).",
      "Comunicación táctica obligatoria por Discord (Micrófono nítido, sin eco).",
      "Disciplina operativa, respeto a la escuadra y compromiso en entrenamientos.",
      "Especialización en al menos dos operadores tácticos de Delta Force."
    ],
    announcement: "🔥 PRÓXIMA SCRIM OFICIAL: Enfrentamiento de alta intensidad contra VIPER SQUADRON. Modalidad Havoc Warfare 32v32 en Mapa Presa Cero. ¡Todos los operadores titulares confirmados!",
    foundedYear: "2024",
    customAdminPin: "2507",
  },
  upcomingMatches: [
    {
      id: "match-1",
      opponentName: "VIPER SQUADRON",
      opponentTag: "[VPR]",
      opponentLogo: "/src/assets/images/logo_rival_clan_1794495592613.jpg",
      matchDate: getFutureMatchDate(2, 21), // 2 days from now at 21:00
      modality: "Havoc Warfare 32v32",
      map: "Presa Cero (Zero Dam)",
      mapImage: "/src/assets/images/map_zero_dam_1794495592834.jpg",
      serverRegion: "SA - São Paulo / Bogotá",
      streamUrl: "https://twitch.tv/baztardosgaming",
      caster: "Delta Force Cast Oficial Latam",
      tournamentName: "Copa Continental Delta Force - Fase de Grupos",
      notes: "Partida al mejor de 3 mapas con rotación de ataque y defensa táctica."
    },
    {
      id: "match-2",
      opponentName: "APEX PREDATORS",
      opponentTag: "[APX]",
      opponentLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop&q=80",
      matchDate: getSecondaryFutureDate(5, 20),
      modality: "Operaciones Tácticas 5v5",
      map: "Ascensión (Ascension)",
      mapImage: "/src/assets/images/map_zero_dam_1794495592834.jpg",
      serverRegion: "NA - Miami East",
      streamUrl: "https://youtube.com/@baztardosgaming/live",
      caster: "Shoutcast Latam Esports",
      tournamentName: "Liga Nacional de Clanes - Cuartos de Final",
      notes: "Buscar y Destruir al mejor de 12 rondas. Prohibido operador Hackclaw por reglas de liga."
    },
    {
      id: "match-3",
      opponentName: "VALKIRIA ESPORTS",
      opponentTag: "[VLK]",
      opponentLogo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop&q=80",
      matchDate: getSecondaryFutureDate(8, 22),
      modality: "Hazard Operations (Extracción)",
      map: "Layali Grove",
      serverRegion: "SA - Latam Sur",
      streamUrl: "https://twitch.tv/baztardosgaming",
      caster: "Comunidad Delta Force",
      tournamentName: "Showmatch de Clanes Aliados",
      notes: "Extracción con botín de máximo valor y combate de clanes."
    }
  ],
  roster: [
    {
      id: "ros-1",
      gamertag: "BZT_MIGUEL",
      realName: "Miguel Pabón",
      role: "Líder / IGL",
      favoriteOperator: "D-Wolf (Kai Silva)",
      favoriteWeapon: "K416 Especial Táctico",
      rank: "General de División",
      kdRatio: 3.85,
      matchesPlayed: 412,
      winRate: 84.5,
      country: "Colombia",
      countryCode: "CO",
      avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Fundador"
    },
    {
      id: "ros-2",
      gamertag: "BZT_VORTEX",
      realName: "Alejandro Castro",
      role: "Co-Líder",
      favoriteOperator: "Vyron (Wang Yuhao)",
      favoriteWeapon: "M4A1 Carbine Mod",
      rank: "Coronel Estrella",
      kdRatio: 3.20,
      matchesPlayed: 388,
      winRate: 81.2,
      country: "México",
      countryCode: "MX",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Enero 2024"
    },
    {
      id: "ros-3",
      gamertag: "BZT_SNIPEX",
      realName: "Sebastián R.",
      role: "Recon / Sniper",
      favoriteOperator: "Luna (Kim Yewon)",
      favoriteWeapon: "AWM .338 Lapua",
      rank: "Pinnacle / Cúspide",
      kdRatio: 4.15,
      matchesPlayed: 320,
      winRate: 88.0,
      country: "Argentina",
      countryCode: "AR",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Febrero 2024"
    },
    {
      id: "ros-4",
      gamertag: "BZT_GHOSTKILLER",
      realName: "Carlos Méndez",
      role: "Asalto / Fragger",
      favoriteOperator: "D-Wolf (Kai Silva)",
      favoriteWeapon: "SCAR-H Pesado",
      rank: "Coronel",
      kdRatio: 3.45,
      matchesPlayed: 360,
      winRate: 83.1,
      country: "Perú",
      countryCode: "PE",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Marzo 2024"
    },
    {
      id: "ros-5",
      gamertag: "BZT_MEDIC_DOC",
      realName: "Diego Morales",
      role: "Support / Médico",
      favoriteOperator: "Stinger (Roy Smee)",
      favoriteWeapon: "MP5 Táctica Silenciada",
      rank: "Teniente Coronel",
      kdRatio: 2.65,
      matchesPlayed: 345,
      winRate: 86.4,
      country: "Chile",
      countryCode: "CL",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Abril 2024"
    },
    {
      id: "ros-6",
      gamertag: "BZT_JUGGERNAUT",
      realName: "Andrés Silva",
      role: "Ingeniero / Tanquista",
      favoriteOperator: "Uluru (David Fletcher)",
      favoriteWeapon: "PKM Ametralladora Ligera",
      rank: "Coronel",
      kdRatio: 2.95,
      matchesPlayed: 290,
      winRate: 79.5,
      country: "Venezuela",
      countryCode: "VE",
      avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop&q=80",
      isStarter: true,
      joinDate: "Mayo 2024"
    },
    {
      id: "ros-7",
      gamertag: "BZT_PHANTOM",
      realName: "Rodrigo Peña",
      role: "Suplente / Reserva",
      favoriteOperator: "Hackclaw (Mai Xiaowen)",
      favoriteWeapon: "Vector .45 ACP",
      rank: "Mayor Táctico",
      kdRatio: 2.45,
      matchesPlayed: 180,
      winRate: 76.0,
      country: "España",
      countryCode: "ES",
      avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&q=80",
      isStarter: false,
      joinDate: "Julio 2024"
    },
    {
      id: "ros-8",
      gamertag: "BZT_VIPER_EYE",
      realName: "Matías Torres",
      role: "Suplente / Reserva",
      favoriteOperator: "Shepherd (Terry Musa)",
      favoriteWeapon: "M700 Francotirador",
      rank: "Mayor Táctico",
      kdRatio: 2.30,
      matchesPlayed: 145,
      winRate: 74.2,
      country: "Colombia",
      countryCode: "CO",
      avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&q=80",
      isStarter: false,
      joinDate: "Agosto 2024"
    }
  ],
  history: [
    {
      id: "hist-1",
      opponentName: "TITANES DELTA",
      opponentTag: "[TTN]",
      opponentLogo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&h=200&fit=crop&q=80",
      date: "2026-11-08",
      modality: "Havoc Warfare 32v32",
      map: "Presa Cero (Zero Dam)",
      ourScore: 1000,
      opponentScore: 680,
      outcome: "win",
      mvp: "BZT_MIGUEL (42 Kills · 8 Banderas)",
      ticketsDifference: "+320 Tickets",
      notes: "Dominio absoluto del punto B y captura rápida de las torres de control.",
      vodLink: "https://youtube.com"
    },
    {
      id: "hist-2",
      opponentName: "SHADOW LEGION",
      opponentTag: "[SHD]",
      opponentLogo: "https://images.unsplash.com/photo-1563089145-599997674d42?w=200&h=200&fit=crop&q=80",
      date: "2026-11-04",
      modality: "Operaciones Tácticas 5v5",
      map: "Ascensión (Ascension)",
      ourScore: 7,
      opponentScore: 3,
      outcome: "win",
      mvp: "BZT_SNIPEX (18 Kills con Luna)",
      ticketsDifference: "Ronda 7-3",
      notes: "Clutch 1v3 decisivo en la ronda 8 asegurando el match.",
      vodLink: "https://youtube.com"
    },
    {
      id: "hist-3",
      opponentName: "ALPHA WOLVES",
      opponentTag: "[AW]",
      opponentLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop&q=80",
      date: "2026-10-29",
      modality: "Havoc Warfare 32v32",
      map: "Pozo (Shaft)",
      ourScore: 920,
      opponentScore: 920,
      outcome: "draw",
      mvp: "BZT_GHOSTKILLER (38 Kills)",
      ticketsDifference: "Empate Técnico",
      notes: "Final de infarto con tiempo agotado y ambos cuarteles defendidos.",
      vodLink: "https://youtube.com"
    },
    {
      id: "hist-4",
      opponentName: "NEXUS SQUADRON",
      opponentTag: "[NXS]",
      opponentLogo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&h=200&fit=crop&q=80",
      date: "2026-10-22",
      modality: "Havoc Warfare 32v32",
      map: "Layali Grove",
      ourScore: 1000,
      opponentScore: 810,
      outcome: "win",
      mvp: "BZT_JUGGERNAUT (5 Tanques destruidos)",
      ticketsDifference: "+190 Tickets",
      notes: "Excelente trabajo de ingeniería blindada reteniendo el avance pesado.",
      vodLink: "https://youtube.com"
    },
    {
      id: "hist-5",
      opponentName: "CYBER HYDRA",
      opponentTag: "[HYD]",
      opponentLogo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop&q=80",
      date: "2026-10-15",
      modality: "Operaciones Tácticas 5v5",
      map: "Ciudad Espacial (Space City)",
      ourScore: 5,
      opponentScore: 7,
      outcome: "loss",
      mvp: "BZT_VORTEX (22 Kills)",
      ticketsDifference: "Ronda 5-7",
      notes: "Partida sumamente reñida en tiempo extra de la final regional.",
      vodLink: "https://youtube.com"
    },
    {
      id: "hist-6",
      opponentName: "BLACK LOTUS",
      opponentTag: "[BLT]",
      opponentLogo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&h=200&fit=crop&q=80",
      date: "2026-10-08",
      modality: "Havoc Warfare 32v32",
      map: "Presa Cero (Zero Dam)",
      ourScore: 1000,
      opponentScore: 540,
      outcome: "win",
      mvp: "BZT_MIGUEL (48 Kills)",
      ticketsDifference: "+460 Tickets",
      notes: "Récord histórico de bajas en asalto relámpago.",
      vodLink: "https://youtube.com"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Victoria en Gran Final Havoc",
      caption: "Celebrando el campeonato regional en Presa Cero con marcador perfecto.",
      imageUrl: "/src/assets/images/hero_baztardos_clan_1794495592212.jpg",
      category: "torneos",
      date: "Noviembre 2026"
    },
    {
      id: "gal-2",
      title: "Reconocimiento y Sniper Ace",
      caption: "Luna dominando las líneas de visión elevadas en mapa Ascensión.",
      imageUrl: "/src/assets/images/map_zero_dam_1794495592834.jpg",
      category: "jugadas",
      date: "Noviembre 2026"
    },
    {
      id: "gal-3",
      title: "Emblema Oficial de Escuadra",
      caption: "Insignia táctica dorada y fibra de carbono BAZTARDOS GAMING.",
      imageUrl: "/src/assets/images/logo_baztardos_gaming_1794495591983.jpg",
      category: "comunidad",
      date: "Octubre 2026"
    },
    {
      id: "gal-4",
      title: "Enfrentamiento Versus Viper Squadron",
      caption: "Poster oficial del clásico de clanes en Garena Delta Force.",
      imageUrl: "/src/assets/images/logo_rival_clan_1794495592613.jpg",
      category: "victorias",
      date: "Octubre 2026"
    }
  ]
};
