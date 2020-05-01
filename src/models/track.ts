export interface Track {
  id?: string;
  creationTime?: number;
  name: string;
  [key: string]: string | undefined | number;
}
