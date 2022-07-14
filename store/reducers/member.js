import { ADD_MEMBERS, UPDATE_HOMESTATUS, LOGOUT } from "../actions/member";
import { FETCH_MEMBERS } from "../actions/member";
import { UPDATE_MEMBERS } from "../actions/member";
const initialState = {
  members: [],
  loggedInMember: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMBERS:
      return {
        ...state,
        members: state.members.concat(action.memberData),
        loggedInMember: action.memberData,
      };
    case FETCH_MEMBERS:
      return {
        ...state,
        members: action.members,
        loggedInMember: action.loggedInUser,
      };
    case UPDATE_MEMBERS:
      return {
        ...state,
        members: state.members.map((member, index) =>
          index === action.index ? { ...member, ...action.data } : member
        ),
        loggedInMember: { ...state.loggedInMember, ...action.data },
      };

    case UPDATE_HOMESTATUS:
      return {
        ...state,
        members: state.members.map((member) =>
          member.key === action.key ? { ...member, ...action.data } : member
        ),
        loggedInMember: { ...state.loggedInMember, ...action.data },
      };
    case LOGOUT:
      return {
        ...state,
        loggedInMember: null,
      };
  } 
  return state;
};
