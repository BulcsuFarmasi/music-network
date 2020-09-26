enum CommentErrorType {
  add,
  fetch,
}

export interface CommentError {
  errorType: CommentErrorType;
  message: string;
}
