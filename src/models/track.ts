export interface Track {
  id?: string;
  creationTime?: number;
  name: string;
  storagePath?: string;
  downloadUrl?: string;
  [key: string]: string | undefined | number;
}
