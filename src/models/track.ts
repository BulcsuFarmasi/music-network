export interface Track {
  id?: string;
  name: string;
  creationTime?: number;
  [key: string]: string | undefined | number;
}
