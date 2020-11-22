import { Comment } from "./comment";
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
  likerProfiles?: Profile[];
  comments?: Comment[];
  [key: string]:
    | number
    | string
    | string[]
    | undefined
    | Comment[]
    | File
    | Profile
    | Profile[];
}
