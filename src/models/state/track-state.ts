import { LoadingState } from "./loading-state";
import { TrackError } from "../track-error";
import { Track } from "../track";

export interface TrackState {
  error?: TrackError;
  loading: LoadingState;
  tracks: Track[];
}
