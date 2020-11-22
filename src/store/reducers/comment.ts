import {
  AddCommentErrorAction,
  CommentAction,
  AddCommentSuccessAction,
  FetchCommentErrorAction,
  FetchCommentSuccessAction,
} from "../actions/creators/comment";
import {
  ADD_COMMENT_ERROR,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_START,
  FETCH_COMMENT_SUCCESS,
} from "../actions/types/comment";
import { CommentState } from "../../models/state/comment-state";
import { LoadingState } from "../../models/state/loading-state";
import { updateObject } from "../../utils/object-utils";
import { Comment } from "../../models/comment";


const initialState: CommentState = {
  comments: [],
  loading: LoadingState.initial
};

const addCommentError = (
  state: CommentState,
  action: AddCommentErrorAction
) => {
  return updateObject(state, { error: action.error, loading: LoadingState.completed });
};

const addCommentStart = (state: CommentState) => {
  return updateObject(state, { error: null, loading: LoadingState.onGoing });
};

const addCommentSuccess = (
  state: CommentState,
  action: AddCommentSuccessAction
) => {
  const comments: Comment[] = [...state.comments];
  const updatedComments: Comment[] = comments.concat(action.comment);
  return updateObject(state, { comments: updatedComments, loading: LoadingState.completed });
};

const fetchCommentError = (
  state: CommentState,
  action: FetchCommentErrorAction
) => {
  return updateObject(state, { error: action.error });
};

const fetchCommentStart = (state: CommentState) => {
  return updateObject(state, { error: null, loading: LoadingState.onGoing });
};

const fetchCommentSuccess = (
  state: CommentState,
  action: FetchCommentSuccessAction
) => {
   const comments:Comment[] = [...state.comments];
   const updatedComments:Comment[] = comments.concat(action.comments) 
  return updateObject(state, { comments: updatedComments, loading: LoadingState.completed });
};

export const commmentReducer = (
  state: CommentState = initialState,
  action: CommentAction
) => {
  switch (action.type) {
    case ADD_COMMENT_ERROR:
      return addCommentError(state, action as AddCommentErrorAction);
    case ADD_COMMENT_START:
      return addCommentStart(state);
    case ADD_COMMENT_SUCCESS:
      return addCommentSuccess(state, action as AddCommentSuccessAction);
    case FETCH_COMMENT_ERROR:
      return fetchCommentError(state, action as FetchCommentErrorAction);
    case FETCH_COMMENT_START:
      return fetchCommentStart(state);
    case FETCH_COMMENT_SUCCESS:
      return fetchCommentSuccess(state, action as FetchCommentSuccessAction);
  }
  return state;
};
