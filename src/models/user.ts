import { File } from "./file";
import { Token } from "./token";

export interface User {
  id?: string;
  authId?: string;
  email?: string;
  password?: string;
  username?: string;
  profilePicture?: File;
  token?: Token;
  [key: string]: string | undefined | File | Token;
}
