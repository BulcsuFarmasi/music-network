import { Comment } from "../comment";
import { CommentError } from "../error/comment-error";
import { LoadingState } from "./loading-state";

export interface CommentState {
  comments: Comment[];
  error?: CommentError;
  loading:LoadingState
}
