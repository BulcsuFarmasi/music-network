import { File } from "./file";

export interface Profile {
  id?: string;
  username?: string;
  profilePicture?: File;
  followers?:string[];
  followings?:string[];
  [key: string]: string | string [] | undefined | File;
}
