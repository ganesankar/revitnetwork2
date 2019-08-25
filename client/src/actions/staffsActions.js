import axios from "axios";
import {
  FETCH_STAFFS,
  FETCH_STAFFS_LOADING,
  FETCH_STAFFS_FAILED,
  FETCH_STAFF,
  FETCH_STAFF_LOADING,
  MODIFY_STAFF_SUCCESS,
  MODIFY_STAFF_FAILED,
  FETCH_STAFF_FAILED
} from "./Types";

export const fetchStaffs = () => dispatch => {
  dispatch({ type: FETCH_STAFFS_LOADING, payload: true });
  axios
    .get(`/api/staff/`)
    .then(res => {

      dispatch({ type: FETCH_STAFFS, payload: res.data });
      dispatch({ type: FETCH_STAFFS_LOADING, payload: false });
      dispatch({ type: FETCH_STAFFS_FAILED, payload: false })
    })
    .catch(err =>{
      dispatch({ type: FETCH_STAFFS_FAILED, payload: true})
      dispatch({ type: FETCH_STAFFS_LOADING, payload: false });
      dispatch({ type: FETCH_STAFFS, payload: []});
    });
};

export const fetchStaff = activitykey => dispatch => {
  dispatch({ type: FETCH_STAFF_LOADING, payload: true });
  dispatch({ type: FETCH_STAFF, payload: {} });
  dispatch({ type: FETCH_STAFF_FAILED, payload: {} });
  axios
    .get(`/api/staff/${activitykey}`)
    .then(res => {
      dispatch({ type: FETCH_STAFF, payload: res.data });
      dispatch({ type: FETCH_STAFF_LOADING, payload: false });
      dispatch({ type: FETCH_STAFF_FAILED, payload: {} });
    })
    .catch(err => {
      dispatch({ type: FETCH_STAFF, payload: {} });
      dispatch({ type: FETCH_STAFF_FAILED, payload: true });
      dispatch({ type: FETCH_STAFF_LOADING, payload: false });
    });
};

export const updateStaff = (id, formData) => dispatch => {
  const ipd = id.length > 0 ? id : "";
  axios
    .post(`/api/staff/${ipd}`, formData)
    .then(res => {
      dispatch({ type: MODIFY_STAFF_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: MODIFY_STAFF_FAILED, payload: err.response.data })
    );
};
