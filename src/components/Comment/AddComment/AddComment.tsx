import React, { ChangeEvent, FunctionComponent } from "react";

export const AddComment: FunctionComponent = () => {

  const saveComment = (event:ChangeEvent<HTMLTextAreaElement>) {

  }

  return (
    <div>
      <textarea placeholder="Write something" onChange={saveComment} />
    </div>
  );
};
