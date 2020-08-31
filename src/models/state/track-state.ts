import { LoadingState } from "./loading-state";
import { TrackError } from "../error/track-error";
import { Track } from "../track";

export interface TrackState {
  error?: TrackError;
  loading: LoadingState;
  tracks: Track[];
}
