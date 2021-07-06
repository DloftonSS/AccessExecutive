import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT_SUCCESS,
  PASSWORD_UPDATE_SUCCESS,
  NEW_USER_FAILED,
  CREATE_FAIL,
  PASSWORD_UPDATE_FAILED,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
  LOGIN_EXEC_SUCCESS,
  LOGIN_EXEC_FAILED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") ? true : false,
  currentUser: JSON.parse(localStorage.getItem("currentUser"))
    ? localStorage.getItem("currentUser")
    : null,
  role: localStorage.getItem("role") ? localStorage.getItem("role") : "",
};
// reducer to handle auth Actions
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
      };
    case LOGIN_EXEC_FAILED:
    case LOGIN_EXEC_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload,
        isAuthenticated: true,
        role: action.payload.role,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case NEW_USER_FAILED:
    case CREATE_FAIL:
    case PASSWORD_UPDATE_SUCCESS:
    case PASSWORD_UPDATE_FAILED:
    case PASSWORD_CHANGE_FAILED:
    case PASSWORD_CHANGE_SUCCESS:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("role");
      console.log("Logout called");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        currentUser: null,
        role: "",
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        role: action.payload.role,
      };

    default:
      return state;
  }
};
