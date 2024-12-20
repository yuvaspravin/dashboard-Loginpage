import { SET_USERS } from "../action/action";

const initialUserState = {
  users: [], // Stores the `user.json` data
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
