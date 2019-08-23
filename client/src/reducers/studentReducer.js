import { FETCH_STUDENTS } from "../actions/Types";

const initialState = {
  students: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
    default:
      return state;
  }
}
