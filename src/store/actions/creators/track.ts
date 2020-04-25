import { Track } from "../../reducers/track";
import { ADD_TRACK, DELETE_TRACK } from "../types/types";

export interface AddTrackAction {
  type: typeof ADD_TRACK;
  track: Track;
}

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  id: number;
}

export const addTrack = (track: Track): AddTrackAction => ({
  type: ADD_TRACK,
  track,
});

export const deleteTrack = (id: number): DeleteTrackAction => ({
  type: DELETE_TRACK,
  id,
});

export type TrackAction = AddTrackAction | DeleteTrackAction;
