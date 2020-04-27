import { Track } from "../../../models/track";
import {
  ADD_TRACK,
  ADD_TRACK_SUCCESS,
  FETCH_TRACK,
  FETCH_TRACK_SUCCESS,
  DELETE_TRACK,
} from "../types/types";

export interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
}

export interface AddTrackSuccessAction {
  type: typeof ADD_TRACK_SUCCESS;
  track: Track;
}

export interface FetchTrackAction {
  type: typeof FETCH_TRACK;
}

export interface FetchTrackSuccessAction {
  type: typeof FETCH_TRACK_SUCCESS;
  tracks: Track[];
}

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  id?: string;
}

export const addTrack = (track: Track): AddTrackAction => ({
  type: ADD_TRACK,
  track,
});

export const addTrackSuccess = (track: Track): AddTrackSuccessAction => ({
  type: ADD_TRACK_SUCCESS,
  track,
});

export const fetchTrack = (): FetchTrackAction => ({
  type: FETCH_TRACK,
});

export const fetchTrackSuccess = (
  tracks: Track[]
): FetchTrackSuccessAction => ({
  type: FETCH_TRACK_SUCCESS,
  tracks,
});

export const deleteTrack = (id?: string): DeleteTrackAction => ({
  type: DELETE_TRACK,
  id,
});

export type TrackAction =
  | AddTrackAction
  | AddTrackSuccessAction
  | DeleteTrackAction
  | FetchTrackAction
  | FetchTrackSuccessAction;
