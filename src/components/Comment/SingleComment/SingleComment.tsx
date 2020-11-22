import React, { FunctionComponent } from "react";

import { Comment } from "../../../models/comment";
import { formatEpochTime } from "../../../utils/date-time";

interface SingleCommentProps {
  comment: Comment;
}

export const SingleComment: FunctionComponent<SingleCommentProps> = (
  props: SingleCommentProps
) => {
  const { comment } = props;

  const creationText: string = formatEpochTime(comment.creationTime);
  return (
    <div className="comment">
      <p>{creationText}</p>
      <p>{comment.text}</p>
    </div>
  );
};
