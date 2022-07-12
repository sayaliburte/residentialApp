import {
  ADD_COMMUNICATION,
  FETCH_COMMUNICATION,
  DELETE_COMMUNICATION,
  ADD_COMMENTS,
  ADD_LIKE,
} from "../actions/communication";

const initialState = {
  communications: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMUNICATION:
      return {
        ...state,
        communications: state.communications.concat(action.communicationData),
      };

    case FETCH_COMMUNICATION:
      return {
        ...state,
        communications: action.communicationData,
      };

    case DELETE_COMMUNICATION:
      return {
        ...state,
        communications: state.communications.map((comm) =>
          comm.key === action.key ? { ...comm, ...action.data } : comm
        ),
      };
    case ADD_COMMENTS:
      return {
        ...state,
        communications: state.communications.map((comm) =>
          comm.key === action.key
            ? { ...comm, comments: action.comments }
            : comm
        ),
      };
    case ADD_LIKE:
      return {
        ...state,
        communications: state.communications.map((comm) =>
          comm.key === action.key ? { ...comm, like: action.like } : comm
        ),
      };
  }
  return state;
};
