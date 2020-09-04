import { LoadingState } from "./loading-state";
import { Profile } from "../profile";
import { ProfileError } from "../error/profile-error";

export interface ProfileState {
  profiles: Map<string, Profile>;
  loading: LoadingState;
  error?: ProfileError;
}
