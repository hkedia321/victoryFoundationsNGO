import React, { Component } from "react";
import AddUser from "./AddNewUser";
import Breadcrumb from "semantic-ui-react/dist/es/collections/Breadcrumb/Breadcrumb";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import { clearEditUser } from "./../redux/actions/UserActions";

const editUserSections = [
  { key: "user_mgmgt", content: "User Management", link: false },
  { key: "edit_user", content: "view user", link: true }
];

class UserManagementEditScreen extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.match.path);
    console.log(this.props.location.pathname === "/edit_user");

    // this.props.clearEditUser();
    return (
      <React.Fragment>
        {this.props.location.pathname === "/edit_user" && (
          <div>
            <Segment basic textAlign={"left"}>
              <Breadcrumb icon="right angle" sections={editUserSections} />
            </Segment>
            <EditUser props={this.props} />
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

let UserManagementEditScreenHelper = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementEditScreen);

export default UserManagementEditScreenHelper;
