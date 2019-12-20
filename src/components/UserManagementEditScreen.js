import React, { Component } from "react";
import Breadcrumb from "semantic-ui-react/dist/es/collections/Breadcrumb/Breadcrumb";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import { connect } from "react-redux";
import EditUser from "./EditUser";

const editUserSections = [
  { key: "user_mgmgt", content: "User Management", link: false },
  { key: "edit_user", content: "view user", link: true }
];

class UserManagementEditScreen extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.location.pathname === "/edit_user" && (
          <div>
            <Segment basic textAlign={"left"}>
              <Breadcrumb icon="right angle" sections={editUserSections} />
            </Segment>
            <EditUser user={this.props.state.userManagement.userToBeEdited} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  state: state
});

let UserManagementEditScreenHelper = connect(
  mapStateToProps,
  null
)(UserManagementEditScreen);

export default UserManagementEditScreenHelper;
