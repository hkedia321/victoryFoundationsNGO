import React from "react";
import Table from "semantic-ui-react/dist/es/collections/Table/Table";
import { addUserList } from "../redux/actions/UserListActions";
import { store } from "../index";
import connect from "react-redux/es/connect/connect";
import _ from "lodash";
import { Divider, Dropdown } from "semantic-ui-react";
import { flipUserStatus, editUserDetails } from "../redux/actions/UserActions";
// import { browserHistory } from "react-router";

class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.loadUserData(props);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.showEditUserScreen === true) {
  //     this.props.history.push(`/edit_user`);
  //   }
  // }

  loadUserData(props) {
    fetch("https://ohack.herokuapp.com/v1/victoryfoundation/users/")
      .then(response => response.json())
      .then(data => {
        if (data) {
          store.dispatch(addUserList(data));
          //props.addUserList(data);
        }
      });
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <br />
        <Divider horizontal>Active users</Divider>
        <br />
        <Table celled padded unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(
              this.props.userList,
              user =>
                user.status == "A" && (
                  <Table.Row>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.role.type}</Table.Cell>
                    <Table.Cell>
                      <Dropdown text="Select Action ">
                        <Dropdown.Menu>
                          <Dropdown.Item
                            text="View/Edit"
                            value={user}
                            key={user.id}
                            // onClick={this.props.editUserDetails.bind(
                            //   this,
                            //   user
                            // )}
                            onClick={() => {
                              this.props.editUserDetails(user);
                              helper(this.props);
                            }}
                          />
                          <Dropdown.Item
                            text="Deactivate User"
                            key={user.id + " activate"}
                            onClick={() => {
                              apiCall(user, this.props.flipUserStatus);
                            }}
                            // onClick={this.props.flipUserStatus.bind(this, user)}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
        <br />
        <Divider horizontal>InActive users</Divider>
        <br />

        <Table celled padded unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {_.map(
              this.props.userList,
              user =>
                user.status == "I" && (
                  <Table.Row>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.role.type}</Table.Cell>
                    <Table.Cell>
                      <Dropdown text="Select Action ">
                        <Dropdown.Menu>
                          <Dropdown.Item text="View/Edit" key={user.id} />
                          <Dropdown.Item
                            text="Activate User"
                            key={user.id + " inactivate"}
                            onClick={this.props.flipUserStatus.bind(this, user)}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}

//>>>>>>>>>>>>>>>>>>>>this call has to PUT with user as body<<<<<<<<<<<<<<<<<<<<<<
async function apiCall(user, flipUserStatus) {
  let response = await fetch(`/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    // body: JSON.stringify(user)
  }).then(result => {
    console.log(result);
    console.log("one");
    flipUserStatus(user);
    console.log("two");
    return true;
  });
}

const helper = props => {
  props.history.push(`/edit_user`);
};
const mapStateToProps = state => {
  console.log("helllooooo");
  console.log(state);
  // browserHistory.push("/user_mgmt");
  return {
    userList: state.userManagement.userList,
    showEditUserScreen: state.userManagement.editUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    flipUserStatus: payload => dispatch(flipUserStatus(payload)),
    editUserDetails: payload => dispatch(editUserDetails(payload))
    //addUserList:(payload)=>dispatch(addUserList(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);
