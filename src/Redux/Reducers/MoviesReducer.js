import {
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIES_SUCCESS,
} from "../ActionsType/MoviesActionsType";

const intialState = {
  allMovies: [],
  error: "",
};
const MoviesReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return { ...state, allMovies: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default MoviesReducer;
