import {
  FETCH_STAFFS,
  FETCH_STAFFS_FAILED,
  FETCH_STAFFS_LOADING,
  FETCH_STAFF,
  FETCH_STAFF_LOADING,
  FETCH_STAFF_FAILED,
  ERROR_STAFF,
  MODIFY_STAFF_SUCCESS,
  MODIFY_STAFF_FAILED
} from "../actions/Types";

const initialState = {
  staffs: [],
  getStaffsLoading:false,
  getStaffsFailed: false,
  staff: {},
  getStaffFailed: false,
  getStaffLoading: false,
  staffUpdateError: {},
  staffUpdateSuccess: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_STAFFS:
      return {
        ...state,
        staffs: action.payload
      };
      case FETCH_STAFFS_LOADING:
      return {
        ...state,
        getStaffsLoading: action.payload
      };
      case FETCH_STAFFS_FAILED:
      return {
        ...state,
        getStaffsFailed: action.payload
      };
    case FETCH_STAFF:
      return {
        ...state,
        staff: action.payload
      };
      case FETCH_STAFF_FAILED:
      return {
        ...state,
        getStaffFailed: action.payload
      };
      case FETCH_STAFF_LOADING:
      return {
        ...state,
        getStaffLoading: action.payload
      };
    case MODIFY_STAFF_SUCCESS:
      return {
        ...state,
        staffUpdateSuccess: action.payload
      };
    case MODIFY_STAFF_FAILED:
      return {
        ...state,
        staffUpdateError: action.payload
      };
    case ERROR_STAFF:
      return {
        ...state,
        staffUpdateError: action.payload
      };
    default:
      return state;
  }
}
