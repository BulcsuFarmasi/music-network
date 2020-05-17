import { AuthState } from "./auth-state";
import { TrackState } from "./track-state";

export interface AppState {
  auth: AuthState;
  track: TrackState;
}
