import { CommentError } from "../error/comment-error";

export interface CommentState {
  comments: Comment[];
  error: CommentError;
}
