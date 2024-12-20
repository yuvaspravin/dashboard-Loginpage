export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const SET_ERRORS = "SET_ERRORS";
export const SET_LOADING = "SET_LOADING";
export const SET_USERS = "SET_USERS";

export const setLoginData = (data) => ({
  type: SET_LOGIN_DATA,
  payload: data,
});

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setUserData = (userData) => ({
  type: SET_USERS,
  payload: userData,
});
