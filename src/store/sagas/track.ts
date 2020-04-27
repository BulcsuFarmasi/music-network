import { put } from "redux-saga/effects";

import {
  AddTrackAction,
  FetchTrackAction,
  addTrackSuccess,
  fetchTrackSuccess,
} from "../actions/creators/track";
import { Track } from "../../models/track";
import { Http } from "../../utils/http";

export function* addTrackSaga(action: AddTrackAction) {
  const response: Response = yield Http.post(
    "tracks.json",
    JSON.stringify(action.track)
  );
  const responseData: any = yield response.json();
  const track: Track = {
    ...action.track,
    id: responseData.name,
  };
  yield put(addTrackSuccess(track));
}

export function* fetchTrackSaga(action: FetchTrackAction) {
  const response: Response = yield Http.get("tracks.json");
  const responseData: any = yield response.json();
  const tracks: Track[] = [];
  for (let key in responseData) {
    const track: Track = {
      ...responseData[key],
      id: key,
    };
    tracks.push(track);
  }

  yield put(fetchTrackSuccess(tracks));
}
