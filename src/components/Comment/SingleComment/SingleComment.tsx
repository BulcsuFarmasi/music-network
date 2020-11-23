import React, { FunctionComponent } from "react";

import { Comment } from "../../../models/comment";
import { formatEpochTime } from "../../../utils/date-time";
import { MiniProfile } from "../../Profile/MiniProfile/MiniProfile";

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
      <MiniProfile profile={comment.authorProfile ?? {}}></MiniProfile>
      <p>{creationText}</p>
      <p>{comment.text}</p>
    </div>
  );
};
