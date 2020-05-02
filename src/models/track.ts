export interface Track {
  id?: string;
  creationTime?: number;
  name: string;
  path?: string;
  [key: string]: string | undefined | number;
}
