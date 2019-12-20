export const addUser = user => {
  return {
    type: "ADD_USER",
    user
  };
};

export const addUserRole = userRole => {
  return {
    type: "ADD_USER_ROLE",
    userRole
  };
};

export const flipUserStatus = payload => {
  console.log("flip user");
  return {
    type: "FLIP_STATUS",
    payload
  };
};

export const editUserDetails = payload => {
  return {
    type: "EDIT_USER",
    payload
  };
};
