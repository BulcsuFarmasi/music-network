import { File } from "./file";

export interface Track {
  id?: string;
  authorId?: string;
  creationTime?: number;
  name: string;
  file?: File;
  [key: string]: string | undefined | number | File;
}
