import { put } from "redux-saga/effects";


import { AddCommentAction, addCommentError, addCommentStart, addCommentSuccess } from "../actions/creators/comment";
import { Comment } from "../../models/comment";
import { CommentErrorType } from "../../models/error/comment-error";
import { Http } from "../../utils/http";

export function* addCommentSaga(action: AddCommentAction) {
    yield put(addCommentStart());
    try {
      Http.setDatabaseUrl();
      const response: Response = yield Http.post(
        `comments.json?auth=${action.token}`,
        JSON.stringify(action.comment)
      );
      const responseData: any = yield response.json();
      const track: Comment = {
        ...action.comment,
        id: responseData.name,
      };
      yield put(addCommentSuccess(track));
    } catch {
      yield put(
        addCommentError({
          type: CommentErrorType.add,
          message: "Error during adding the commmet",
        })
      );
    }
  }