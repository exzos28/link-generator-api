import geoip from 'geoip-lite';

export function getIpInfo(ip: string) {
  return geoip.lookup(ip) as GeoIp | null;
}

export type GeoIp = {
  range: number[];
  country: string;
  region: string;
  eu: string;
  timezone: string;
  city: string;
  ll: [number, number];
  metro: number;
  area: number;
};
