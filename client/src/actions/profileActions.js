import axios from "axios";
import {
  
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILE
} from "./Types";

//-------------------------------------------------------------
// GET PROFILE FAVORITES

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get("/auth/profileget").then(res => {
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  });
};

// SET PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// CLEAR PROFILE
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//-------------------------------------------------------------


