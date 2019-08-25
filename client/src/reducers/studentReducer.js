import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_FAILED,
  FETCH_STUDENTS_LOADING,
  FETCH_STUDENT,
  FETCH_STUDENT_LOADING,
  FETCH_STUDENT_FAILED,
  ERROR_STUDENT,
  MODIFY_STUDENT_SUCCESS,
  MODIFY_STUDENT_FAILED
} from "../actions/Types";

const initialState = {
  students: [],
  getStudentsLoading:false,
  getStudentsFailed: false,
  student: {},
  getStudentFailed: false,
  getStudentLoading: false,
  studentUpdateError: {},
  studentUpdateSuccess: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS:
      return {
        ...state,
        students: action.payload
      };
      case FETCH_STUDENTS_LOADING:
      return {
        ...state,
        getStudentsLoading: action.payload
      };
      case FETCH_STUDENTS_FAILED:
      return {
        ...state,
        getStudentsFailed: action.payload
      };
    case FETCH_STUDENT:
      return {
        ...state,
        student: action.payload
      };
      case FETCH_STUDENT_FAILED:
      return {
        ...state,
        getStudentFailed: action.payload
      };
      case FETCH_STUDENT_LOADING:
      return {
        ...state,
        getStudentLoading: action.payload
      };
    case MODIFY_STUDENT_SUCCESS:
      return {
        ...state,
        studentUpdateSuccess: action.payload
      };
    case MODIFY_STUDENT_FAILED:
      return {
        ...state,
        studentUpdateError: action.payload
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
