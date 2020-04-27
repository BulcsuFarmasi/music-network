import {
  DELETE_TRACK,
  ADD_TRACK_SUCCESS,
  FETCH_TRACK_SUCCESS,
} from "../actions/types/types";
import {
  TrackAction,
  AddTrackSuccessAction,
  DeleteTrackAction,
  FetchTrackSuccessAction,
} from "../actions/creators/track";
import { updateObject } from "../../utils/object-utils";
import { Track } from "../../models/track";
import { TrackState } from "../../models/state/track-state";

const initialState: TrackState = {
  tracks: [],
};

const addTrackSuccess = (
  state: TrackState,
  action: AddTrackSuccessAction
): TrackState => {
  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.concat(action.track);
  return updateObject(state, { tracks: updatedTracks });
};

const fetchTrackSuccess = (
  state: TrackState,
  action: FetchTrackSuccessAction
): TrackState => {
  return updateObject(state, { tracks: action.tracks });
};

const deleteTrack = (
  state: TrackState,
  action: DeleteTrackAction
): TrackState => {
  console.log(action.id);

  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.filter(
    (track: Track) => track.id !== action.id
  );
  console.log(updatedTracks);
  return updateObject(state, { tracks: updatedTracks });
};

const trackReducer = (
  state: TrackState = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case ADD_TRACK_SUCCESS:
      return addTrackSuccess(state, action);
    case FETCH_TRACK_SUCCESS:
      return fetchTrackSuccess(state, action);
    case DELETE_TRACK:
      return deleteTrack(state, action);
    default:
      return state;
  }
};

export default trackReducer;
