import { put } from "redux-saga/effects";

import {
  fetchProfileStart,
  FetchProfileAction,
  fetchProfileSuccess,
  fetchProfileError,
} from "../actions/creators/profile";
import { Profile } from "../../models/profile";
import { Http } from "../../utils/http";
import { ProfileErrorType } from "../../models/error/profile-error";

export function* fetchProfileSaga(action: FetchProfileAction) {
  yield put(fetchProfileStart());
  Http.setDatabaseUrl();

  try {
    const requests: Promise<Response>[] = action.profileIds.map((profileId) =>
      Http.get(`users/${profileId}.json?auth=${action.token}`)
    );

    const responses: Response[] = yield Promise.all(requests);
    const responseDataPromises = responses.map((response: Response) =>
      response.json()
    );
    const responseData: any[] = yield Promise.all(responseDataPromises);

    const profiles = new Map<string, Profile>();
    action.profileIds.forEach((profileId: string, index: number) => {
      profiles.set(profileId, {
        id: profileId,
        ...responseData[index],
      });
    });

    yield put(fetchProfileSuccess(profiles));
  } catch {
    yield put(
      fetchProfileError({
        type: ProfileErrorType.fetch,
        message: "Error during fetching the profiles",
      })
    );
  }
}
