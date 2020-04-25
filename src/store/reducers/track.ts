import { ADD_TRACK, DELETE_TRACK } from "../actions/types/types";
import {
  TrackAction,
  AddTrackAction,
  DeleteTrackAction,
} from "../actions/creators/track";
import { updateObject } from "../../utils/object-utils";

export interface Track {
  id: number;
  name: string;
  [key: string]: number | string;
}

export interface TrackState {
  tracks: Track[];
}

const initialState: TrackState = {
  tracks: [],
};

const addTrack = (state: TrackState, action: AddTrackAction): TrackState => {
  console.log(state);
  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.concat(action.track);
  return updateObject(state, { tracks: updatedTracks });
};

const deleteTrack = (
  state: TrackState,
  action: DeleteTrackAction
): TrackState => {
  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.filter(
    (track: Track) => track.id !== action.id
  );
  return updateObject(state, updatedTracks);
};

const trackReducer = (
  state: TrackState = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case ADD_TRACK:
      return addTrack(state, action);
    case DELETE_TRACK:
      return deleteTrack(state, action);
    default:
      return state;
  }
};

export default trackReducer;
