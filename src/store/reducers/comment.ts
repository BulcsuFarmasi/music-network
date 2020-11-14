import { AddCommentErrorAction, CommentAction, AddCommentSuccessAction } from "../actions/creators/comment";
import { ADD_COMMENT_ERROR, ADD_COMMENT_START, ADD_COMMENT_SUCCESS } from "../actions/types/comment";
import { CommentState } from "../../models/state/comment-state";
import { updateObject } from "../../utils/object-utils";
import { Comment } from "../../models/comment";


const initialState:CommentState = {
    comments: []
}

const addCommentError = (state:CommentState, action:AddCommentErrorAction) => {
    return updateObject(state, {error: action.error});
}

const addCommentStart = (state:CommentState) => {
    return updateObject(state, {error: null});
}

const addCommentSuccess = (state:CommentState, action:AddCommentSuccessAction) => {
    const comments:Comment[] = [...state.comments];
    const updatedComments:Comment[] = comments.concat(action.comment);
    return updateObject(state, {comments: comments});
}



export const commmentReducer = (state:CommentState = initialState, action:CommentAction) {
    switch(action.type) {
        case ADD_COMMENT_ERROR:
            addCommentError(state, action as AddCommentErrorAction);
        case ADD_COMMENT_START:
            addCommentStart(state);
        case ADD_COMMENT_SUCCESS:
                addCommentSuccess(state, action as AddCommentSuccessAction);
        

    }
    return state;
}