import {
  ADD_TRACK,
  ADD_TRACK_ERROR,
  ADD_TRACK_START,
  ADD_TRACK_SUCCESS,
  CLEAR_TRACK_LOADING,
  DELETE_TRACK,
  DELETE_TRACK_ERROR,
  DELETE_TRACK_START,
  DELETE_TRACK_SUCCESS,
  FETCH_TRACK,
  FETCH_TRACK_ERROR,
  FETCH_TRACK_START,
  FETCH_TRACK_SUCCESS,
} from "../types/types";
import { Track } from "../../../models/track";
import { TrackError } from "../../../models/track-error";

export interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
  file?: File;
  fileName: string;
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

export interface ClearTrackLoading {
  type: typeof CLEAR_TRACK_LOADING;
}

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  track: Track;
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

export const addTrack = (
  track: Track,
  fileName: string,
  file?: File
): AddTrackAction => ({
  type: ADD_TRACK,
  track,
  file,
  fileName,
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

export const clearTrackLoading = (): ClearTrackLoading => ({
  type: CLEAR_TRACK_LOADING,
});

export const deleteTrack = (track: Track): DeleteTrackAction => ({
  type: DELETE_TRACK,
  track,
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

export const fetchTrack = (): FetchTrackAction => ({
  type: FETCH_TRACK,
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

export type TrackAction =
  | AddTrackAction
  | AddTrackErrorAction
  | AddTrackStartAction
  | AddTrackSuccessAction
  | ClearTrackLoading
  | DeleteTrackAction
  | DeleteTrackErrorAction
  | DeleteTrackStartAction
  | DeleteTrackSuccessAction
  | FetchTrackAction
  | FetchTrackErrorAction
  | FetchTrackStartAction
  | FetchTrackSuccessAction;
