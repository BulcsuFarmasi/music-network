import { AuthState } from "./auth-state";
import { ProfileState } from "./profile-state";
import { TrackState } from "./track-state";

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  track: TrackState;
}
