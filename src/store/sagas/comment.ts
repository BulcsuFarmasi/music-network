import { put } from "redux-saga/effects";


import { AddCommentAction, FetchCommentAction, addCommentError, addCommentStart, addCommentSuccess, fetchCommentStart, fetchCommentError, fetchCommentSuccess } from "../actions/creators/comment";
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

  export function* fetchCommentSaga(action: FetchCommentAction) {
    yield put(fetchCommentStart());
    Http.setDatabaseUrl();
  
    try {
      const requests: Promise<Response>[] = action.trackIds.map((trackId) =>
        Http.get(`tracks.json?orderBy="authorId"&equalTo="${trackId}"&auth=${action.token}`)
      );
  
      const responses: Response[] = yield Promise.all(requests);
      const responseDataPromises = responses.map((response: Response) =>
        response.json()
      );
      const responseData: any[] = yield Promise.all(responseDataPromises);
  
      const comments:Comment[] = [];

      for (let key in responseData) {
        const track: Comment = {
          ...responseData[key],
          id: key,
        };
        comments.push(track);
      }

  
      yield put(fetchCommentSuccess(comments));
    } catch {
      yield put(
        fetchCommentError({
          type: CommentErrorType.fetch,
          message: "Error during fetching the profiles",
        })
      );
    }
  }
  

