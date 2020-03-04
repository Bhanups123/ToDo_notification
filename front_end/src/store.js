import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import isEmpty from "./is-empty";
import { combineReducers } from "redux";

const initState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  auth: authReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
