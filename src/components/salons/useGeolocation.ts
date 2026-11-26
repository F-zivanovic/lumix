'use client';

import { useCallback, useState } from 'react';
import type { Coords } from '@/lib/salon-search';

export type GeoStatus = 'idle' | 'locating' | 'granted' | 'denied';

/** Lokacija korisnika — traži se tek kada je korisnik izričito zatraži (klik). */
export function useGeolocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [status, setStatus] = useState<GeoStatus>('idle');

  const request = useCallback(() => {
    if (status === 'granted' || status === 'locating') return;
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus('denied');
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('granted');
      },
      () => setStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }, [status]);

  return { coords, status, request };
}
