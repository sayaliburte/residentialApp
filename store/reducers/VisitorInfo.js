import {
  ADD_VISITOR,
  FETCH_VISITORS,
  DELETE_VISITOR,
  ACCEPT_VISITOR,
} from "../actions/VisitorInfo";

const initialState = {
  visitors: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_VISITOR:
      return {
        ...state,
        visitors: state.visitors.concat(action.visitorData),
      };

    case FETCH_VISITORS: {
      return {
        ...state,
        visitors: action.visitors,
      };
    }

    case DELETE_VISITOR:
      return {
        ...state,
        visitors: state.visitors.map((comm) =>
          comm.key === action.key ? { ...comm, ...action.data } : comm
        ),
      };

    case ACCEPT_VISITOR: {
      return {
        ...state,
        visitors: state.visitors.map((v) =>
          v.key === action.key ? { ...v, ...action.data } : v
        ),
      };
    }
  }
  return state;
};
