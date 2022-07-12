import { ADD_VISITOR } from "../actions/VisitorInfo";

const initialState = {
  visitors: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBERS:
      return {
        ...state,
        visitors: state.visitors.concat(action.visitorData),
      };
  }
  return state;
};
