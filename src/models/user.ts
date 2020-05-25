export interface User {
  id?: string;
  authId?: string;
  email: string;
  password: string;
  username?: string;
  [key: string]: string | undefined;
}
