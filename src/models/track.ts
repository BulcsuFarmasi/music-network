export interface Track {
  id?: string;
  creationTime?: number;
  name: string;
  path?: string;
  url?: string;
  [key: string]: string | undefined | number;
}
