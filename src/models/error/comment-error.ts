export enum CommentErrorType {
  add,
  fetch,
}

export interface CommentError {
  type: CommentErrorType;
  message: string;
}
