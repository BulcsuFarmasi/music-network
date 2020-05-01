import { LoadingState } from "./loading-state";
import { Track } from "../track";

export interface TrackState {
  tracks: Track[];
  loading: LoadingState;
}
