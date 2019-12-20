const initialState = {
  userList: null
};

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER_LIST":
      return Object.assign({}, state, { userList: action.users });

    case "FLIP_STATUS":
      //action.payload.status = action.payload.status == "I" ? "A" : "I";
      for (var i = 0; i < state.userList.length; i++) {
        if (state.userList[i].id == action.payload.id) {
          var temp = state.userList;
          temp[i] = action.payload;
          return Object.assign({}, state, { userList: temp });
        }
      }
      return { ...state };
    case "EDIT_USER":
      return Object.assign(
        {},
        { ...state },
        { userToBeEdited: action.payload }
      );
    default:
      return { ...state };
  }
};

export default userManagementReducer;
