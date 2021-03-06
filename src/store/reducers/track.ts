import {
  AddTrackErrorAction,
  AddTrackSuccessAction,
  DeleteTrackErrorAction,
  DeleteTrackSuccessAction,
  FetchTrackErrorAction,
  FetchTrackSuccessAction,
  UpdateTrackErrorAction,
  UpdateTrackSuccessAction,
  TrackAction,
} from "../actions/creators/track";
import {
  ADD_TRACK_ERROR,
  ADD_TRACK_START,
  ADD_TRACK_SUCCESS,
  CLEAR_TRACK_ERROR,
  CLEAR_TRACK_LOADING,
  DELETE_TRACK_ERROR,
  DELETE_TRACK_START,
  DELETE_TRACK_SUCCESS,
  FETCH_TRACK_ERROR,
  FETCH_TRACK_START,
  FETCH_TRACK_SUCCESS,
  UPDATE_TRACK_ERROR,
  UPDATE_TRACK_START,
  UPDATE_TRACK_SUCCESS,
} from "../actions/types/track";
import { Track } from "../../models/track";
import { LoadingState } from "../../models/state/loading-state";
import { TrackState } from "../../models/state/track-state";
import { updateObject } from "../../utils/object-utils";

const initialState: TrackState = {
  tracks: [],
  loading: LoadingState.initial,
};

const addTrackError = (state: TrackState, action: AddTrackErrorAction) => {
  return updateObject(state, {
    error: action.error,
    loading: LoadingState.completed,
  });
};

const addTrackSuccess = (
  state: TrackState,
  action: AddTrackSuccessAction
): TrackState => {
  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.concat(action.track);
  return updateObject(state, {
    tracks: updatedTracks,
    loading: LoadingState.completed,
  });
};

const clearTrackError = (state: TrackState): TrackState => {
  return updateObject(state, { error: undefined });
};

const clearTrackLoading = (state: TrackState): TrackState => {
  return updateObject(state, { loading: LoadingState.initial });
};

const deleteTrackError = (
  state: TrackState,
  action: DeleteTrackErrorAction
) => {
  return updateObject(state, {
    error: action.error,
    loading: LoadingState.completed,
  });
};

const deleteTrackSuccess = (
  state: TrackState,
  action: DeleteTrackSuccessAction
): TrackState => {
  const tracks: Track[] = [...state.tracks];
  const updatedTracks: Track[] = tracks.filter(
    (track: Track) => track.id !== action.id
  );
  return updateObject(state, {
    tracks: updatedTracks,
    loading: LoadingState.completed,
  });
};

const fetchTrackError = (state: TrackState, action: FetchTrackErrorAction) => {
  return updateObject(state, {
    error: action.error,
    loading: LoadingState.completed,
  });
};

const fetchTrackSuccess = (
  state: TrackState,
  action: FetchTrackSuccessAction
): TrackState => {
  return updateObject(state, {
    tracks: action.tracks,
    loading: LoadingState.completed,
  });
};

const updateTrackError = (
  state: TrackState,
  action: UpdateTrackErrorAction
) => {
  return updateObject(state, {
    error: action.error,
    loading: LoadingState.completed,
  });
};

const updateTrackSuccess = (
  state: TrackState,
  action: UpdateTrackSuccessAction
): TrackState => {
  const updateTracks = [...state.tracks];
  const trackIndex = updateTracks.findIndex(
    (track: Track) => track.id === action.track.id
  );
  const updateTrack = updateObject(updateTracks[trackIndex], action.track);

  updateTracks[trackIndex] = updateTrack;

  return updateObject(state, {
    tracks: updateTracks,
    loading: LoadingState.completed,
  });
};

const startLoading = (state: TrackState): TrackState => {
  return updateObject(state, {
    error: undefined,
    loading: LoadingState.onGoing,
  });
};

export const trackReducer = (
  state: TrackState = initialState,
  action: TrackAction
): TrackState => {
  switch (action.type) {
    case ADD_TRACK_ERROR:
      return addTrackError(state, action as AddTrackErrorAction);
    case ADD_TRACK_START:
      return startLoading(state);
    case ADD_TRACK_SUCCESS:
      return addTrackSuccess(state, action as AddTrackSuccessAction);
    case CLEAR_TRACK_ERROR:
      return clearTrackError(state);
    case CLEAR_TRACK_LOADING:
      return clearTrackLoading(state);
    case DELETE_TRACK_ERROR:
      return deleteTrackError(state, action as DeleteTrackErrorAction);
    case DELETE_TRACK_START:
      return startLoading(state);
    case DELETE_TRACK_SUCCESS:
      return deleteTrackSuccess(state, action);
    case FETCH_TRACK_ERROR:
      return fetchTrackError(state, action as FetchTrackErrorAction);
    case FETCH_TRACK_START:
      return startLoading(state);
    case FETCH_TRACK_SUCCESS:
      return fetchTrackSuccess(state, action as FetchTrackSuccessAction);
    case UPDATE_TRACK_ERROR:
      return updateTrackError(state, action as UpdateTrackErrorAction);
    case UPDATE_TRACK_START:
      return startLoading(state);
    case UPDATE_TRACK_SUCCESS:
      return updateTrackSuccess(state, action as UpdateTrackSuccessAction);
    default:
      return state;
  }
};
