import { User } from "../user";

export interface AuthState {
  authed: boolean;
  loggedInUser?: User;
}
