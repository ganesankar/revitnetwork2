import axios from "axios";
import {
  GET_ERRORS
} from "./Types";

//-------------------------------------------------------------
// CREATE CITY
export const createCity = formData => dispatch => {
  axios
    .post("api/cms/city", formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// EDIT CITY
export const editCity = (id, formData) => dispatch => {
  axios
    .post(`/api/cms/cityedit/${id}`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
