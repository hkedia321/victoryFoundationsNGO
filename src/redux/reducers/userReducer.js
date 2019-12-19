const initialState = {
  user: null,
  userRole: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        user: action.user,
        userRole: state.userRole
      };
    case "ADD_USER_ROLE":
      return {
        user: state.user,
        userRole: action.userRole
      };
    default:
      return { ...state };
  }
};

export default userReducer;
