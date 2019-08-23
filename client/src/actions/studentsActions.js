import axios from "axios";
import { FETCH_STUDENTS , FETCH_STUDENT , ERROR_STUDENT} from "./Types";

export const fetchStudents = () => dispatch => {
  axios.get(`/api/student/`).then(res => {
    dispatch({
      type: FETCH_STUDENTS,
      payload: res.data
    });
  });
};

export const fetchStudent = activitykey => dispatch => {
  axios.get(`/api/student/${activitykey}`).then(res => {
    dispatch({
      type: FETCH_STUDENT,
      payload: res.data
    });
  });
};


export const updateStudent = (formData) => dispatch => {
  console.log('formData', formData)
  axios
    .post("/api/student/", formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: ERROR_STUDENT,
        payload: err.response.data
      })
    );
};