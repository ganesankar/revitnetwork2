import {
  
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/Types";

const initialState = {
  user: {},
  itineraries: [],
  favitin: [],
  favid: [],
  profile: []
  // likes: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state
        // loading: true
      };
    // GETS FAVORITES IDS FROM PROFILE
    case GET_PROFILE:
      return {
        ...state,
        favid: action.payload.favorites
        // loading: false
      };
    
    
    
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
