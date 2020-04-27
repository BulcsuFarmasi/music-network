import { put } from "redux-saga/effects";

import { AddTrackAction, addTrackSuccess } from "../actions/creators/track";
import { Track } from "../../models/track";
import { Http } from "../../utils/http";

export function* addTrackSaga(action: AddTrackAction) {
  console.log(action);

  const response: Response = yield Http.post(
    "tracks.json",
    JSON.stringify(action.track)
  );
  const responseData = yield response.json();
  const track: Track = {
    ...action.track,
    id: responseData.name,
  };
  yield put(addTrackSuccess(track));
}
