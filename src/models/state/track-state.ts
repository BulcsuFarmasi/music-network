import { LoadingState } from "./loading-state";
import { Track } from "../track";

export interface TrackState {
  loading: LoadingState;
  tracks: Track[];
}
