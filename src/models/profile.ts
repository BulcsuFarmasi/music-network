import { File } from "./file";

export interface Profile {
  id?: string;
  username?: string;
  profilePicture?: File;
  [key: string]: string | undefined | File;
}
