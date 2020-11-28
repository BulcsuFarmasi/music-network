import { File } from "./file";
import { Token } from "./token";

export interface User {
  id?: string;
  authId?: string;
  email?: string;
  password?: string;
  username?: string;
  profilePicture?: File;
  followers?:string[];
  followings?:string[];
  token?: Token;
  [key: string]: string | string[] | undefined | File | Token;
}
