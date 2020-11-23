import {
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_START,
  ADD_COMMENT_SUCCESS,
  FETCH_COMMENT,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_START,
  FETCH_COMMENT_SUCCESS,
  UPDATE_COMMENT,
} from "../types/comment";

import { Comment } from "../../../models/comment";
import { CommentError } from "../../../models/error/comment-error";

export interface AddCommentAction {
  type: typeof ADD_COMMENT;
  comment: Comment;
  token: string;
}

export interface AddCommentErrorAction {
  type: typeof ADD_COMMENT_ERROR;
  error: CommentError;
}

export interface AddCommentStartAction {
  type: typeof ADD_COMMENT_START;
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  comment: Comment;
}

export interface FetchCommentAction {
  type: typeof FETCH_COMMENT;
  trackIds: string[];
  token: string;
}

export interface FetchCommentErrorAction {
  type: typeof ADD_COMMENT_ERROR;
  error: CommentError;
}

export interface FetchCommentStartAction {
  type: typeof FETCH_COMMENT_START;
}

export interface FetchCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  comments: Comment[];
}

export interface UpdateCommentAction {
  type: typeof UPDATE_COMMENT;
  comments: Comment[];
}
export const addComment = (
  comment: Comment,
  token: string
): AddCommentAction => ({
  type: ADD_COMMENT,
  comment,
  token,
});

export const addCommentError = (
  error: CommentError
): AddCommentErrorAction => ({
  type: ADD_COMMENT_ERROR,
  error,
});

export const addCommentStart = (): AddCommentStartAction => ({
  type: ADD_COMMENT_START,
});

export const addCommentSuccess = (
  comment: Comment
): AddCommentSuccessAction => ({
  type: ADD_COMMENT_SUCCESS,
  comment,
});

export const fetchComment = (
    trackIds:string[],
    token: string
  ): FetchCommentAction => ({
    type: FETCH_COMMENT,
    trackIds,
    token,
  });
  
  export const fetchCommentError = (
    error: CommentError
  ): FetchCommentErrorAction => ({
    type: FETCH_COMMENT_ERROR,
    error,
  });
  
  export const fetchCommentStart = (): FetchCommentStartAction => ({
    type: FETCH_COMMENT_START,
  });
  
  export const fetchCommentSuccess = (
    comments: Comment[]
  ): FetchCommentSuccessAction => ({
    type: FETCH_COMMENT_SUCCESS,
    comments,
  });

  export const updateComment = (
    comments: Comment[]
  ): UpdateCommentAction => ({
    type: UPDATE_COMMENT,
    comments,
  });

export type CommentAction =
  | AddCommentAction
  | AddCommentErrorAction
  | AddCommentStartAction
  | AddCommentSuccessAction
  | FetchCommentAction
  | FetchCommentErrorAction
  | FetchCommentStartAction
  | FetchCommentSuccessAction
  | UpdateCommentAction
