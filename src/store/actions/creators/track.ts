import {
  ADD_TRACK,
  ADD_TRACK_START,
  ADD_TRACK_SUCCESS,
  CLEAR_TRACK_LOADING,
  DELETE_TRACK,
  DELETE_TRACK_START,
  DELETE_TRACK_SUCCESS,
  FETCH_TRACK,
  FETCH_TRACK_START,
  FETCH_TRACK_SUCCESS,
} from "../types/types";
import { Track } from "../../../models/track";

export interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
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

export interface FetchTrackAction {
  type: typeof FETCH_TRACK;
}

export interface FetchTrackStartAction {
  type: typeof FETCH_TRACK_START;
}

export interface FetchTrackSuccessAction {
  type: typeof FETCH_TRACK_SUCCESS;
  tracks: Track[];
}

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  id?: string;
}

export interface DeleteTrackStartAction {
  type: typeof DELETE_TRACK_START;
  id?: string;
}

export interface DeleteTrackSuccessAction {
  type: typeof DELETE_TRACK_SUCCESS;
  id?: string;
}

export const addTrack = (track: Track): AddTrackAction => ({
  type: ADD_TRACK,
  track,
});

export const addTrackStart = (): AddTrackStartAction => ({
  type: ADD_TRACK_START,
});

export const addTrackSuccess = (track: Track): AddTrackSuccessAction => ({
  type: ADD_TRACK_SUCCESS,
  track,
});

export const deleteTrack = (id?: string): DeleteTrackAction => ({
  type: DELETE_TRACK,
  id,
});

export const clearTrackLoading = (): ClearTrackLoading => ({
  type: CLEAR_TRACK_LOADING,
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
  | AddTrackStartAction
  | AddTrackSuccessAction
  | ClearTrackLoading
  | DeleteTrackAction
  | DeleteTrackStartAction
  | DeleteTrackSuccessAction
  | FetchTrackAction
  | FetchTrackStartAction
  | FetchTrackSuccessAction;
