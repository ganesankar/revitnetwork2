import axios from "axios";
import { FETCH_STUDENTS } from "./Types";

export const fetchStudents = () => dispatch => {
  axios.get(`/api/student/`).then(res => {
    dispatch({
      type: FETCH_STUDENTS,
      payload: res.data
    });
  });
};
