import {
  ADD_TRACK,
  ADD_TRACK_ERROR,
  ADD_TRACK_START,
  ADD_TRACK_SUCCESS,
  CLEAR_TRACK_ERROR,
  CLEAR_TRACK_LOADING,
  DELETE_TRACK,
  DELETE_TRACK_ERROR,
  DELETE_TRACK_START,
  DELETE_TRACK_SUCCESS,
  FETCH_TRACK,
  FETCH_TRACK_ERROR,
  FETCH_TRACK_START,
  FETCH_TRACK_SUCCESS,
  UPDATE_TRACK,
  UPDATE_TRACK_ERROR,
  UPDATE_TRACK_START,
  UPDATE_TRACK_SUCCESS,
} from "../types/track";
import { Track } from "../../../models/track";
import { TrackError } from "../../../models/error/track-error";

export interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
  file?: File;
  fileName: string;
  token: string;
}

export interface AddTrackErrorAction {
  type: typeof ADD_TRACK_ERROR;
  error: TrackError;
}

export interface AddTrackStartAction {
  type: typeof ADD_TRACK_START;
}

export interface AddTrackSuccessAction {
  type: typeof ADD_TRACK_SUCCESS;
  track: Track;
}

export interface ClearTrackErrorAction {
  type: typeof CLEAR_TRACK_ERROR;
}

export interface ClearTrackLoadingAction {
  type: typeof CLEAR_TRACK_LOADING;
}

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  track: Track;
  token: string;
}

export interface DeleteTrackErrorAction {
  type: typeof DELETE_TRACK_ERROR;
  error: TrackError;
}

export interface DeleteTrackStartAction {
  type: typeof DELETE_TRACK_START;
  id?: string;
}

export interface DeleteTrackSuccessAction {
  type: typeof DELETE_TRACK_SUCCESS;
  id?: string;
}

export interface FetchTrackAction {
  type: typeof FETCH_TRACK;
  userId?: string;
  token: string;
}

export interface FetchTrackErrorAction {
  type: typeof FETCH_TRACK_ERROR;
  error: TrackError;
}

export interface FetchTrackStartAction {
  type: typeof FETCH_TRACK_START;
}

export interface FetchTrackSuccessAction {
  type: typeof FETCH_TRACK_SUCCESS;
  tracks: Track[];
}

export interface UpdateTrackAction {
  type: typeof UPDATE_TRACK;
  track: Track;
  token: string;
}

export interface UpdateTrackErrorAction {
  type: typeof UPDATE_TRACK_ERROR;
  error: TrackError;
}

export interface UpdateTrackStartAction {
  type: typeof UPDATE_TRACK_START;
}

export interface UpdateTrackSuccessAction {
  type: typeof UPDATE_TRACK_SUCCESS;
  track: Track;
}

export const addTrack = (
  track: Track,
  fileName: string,
  token: string,
  file?: File
): AddTrackAction => ({
  type: ADD_TRACK,
  track,
  file,
  fileName,
  token,
});

export const addTrackError = (error: TrackError): AddTrackErrorAction => ({
  type: ADD_TRACK_ERROR,
  error,
});

export const addTrackStart = (): AddTrackStartAction => ({
  type: ADD_TRACK_START,
});

export const addTrackSuccess = (track: Track): AddTrackSuccessAction => ({
  type: ADD_TRACK_SUCCESS,
  track,
});

export const clearTrackError = (): ClearTrackErrorAction => ({
  type: CLEAR_TRACK_ERROR,
});

export const clearTrackLoading = (): ClearTrackLoadingAction => ({
  type: CLEAR_TRACK_LOADING,
});

export const deleteTrack = (
  track: Track,
  token: string
): DeleteTrackAction => ({
  type: DELETE_TRACK,
  track,
  token,
});

export const deleteTrackError = (
  error: TrackError
): DeleteTrackErrorAction => ({
  type: DELETE_TRACK_ERROR,
  error,
});

export const deleteTrackStart = (): DeleteTrackStartAction => ({
  type: DELETE_TRACK_START,
});

export const deleteTrackSuccess = (id?: string): DeleteTrackSuccessAction => ({
  type: DELETE_TRACK_SUCCESS,
  id,
});

export const fetchTrack = (
  token: string,
  userId?: string
): FetchTrackAction => ({
  type: FETCH_TRACK,
  userId,
  token,
});

export const fetchTrackError = (error: TrackError): FetchTrackErrorAction => ({
  type: FETCH_TRACK_ERROR,
  error,
});

export const fetchTrackStart = (): FetchTrackStartAction => ({
  type: FETCH_TRACK_START,
});

export const fetchTrackSuccess = (
  tracks: Track[]
): FetchTrackSuccessAction => ({
  type: FETCH_TRACK_SUCCESS,
  tracks,
});

export const updateTrack = (
  token: string,
  track: Track
): UpdateTrackAction => ({
  type: UPDATE_TRACK,
  track,
  token,
});

export const updateTrackError = (
  error: TrackError
): UpdateTrackErrorAction => ({
  type: UPDATE_TRACK_ERROR,
  error,
});

export const updateTrackStart = (): UpdateTrackStartAction => ({
  type: UPDATE_TRACK_START,
});

export const updateTrackSuccess = (track: Track): UpdateTrackSuccessAction => ({
  type: UPDATE_TRACK_SUCCESS,
  track,
});

export type TrackAction =
  | AddTrackAction
  | AddTrackErrorAction
  | AddTrackStartAction
  | AddTrackSuccessAction
  | ClearTrackErrorAction
  | ClearTrackLoadingAction
  | DeleteTrackAction
  | DeleteTrackErrorAction
  | DeleteTrackStartAction
  | DeleteTrackSuccessAction
  | FetchTrackAction
  | FetchTrackErrorAction
  | FetchTrackStartAction
  | FetchTrackSuccessAction
  | UpdateTrackAction
  | UpdateTrackErrorAction
  | UpdateTrackStartAction
  | UpdateTrackSuccessAction;
