import authHeader from "./authheader";
import setCurrentUser from "../authActions";

export default () => dispatch => {
  localStorage.removeItem("jwtToken");
  authHeader();
  dispatch(setCurrentUser({}));
};
