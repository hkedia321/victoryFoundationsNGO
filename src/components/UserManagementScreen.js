import React, { Component } from "react";
import AddUser from "./AddNewUser";
import Breadcrumb from "semantic-ui-react/dist/es/collections/Breadcrumb/Breadcrumb";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import { clearEditUser } from "./../redux/actions/UserActions";

const addUserSections = [
  { key: "user_mgmgt", content: "User Management", link: false },
  { key: "add_user", content: "Add a user", link: true }
];

class UserManagementScreen extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.path);
    console.log(this.props.location.pathname === "/edit_user");

    // this.props.clearEditUser();
    return (
      <React.Fragment>
        {this.props.location.pathname === "/user_mgmt" && (
          <div>
            <Segment basic textAlign={"left"}>
              <Breadcrumb icon="right angle" sections={addUserSections} />
            </Segment>{" "}
            <AddUser />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  clearEditUser: () => dispatch(clearEditUser())
});

let UserManagementScreenHelper = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementScreen);

export default UserManagementScreenHelper;
