import React, { Component } from 'react'
import Button from "semantic-ui-react/dist/es/elements/Button/Button";
import NewStudentPersonalInfo from "./NewStudentPersonalInfo";
import MedicalInfo from "./MedicalInfo";
import FamilyDetails from "./FamilyDetails";
import MiscDetails from "./MiscDetails";
import StudentUpload from "./StudentUpload";
import Tab from "semantic-ui-react/dist/es/modules/Tab/Tab";
import {createNotification} from "../utils/utils";
import Loader from "semantic-ui-react/dist/es/elements/Loader/Loader";
import Header from "semantic-ui-react/dist/es/elements/Header/Header";
import Icon from "semantic-ui-react/dist/es/elements/Icon/Icon";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer/Dimmer";

export default class NewStudent extends Component {

  constructor(props) {
    super(props);
    this.handleDojChange = this.handleDojChange.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleIdProofFileChange = this.handleIdProofFileChange.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
  }
  state = {
    isLoading: false,
    medical_record: [],
    weight: '',
    height: '',
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleStateFieldChange = (key, value) => {
    this.setState({[key]: value});
  }
  handleHubChange = (event, props) => {
  console.log('hub change', props);
    this.setState({hub: props.value})
  };

  handleDojChange(date) {
    this.setState({
      doj: date,
      doj_long: date.getTime()/1000
    });
  }

  handleDobChange(date) {
    this.setState({
      dob: date,
      dob_long: date.getTime()/1000
    })
  }

  handleIdProofFileChange(fileItems) {
    console.log('file upload', fileItems)
    this.setState({
      idProofs: fileItems.map(fileItem => fileItem.file)
    });
  }

  handlePicChange(fileItems) {
    console.log('file upload', fileItems)
    this.setState({
      picture: fileItems.map(fileItem => fileItem.file)
    });
  }


  render() {

    const  { isLoading, name, address, aadhar, dob, doj, poNumber} = this.state
    const panes = [
      { menuItem: 'Personal', pane: <Tab.Pane>
          <NewStudentPersonalInfo
            handleInputs={this.handleChange}
            handleHubChange={this.handleHubChange}
            handleDobChange={this.handleDobChange}
            handleDojChange={this.handleDojChange}
            {...this.state}
        />
        </Tab.Pane> },
      { menuItem: 'Medical', pane: <Tab.Pane ><MedicalInfo {...this.state} handleStateFieldChange={this.handleStateFieldChange}/></Tab.Pane> },
      { menuItem: 'Family', pane: <Tab.Pane><FamilyDetails handleInputs={this.handleChange} {...this.state}/></Tab.Pane> },
      { menuItem: 'Misc', pane:  <Tab.Pane > <MiscDetails handleInputs={this.handleChange} {...this.state}/></Tab.Pane> },
      { menuItem: 'Upload', pane: <Tab.Pane> <StudentUpload
          handlePicChange={this.handlePicChange}
          handleIdProofFileChange={this.handleIdProofFileChange}/> <br/></Tab.Pane> },
    ];

    return (
      <React.Fragment>
        <Header as='h3' icon textAlign='center'>
          <Icon name='student' circular />
          <Header.Content>Add New Student</Header.Content>
        </Header>
        <br/>
        <Dimmer active={isLoading}>
        <Loader  size='large'>Loading</Loader>
        </Dimmer>
        <Tab renderActiveOnly={false} panes={panes} menu={{attached: true, size: 'small', tabular: true }} />
        <Button primary content={'Create Student'} disabled={isLoading}
                onClick={() => {
                  console.log(this.state);
                  if (!name) {
                    createNotification('error', 'Name cannot be empty');
                    return;
                  }
                  if (!aadhar) {
                    createNotification('error', 'Aadhar Number cannot be empty');
                    return;
                  }
                  if (!doj) {
                    createNotification('error', 'Date of Joining cannot be empty');
                    return;
                  }
                  if (!address) {
                    createNotification('error', 'Address cannot be empty');
                    return;
                  }
                  if (!poNumber) {
                    createNotification('error', 'Post Office Number cannot be empty');
                    return;
                  }
                  if (!dob) {
                    createNotification('error', 'Date Of Birth cannot be empty');
                    return;
                  }
                  if (!this.state.idProofs) {
                    createNotification('error', 'Id proof cannot be empty');
                    return;
                  }
                  if (!this.state.picture) {
                    createNotification('error', 'Picture cannot be empty');
                    return;
                  }
                  
                  this.setState({isLoading: true})
                  const data = new FormData();
                  // data.append('image1', this.state.idProofs && this.state.idProofs.length > 0 && this.state.idProofs[0])
                  // data.append('image2', this.state.picture && this.state.picture.length > 0 && this.state.picture[0])
                  data.append('aadharImage', this.state.picture && this.state.picture.length > 1 && this.state.picture[1])
                  data.append('student_name', name)
                  data.append('hub_id', 81)
                  data.append('sport_id', 31)
                  data.append('active', '1')
                  data.append('status', 'ACTIVE')
                  data.append('dob', this.state.dob_long)
                  data.append('aadhar', aadhar)
                  data.append('year', this.state.doj_long);
                  data.append('weight', this.state.weight);
                  data.append('height', this.state.height);
                  data.append('address', address);
                  data.append('post_office', poNumber)
                  data.append('medical_record', JSON.stringify(this.state.medical_record))

                  fetch('https://ohack.herokuapp.com/v1/victoryfoundation/student', {
                    method: 'POST',
                    body: data,
                  })
                    .then(res => res.json())
                    .then(result => {console.log(result); this.setState({isLoading: false});
                    if (result.status >= 400) {
                      createNotification('error', 'Could not add student')
                      return
                    }
                      createNotification('success', 'Student Added')})
                    .catch(
                      error =>{
                        createNotification('error', 'Could not  add student');
                        this.setState({isLoading: false})
                      }
                      )
                  ;
                }}
        />

      </React.Fragment>
    )
  }
}
