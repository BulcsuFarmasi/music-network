import { File } from "./file";

export interface Track {
  id?: string;
  authorId?: string;
  creationTime?: number;
  name?: string;
  file?: File;
  likers?: string[];
  [key: string]: string | string[] | undefined | number | File;
}
