import React, { Component } from "react";
import AddUser from "./AddNewUser";
import Breadcrumb from "semantic-ui-react/dist/es/collections/Breadcrumb/Breadcrumb";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import { connect } from "react-redux";

const addUserSections = [
  { key: "user_mgmgt", content: "User Management", link: false },
  { key: "add_user", content: "Add a user", link: true }
];

class UserManagementScreen extends Component {
  render() {
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

let UserManagementScreenHelper = connect(
  mapStateToProps,
  null
)(UserManagementScreen);

export default UserManagementScreenHelper;
