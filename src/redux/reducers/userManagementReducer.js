import { createNotification } from "../../utils/utils";

const initialState = {
  userList: null
};

const userManagementReducer = (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case "ADD_USER_LIST":
      return Object.assign({}, state, { userList: action.users });

    case "FLIP_STATUS":
      action.payload.status = action.payload.status == "I" ? "A" : "I";
      for (var i = 0; i < state.userList.length; i++) {
        if (state.userList[i].id == action.payload.id) {
          var temp = state.userList;
          temp[i] = action.payload;
          return Object.assign({}, state, { userList: temp });
        }
      }
      //   fetch(
      //     `https://ohack.herokuapp.com/v1/victoryfoundation/users/${action.payload.id}`,
      //     {
      //       method: "PUT",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify(action.payload)
      //     }
      //   )
      //     .then(response => response.json())
      //     .then(result => {
      //       const { statusCodeValue } = result;
      //       if (statusCodeValue < 400) {
      //         action.payload.status = action.payload.status == "I" ? "A" : "I";
      //         var currentUser = state.userList.filter(
      //           user => user.id == action.payload.id
      //         );
      //         currentUser.status = action.payload.status;
      //         createNotification("success", "status is updated.");
      //       } else {
      //         createNotification(
      //           "error",
      //           "Could not update status, please try again"
      //         );
      //       }
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       /*                 action.payload.status=(action.payload.status=='I'?'A':'I');
      //             for(var i=0;i<state.userList.length;i++){
      //                 if(state.userList[i].id==action.payload.id){
      //                     var temp=state.userList;
      //                     temp[i]=action.payload;
      //                     return Object.assign({}, state, { userList: temp });
      //                 }
      //             }
      //             console.log(state.userList); */
      //       createNotification(
      //         "error",
      //         "Could not update status, please try again"
      //       );
      //     });
      return { ...state };
    case "EDIT_USER":
      console.log("edit user");
      return Object.assign(
        {},
        { ...state },
        { userToBeEdited: action.payload },
        { editUser: true }
      );
    case "SET_EDIT_TO_FALSE":
      console.log("edit false ");
      return Object.assign({}, { ...state }, { editUser: false });
    default:
      return { ...state };
  }
};

export default userManagementReducer;
