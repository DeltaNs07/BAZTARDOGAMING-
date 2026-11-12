export interface CountryZone {
  code: string;
  country: string;
  city: string;
  flag: string;
  tz: string;
  utcOffset: string;
}

export const TIMEZONES_LIST: CountryZone[] = [
  { code: 'CO', country: 'Colombia', city: 'Bogotá', flag: '🇨🇴', tz: 'America/Bogota', utcOffset: 'UTC-5' },
  { code: 'MX', country: 'México', city: 'CDMX', flag: '🇲🇽', tz: 'America/Mexico_City', utcOffset: 'UTC-6' },
  { code: 'PE', country: 'Perú', city: 'Lima', flag: '🇵🇪', tz: 'America/Lima', utcOffset: 'UTC-5' },
  { code: 'AR', country: 'Argentina', city: 'Buenos Aires', flag: '🇦🇷', tz: 'America/Argentina/Buenos_Aires', utcOffset: 'UTC-3' },
  { code: 'CL', country: 'Chile', city: 'Santiago', flag: '🇨🇱', tz: 'America/Santiago', utcOffset: 'UTC-3' },
  { code: 'VE', country: 'Venezuela', city: 'Caracas', flag: '🇻🇪', tz: 'America/Caracas', utcOffset: 'UTC-4' },
  { code: 'ES', country: 'España', city: 'Madrid', flag: '🇪🇸', tz: 'Europe/Madrid', utcOffset: 'UTC+1' },
  { code: 'US_ET', country: 'EE.UU. (Este)', city: 'Miami / NY', flag: '🇺🇸', tz: 'America/New_York', utcOffset: 'UTC-5' },
];

/**
 * Formats a match date string into the specified timezone.
 */
export function formatMatchTimeForZone(
  isoDateString: string,
  timeZone: string
): { formattedTime: string; formattedDate: string; fullString: string } {
  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) {
      return { formattedTime: '--:--', formattedDate: 'Fecha inválida', fullString: '--:--' };
    }

    const timeFormatter = new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone,
    });

    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone,
    });

    const formattedTime = timeFormatter.format(date);
    const formattedDate = dateFormatter.format(date);

    return {
      formattedTime,
      formattedDate,
      fullString: `${formattedDate} · ${formattedTime}`,
    };
  } catch {
    return { formattedTime: '--:--', formattedDate: 'Error', fullString: '--:--' };
  }
}

/**
 * Returns formatted times for all supported country zones for a given match time.
 */
export function getAllZoneTimes(isoDateString: string): Array<CountryZone & { time: string; date: string }> {
  return TIMEZONES_LIST.map((zone) => {
    const formatted = formatMatchTimeForZone(isoDateString, zone.tz);
    return {
      ...zone,
      time: formatted.formattedTime,
      date: formatted.formattedDate,
    };
  });
}

/**
 * Calculates countdown breakdown from now until the target ISO date
 */
export function getCountdown(targetIsoDate: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isLive: boolean; // within 2 hours after start
  totalSeconds: number;
} {
  const target = new Date(targetIsoDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    // If it started less than 2 hours ago, consider it live
    const hoursPast = Math.abs(diff) / (1000 * 60 * 60);
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      isLive: hoursPast < 2.5,
      totalSeconds: 0,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    isLive: false,
    totalSeconds: Math.floor(diff / 1000),
  };
}
