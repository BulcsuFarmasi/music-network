export interface Track {
  id?: string;
  authorId?: string;
  creationTime?: number;
  name: string;
  storagePath?: string;
  downloadUrl?: string;
  [key: string]: string | undefined | number;
}
