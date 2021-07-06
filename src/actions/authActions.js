import API from "../utils/API";
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  GET_ERRORS,
  CLEAR_ERRORS,
  CREATE_SUCCESS,
  CREATE_FAIL,
  NEW_USER_FAILED,
  NEW_USER_SUCCESS,
  PASSWORD_UPDATE_FAILED,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAILED,
  LOGIN_EXEC_FAILED,
  LOGIN_EXEC_SUCCESS,
  EXEC_FAILED,
  EXEC_LOADED,
  EXEC_PASSWORD_UPDATE_FAILED,
  EXEC_PASSWORD_UPDATE_SUCCESS,
} from "./types";
import history from "../history";

// action to handle errors
export const getErrors = (errorData) => {
  return {
    type: GET_ERRORS,
    payload: errorData,
  };
};
// Action to clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// Action to register new users
export const registerUser = (data) => async (dispatch) => {
  try {
    // send request to server side to register user
    const response = await API.register(data);
    // dispatch to reducer
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response,
    });
    // redirect to page
    history.push("/");
  } catch (err) {
    // dispatch get error Action
    dispatch(getErrors(err.response.data));
    // dispatch register fail
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
export const createUser = (data) => async (dispatch) => {
  try {
    // send request to server side to register user
    const response = await API.create(data);
    // dispatch to reducer
    dispatch({
      type: CREATE_SUCCESS,
      payload: response,
    });
    // redirect to page
  } catch (err) {
    // dispatch get error Action
    dispatch(getErrors(err.response));
    // dispatch register fail
    dispatch({
      type: CREATE_FAIL,
    });
  }
};
export const newUserPassword = (password_token) => async (dispatch) => {
  try {
    // send request to server side to register user

    const response = await API.newUser(password_token);

    // dispatch to reducer
    dispatch({
      type: NEW_USER_SUCCESS,
      payload: response.data,
    });
    // redirect to page
  } catch (err) {
    // dispatch get error Action
    dispatch(getErrors(err.response.data));
    // dispatch register fail
    dispatch({
      type: NEW_USER_FAILED,
    });
  }
};
// Action to login users
export const loginUser = (data) => async (dispatch) => {
  try {
    // send request to server side to login user
    const response = await API.login(data);
    // dispatch to reducer
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    // redirect to page
    // ***** this data is the user and password *****
    // console.log(response.data);
    if (response.data.role === "admin") {
      history.push("/dashboard");
    }
    if (response.data.role === "user") {
      history.push("/executive");
    }
    if (response.data.role === "manager") {
      history.push("/manager");
    }
  } catch (err) {
    // dispatch get error Action
    dispatch(getErrors(err.response.data));
    // dispatch login fail
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const loginExec = (data) => async (dispatch) => {
  try {
    // send request to server side to login user
    // ***** this data is the user and password *****
    // console.log(data);
    const response = await API.loginExec(data);
    // dispatch to reducer
    dispatch({
      type: LOGIN_EXEC_SUCCESS,
      payload: response.data,
    });
    // redirect to page
    console.log(response.data);
    if (response.data.role === "admin") {
      history.push("/dashboard");
    }
    if (response.data.role === "user") {
      history.push("/executive");
    }
    if (response.data.role === "manager") {
      history.push("/manager");
    }
  } catch (err) {
    // dispatch get error Action
    dispatch(getErrors(err.response.data));
    // dispatch login fail
    dispatch({
      type: LOGIN_EXEC_FAILED,
    });
  }
};
// Action to load current user
export const loadUser = () => async (dispatch, getState) => {
  try {
    // call getTokenImfo funtion and store content (geader information) to headers
    const headers = getTokenInfo(getState);
    // send request to server side and pass token information in headers to verify token
    const user = await API.loadUser(headers);
    // dispatch to reducer
    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (err) {
    // dispatch Auth error
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const loadExec = () => async (dispatch, getState) => {
  try {
    // call getTokenImfo funtion and store content (geader information) to headers
    const headers = getTokenInfo(getState);
    // send request to server side and pass token information in headers to verify token
    const user = await API.loadExec(headers);
    // dispatch to reducer
    dispatch({
      type: EXEC_LOADED,
      payload: user.data,
    });
  } catch (err) {
    // dispatch Auth error
    dispatch({
      type: EXEC_FAILED,
    });
  }
};

// function to configure token to be used on any server request using the server side "auth" middleware
export const getTokenInfo = (getState) => {
  const token = getState().auth.token;
  const role = getState().auth.currentUser.role;
  const headerConfig = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) {
    headerConfig.headers["token"] = token;
    headerConfig.headers["role"] = role;
  }

  return headerConfig;
};
// Action to logout user
export const LogoutUser = () => {
  // redirect to page
  console.log("your are now logged out");
  history.push("/");
  // dispatch logout success
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    const user = await API.updatePassword(data);

    dispatch({
      type: PASSWORD_UPDATE_SUCCESS,
      payload: user.data,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_UPDATE_FAILED,
    });
  }
};
export const updateExecPassword = (data) => async (dispatch) => {
  try {
    const user = await API.updateExecPassword(data);

    dispatch({
      type: EXEC_PASSWORD_UPDATE_SUCCESS,
      payload: user.data,
    });
  } catch (err) {
    dispatch({
      type: EXEC_PASSWORD_UPDATE_FAILED,
    });
  }
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    console.log("From authActions.js");
    console.log(data);
    const user = await API.forgotPassword(data);
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (form) => async (dispatch) => {
  try {
    const user = await API.resetPassword(form);

    dispatch({
      type: PASSWORD_CHANGE_SUCCESS,
      payload: user.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PASSWORD_CHANGE_FAILED,
    });
  }
};
