import axios from "axios";
import {
  FETCH_STUDENTS,
  FETCH_STUDENT,
  FETCH_STUDENT_LOADING,
  MODIFY_STUDENT_SUCCESS,
  MODIFY_STUDENT_FAILED,
  FETCH_STUDENT_FAILED,
  FETCH_STUDENTS_FAILED
} from "./Types";

export const fetchStudents = () => dispatch => {
  axios
    .get(`/api/student/`)
    .then(res => {
      dispatch({ type: FETCH_STUDENTS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: FETCH_STUDENTS_FAILED, payload: err.response.data })
    );
};

export const fetchStudent = activitykey => dispatch => {
  dispatch({ type: FETCH_STUDENT_LOADING, payload: true });
  dispatch({ type: FETCH_STUDENT, payload: {} });
  dispatch({ type: FETCH_STUDENT_FAILED, payload: {} });
  axios
    .get(`/api/student/${activitykey}`)
    .then(res => {
      dispatch({ type: FETCH_STUDENT, payload: res.data });
      dispatch({ type: FETCH_STUDENT_LOADING, payload: false });
      dispatch({ type: FETCH_STUDENT_FAILED, payload: {} });
    })
    .catch(err => {
      dispatch({ type: FETCH_STUDENT, payload: {} });
      dispatch({ type: FETCH_STUDENT_FAILED, payload: true });
      dispatch({ type: FETCH_STUDENT_LOADING, payload: false });
    });
};

export const updateStudent = (id, formData) => dispatch => {
  const ipd = id.length > 0 ? id : "";
  axios
    .post(`/api/student/${ipd}`, formData)
    .then(res => {
      dispatch({ type: MODIFY_STUDENT_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: MODIFY_STUDENT_FAILED, payload: err.response.data })
    );
};
