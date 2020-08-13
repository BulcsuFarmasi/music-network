import { File } from "./file";

export interface User {
  id?: string;
  authId?: string;
  email?: string;
  password?: string;
  username?: string;
  profilePicture?: File;
  [key: string]: string | undefined | File;
}
