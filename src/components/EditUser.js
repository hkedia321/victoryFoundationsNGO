import React from "react";
import Form from "semantic-ui-react/dist/es/collections/Form/Form";
import Segment from "semantic-ui-react/dist/es/elements/Segment/Segment";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown/Dropdown";
import DatePicker from "react-datepicker/es/index";
import TextArea from "semantic-ui-react/dist/es/addons/TextArea/TextArea";
import { createNotification } from "../utils/utils";
import Header from "semantic-ui-react/dist/es/elements/Header/Header";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";

const COACH_ID = 31;
const ADMIN_ID = 21;
const options = [
  { key: "a", value: ADMIN_ID, text: "Admin" },
  { key: "c", value: COACH_ID, text: "Coach" }
];

const initalState = {
  name: '', username: '', user_role: '', address: '', pincode: '', mobile: '', startDate: null, education: '', sport: '', about: ''
}

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state = {
      isLoading: false,
      displayError: false,
      
    };
    this.initializeState();
  }

  handleChange = (e, { name, value }) => {this.setState({ [name]: value })};

  handleSportChange = (event, props) => {
    this.setState({ sport: props.value });
  };

  validateInput = (event) => {
    for (var key in initalState) {
      if (!this.validateField(key)) {
        return false;
      }
    }
    return true;
  };

  validateField = key => {
    switch (key) {
      case "name":
      case "username":
        if (!this.state[key]) {
          console.log(`${key} is invalid`);
          return false;
        }
        break;
      case "address":
      case "education":
      case "sport":
      case "startDate":
        if (this.state.user_role === COACH_ID && !this.state[key]) {
          console.log(`${key} is invalid`);
          return false;
        }
        break;

      case "pincode":
        if (this.state.user_role === COACH_ID && this.validatePincode()) {
          console.log(`${key} is invalid`);
          return false;
        }
      case "mobile":
        if (this.state.user_role === COACH_ID && this.validateMobile()) {
          console.log(`${key} is invalid`);
          return false;
        }
    }
    return true;
  };

  handleDateChange(date) {
    this.setState({
      startDate: date,
      date_long: date.getTime() / 1000
    });
  }

  //returns true if not valid
  validatePincode = () => {
    return (
      !this.state.pincode ||
      isNaN(this.state.pincode) ||
      this.state.pincode.length < 6
    );
  };

  //returns true if not valid
  validateMobile = () =>
    !this.state.mobile ||
    isNaN(this.state.mobile) ||
    this.state.mobile.length < 10;

  
    initializeState=()=>{
      if (this.props.user.role.type === "ADMIN") {
      this.state.name = this.props.user.name;
      this.state.username = this.props.user.username;
      this.state.user_role =
        this.props.user.role.type === "ADMIN"
          ? ADMIN_ID
          : COACH_ID;
      this.state.mobile = this.props.user.mobile;
    } else {
      this.state.name = this.props.user.name;
      this.state.username = this.props.user.username;
      this.state.user_role =
        this.props.user.role.type === "Admin"
          ? ADMIN_ID
          : COACH_ID;
          this.state.mobile = this.props.user.coach.mobile;
      //   >>>>>>>>>>>>>>>>>>>>moblie is not capture in state<<<<<<<<<<<<<<<<<<
      this.state.address = this.props.user.coach.address;
      this.state.pincode = this.props.user.coach.zipcode;
      this.state.startDate = new Date(this.props.user.coach.dob*1000);
      this.state.education = this.props.user.coach.education;
      this.state.sport =
        this.props.user.coach.sport.sports_name ===
        "FOOT BALL"
          ? 31
          : 41;
      this.state.about = this.props.user.coach.about;
      this.state.date_long = this.props.user.coach.createdon;
    }
  }
  render() {
    const {name, username, user_role, address, pincode, mobile, startDate, education, sport, about, isLoading, date_long} = this.state;
    return (
      <React.Fragment>
        <Header as="h3" icon textAlign="center">
          <Icon name="user outline" circular />
          <Header.Content>View existing User</Header.Content>
        </Header>
        <Segment>
          <br />
          <Form loading={isLoading}>
            <Grid doubling>
              <Grid.Row>
                <Grid.Column textAlign={"left"} mobile={6}>
                  <label className={"Admin-Form-Label"}>
                    Name<sup style={{ color: "red", fontSize: "100%" }}>*</sup>{" "}
                  </label>
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <Form.Field>
                    <Form.Input
                      name={"name"}
                      value={name}
                      fluid
                      placeholder="Name"
                      onChange={this.handleChange}
                      error={this.state.displayError && !this.state.name}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column textAlign={"left"} mobile={6}>
                  <label className={"Admin-Form-Label"}>
                    Username
                    <sup style={{ color: "red", fontSize: "100%" }}>*</sup>{" "}
                  </label>
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <Form.Field>
                    <Form.Input
                      name={"username"}
                      value={username}
                      fluid
                      placeholder="Username"
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column mobile={6} textAlign={"left"}>
                  <label className={"Admin-Form-Label"}>
                    Role<sup style={{ color: "red", fontSize: "100%" }}>*</sup>
                  </label>
                </Grid.Column>
                <Grid.Column mobile={10}>
                  <Form.Field>
                    <Form.Select
                      options={options}
                      name={"role"}
                      value={user_role}
                      placeholder="Role"
                      onChange={this.handleUserRoleChange}
                      fluid
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>

              {user_role === COACH_ID && (
                <React.Fragment>
                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Address
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field
                        error={this.state.displayError && !this.state.address}
                      >
                        <TextArea
                          name={"address"}
                          value={address}
                          placeholder="Address"
                          style={{ minHeight: 100 }}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Pincode
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field>
                        <Form.Input
                          fluid
                          name={"pincode"}
                          value={pincode}
                          placeholder="Pincode"
                          onChange={this.handleChange}
                          error={
                            this.state.displayError &&
                            (!this.state.pincode ||
                              isNaN(this.state.pincode) ||
                              this.state.pincode.length < 6)
                          }
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Mobile
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field>
                        <Form.Input
                          name={"mobile"}
                          value={mobile}
                          fluid
                          placeholder="Mobile"
                          onChange={this.handleChange}
                          error={
                            this.state.displayError &&
                            (!this.state.mobile ||
                              isNaN(this.state.mobile) ||
                              this.state.mobile.length < 10)
                          }
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Date of birth
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field
                        error={this.state.displayError && !this.state.startDate}
                      >
                        <DatePicker
                          selected={startDate}
                          placeholderText="Click to select a date of birth"
                          maxDate={new Date()}
                          showDisabledMonthNavigation
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          dateFormat="dd/MM/yyyy"
                          onChange={this.handleDateChange}
                          value={startDate}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Education
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field>
                        <Form.Input
                          placeholder="Education"
                          fluid
                          name={"education"}
                          value={education}
                          onChange={this.handleChange}
                          error={
                            this.state.displayError && !this.state.education
                          }
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>
                        Sport
                        <sup style={{ color: "red", fontSize: "100%" }}>
                          *
                        </sup>{" "}
                      </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field
                        error={this.state.displayError && !this.state.sport}
                      >
                        <Dropdown
                          placeholder="Sport(s)"
                          value={sport}
                          fluid
                          selection
                          options={[
                            { key: "a", text: "Football", value: 31 },
                            { key: "b", text: "Boxing", value: 41 }
                          ]}
                          onChange={this.handleSportChange}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                    <Grid.Column width={6}>
                      <label className={"Admin-Form-Label"}>About </label>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Form.Field>
                        <TextArea
                          name={"about"}
                          value={about}
                          placeholder="About"
                          style={{ minHeight: 100 }}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </React.Fragment>
              )}
            </Grid>
          </Form>
          <br />
          {this.state.user_role === COACH_ID && (
            <Button
              disabled={this.state.isLoading}
              primary
              content={"Update Coach"}
              onClick={(e) => {
                if (!this.validateInput(e)) {
                  this.setState({ displayError: true });
                  createNotification(
                    "error",
                    "Please fill the mandatory fields and try again"
                  );
                  return;
                }
                this.setState({ displayError: false });
                this.setState({ isLoading: true });
                fetch(
                  `https://ohack.herokuapp.com/v1/victoryfoundation/users/${this.props.user.id}`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      coach: {
                        name: name,
                        about: about,
                        address: address,
                        experience: education,
                        dob: date_long,
                        mobile:mobile,
                        sport: {
                          id: sport
                        }
                      },
                      username: username,
                      name: name,
                      role: {
                        id: user_role
                      }
                    })
                  }
                )
                  .then(res => res.json())
                  .then(
                    result => {
                      const { statusCodeValue } = result;
                      if (statusCodeValue < 400) {
                        this.setState({
                          isLoading: false,
                          result: result,
                          ...this.initalState
                        });
                        createNotification("success", "updated details");
                      } else {
                        this.setState({
                          isLoading: false,
                          error: result
                        });
                        createNotification(
                          "error",
                          "Could not update details, please try again"
                        );
                      }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    error => {
                      this.setState({
                        isLoading: false,
                        error
                      });
                      createNotification(
                        "error",
                        "Could not update details, please try again"
                      );
                    }
                  );
              }}
            />
          )}
          {this.state.user_role === ADMIN_ID && (
            <Button
              disabled={isLoading}
              primary
              content={"Update Admin"}
              onClick={() => {
                if (!this.validateInput()) {
                  this.setState({ displayError: true });
                  createNotification(
                    "error",
                    "Please fill the mandatory fields and try again"
                  );
                  return;
                }
                this.setState({ displayError: false });
                this.setState({ isLoading: true });
                fetch(
                  `https://ohack.herokuapp.com/v1/victoryfoundation/users/${this.props.user.id}`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      username: username,
                      name: name,
                      role: {
                        id: user_role
                      }
                    })
                  }
                )
                  .then(res => res.json())
                  .then(result => {
                    const { statusCodeValue } = result;
                    if (statusCodeValue < 400 && statusCodeValue > 200) {
                      createNotification("success", "updated details");
                      this.setState({
                        isLoading: false,
                        result: result,
                        ...this.initalState
                      });
                    } else {
                      this.setState({
                        isLoading: false,
                        error: result
                      });
                      createNotification("error", "Could not update details");
                    }
                    return result;
                  })
                  .catch(error => {
                    this.setState({
                      isLoading: false,
                      error
                    });
                    createNotification("error", "Could not update details");
                  });
              }}
            />
          )}
        </Segment>
      </React.Fragment>
    );
  }
}
