import authHeader from "./utils/authheader";

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //dispatch why like this
  localStorage.removeItem("jwtToken");
  authHeader(false);
  dispatch(setCurrentUser({}));
};
