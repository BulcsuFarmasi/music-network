import React, { FunctionComponent, useState } from "react";

import  AddComment  from "../AddComment/AddComment";
import { SingleComment } from "../SingleComment/SingleComment";
import { Comment } from "../../../models/comment";

interface CommentListProps  {
  comments?:Comment[]
  trackId:string
}

export const CommentList: FunctionComponent<CommentListProps> = (props:CommentListProps) => {

  const { comments, trackId } = props;

  const [displayComments, setDisplayComments] = useState<boolean>(false);

  const toggleDisplayComments = () => {
    setDisplayComments(!displayComments);
  };

  const commentList = displayComments ? (
    <div>
      {comments?.map((comment:Comment) => <SingleComment comment={comment} key={comment.id}></SingleComment>)}
      <AddComment trackId={trackId}></AddComment>
    </div>
  ) : null;

  return (
    <div>
      <p onClick={toggleDisplayComments}>Comments</p>
      {commentList}
    </div>
  );
};
