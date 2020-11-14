import { AuthState } from "./auth-state";
import { CommentState } from "./comment-state";
import { ProfileState } from "./profile-state";
import { TrackState } from "./track-state";

export interface AppState {
  auth: AuthState;
  comment:CommentState;
  profile: ProfileState;
  track: TrackState;
}
