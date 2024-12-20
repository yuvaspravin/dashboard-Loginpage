import { SET_ERRORS, SET_LOADING, SET_LOGIN_DATA } from "../action/action";

const initialState = {
  loginData: {
    email: "",
    password: "",
  },
  errors: {
    email: "",
    password: "",
  },
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        loginData: { ...state.loginData, ...action.payload },
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
