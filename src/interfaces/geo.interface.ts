export interface Geo {
  _id: string;
  ip: string;
  country: string;
  region: string;
  timezone: string;
  city: string;
  ll: [number, number];
  area: number;
}
