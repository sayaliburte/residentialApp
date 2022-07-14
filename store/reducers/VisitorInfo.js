import {
  ADD_VISITOR,
  FETCH_VISITORS,
  DELETE_VISITOR,
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
  }
  return state;
};
