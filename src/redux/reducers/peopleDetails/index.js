import {LOAD_USER_DETAILS, LOAD_USER_DETAILS_SUCCESS, LOAD_USER_DETAILS_FAILURE} from './actions';

const initialpeopleDetailsState = {
  loading: false,
  error: null,
  data: null,
};

export default function peopleDetailsReducer(state = initialpeopleDetailsState, action){
  switch (action.type) {
    case LOAD_USER_DETAILS: {
      return{
        ...state,
        loading: true,
      };
  }
    case LOAD_USER_DETAILS_SUCCESS: {
      return{
        ...state,
        data: action.payload,
        loading: false,
      };
  }
    case LOAD_USER_DETAILS_FAILURE: {
      return{
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  };
};
