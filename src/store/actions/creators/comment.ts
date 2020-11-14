import { ADD_COMMENT, ADD_COMMENT_ERROR, ADD_COMMENT_START, ADD_COMMENT_SUCCESS } from '../types/comment';

import { Comment } from '../../../models/comment';
import { CommentError } from '../../../models/error/comment-error';
import { CommentList } from '../../../components/Comment/CommentList/CommentList';

export interface AddCommentAction {
    type: typeof ADD_COMMENT;
    comment:Comment;
    token:string
}

export interface AddCommentErrorAction {
    type: typeof ADD_COMMENT_ERROR;
    error: CommentError;
}

export interface AddCommentStartAction {
    type: typeof ADD_COMMENT_START
}

export interface AddCommentSuccesAction {
    type: typeof ADD_COMMENT_SUCCESS;
    comment: Comment;
}

export const addComment = (comment:Comment, token:string) : AddCommentAction => ({
    type: ADD_COMMENT,
    comment,
    token
});

export const addCommentError = (error:CommentError) : AddCommentErrorAction => ({
    type: ADD_COMMENT_ERROR,
    error
});


export const addCommentStart = () : AddCommentStartAction => ({
    type: ADD_COMMENT_START
});


export const addCommentSuccess = (comment:Comment) : AddCommentSuccessAction => ({
    type: ADD_COMMENT_ERROR,
    comment
});





export type CommentAction = AddCommentAction | AddCommentErrorAction | AddCommentStartAction | AddCommentSuccesAction;