import React, { FunctionComponent, useState } from "react";

import  AddComment  from "../AddComment/AddComment";

interface CommentListProps  {
  trackId:string
}

export const CommentList: FunctionComponent<CommentListProps> = (props:CommentListProps) => {

  const { trackId } = props;

  const [displayComments, setDisplayComments] = useState<boolean>(false);

  const toggleDisplayComments = () => {
    setDisplayComments(!displayComments);
  };

  const commentList = displayComments ? (
    <div>
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
