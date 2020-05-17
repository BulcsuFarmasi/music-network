import { LoadingState } from "./loading-state";
import { User } from "../user";

export interface AuthState {
  authed: boolean;
  loading: LoadingState;
  loggedInUser?: User;
}
