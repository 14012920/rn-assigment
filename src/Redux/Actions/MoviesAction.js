import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../ActionsType/MoviesActionsType";

export const getMovies = () => {
  return (dispatch) => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=8e371b6dc5a4f5ddc7a61ca775fba7ee"
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("result2222222", json);
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: json?.results });
      })
      .catch((e) => {
        dispatch({
          type: FETCH_MOVIES_FAILURE,
          payload: "Something went wrong",
        });
        console.log("error", e);
      });
  };
};
