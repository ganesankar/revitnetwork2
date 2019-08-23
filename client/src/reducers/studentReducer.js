import { FETCH_STUDENTS, FETCH_STUDENT, ERROR_STUDENT } from "../actions/Types";

const initialState = {
  students: [],
  student: {},
  studentUpdateError: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
      case FETCH_STUDENT:
      return {
        ...state,
        student: action.payload
      };
      case ERROR_STUDENT:
      return {
        ...state,
        studentUpdateError: action.payload
      };
    default:
      return state;
  }
}
