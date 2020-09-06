import { File } from "./file";
import { Profile } from "./profile";

export interface Track {
  id?: string;
  authorId?: string;
  author?: Profile;
  creationTime?: number;
  name?: string;
  file?: File;
  likers?: string[];
  [key: string]: string | string[] | undefined | number | File | Profile;
}
