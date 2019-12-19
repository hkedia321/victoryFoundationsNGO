import React from 'react'
import Form from "semantic-ui-react/dist/es/collections/Form/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import DatePicker from "react-datepicker/es/index";
import TextArea from "semantic-ui-react/dist/es/addons/TextArea/TextArea";


export default class NewStudentPersonalInfo extends React.Component {

  state = {hubList: []};

  componentDidMount() {
    fetch('https://ohack.herokuapp.com/v1/victoryfoundation/hub', {
      method: 'GET'
    }).then (
      res => res.json()
    ). then (result => {
      const opts = []
      result.map((item,i) => opts.push({ text: item.hubName, value: item.hubId, key: i}))
      console.log('hubs:', opts)
        this.setState({hubList: opts})
      }
    )
  }

  render() {
    const {handleInputs, name, education, hub, address, doj, dob, handleDobChange, handleDojChange, handleHubChange, poNumber, aadhar} = this.props;
    const { hubList} = this.state;
    return <React.Fragment>

        <Form>
          <Grid doubling >
            <Grid.Row>
              <Grid.Column textAlign={'left'} mobile={6}>
                <label className={'Admin-Form-Label'}>Name </label>
              </Grid.Column>
              <Grid.Column mobile={10}>
                <Form.Field>
                  <Form.Input name={'name'} value={name} fluid placeholder="Name" onChange={handleInputs}/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column textAlign={'left'} mobile={6}>
                <label className={'Admin-Form-Label'}>Aadhar Number</label>
              </Grid.Column>
              <Grid.Column mobile={10}>
                <Form.Field>
                  <Form.Input fluid placeholder="Aadhar Number" name={'aadhar'} value={aadhar} onChange={handleInputs}/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column textAlign={'left'} mobile={6}>
                <label className={'Admin-Form-Label'}>Name of school </label>
              </Grid.Column>
              <Grid.Column mobile={10}>
                <Form.Field>
                  <Form.Input name={'education'} value={education} fluid placeholder="education" onChange={handleInputs}/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column mobile={6} textAlign={'left'}>
                <label className={'Admin-Form-Label'}>Hub Name</label>
              </Grid.Column>
              <Grid.Column mobile={10}>
                <Form.Field>
                  <Form.Select value={hub} options={hubList} placeholder='Hub' onChange={handleHubChange} fluid/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <label className={'Admin-Form-Label'} >Address </label>
              </Grid.Column>
              <Grid.Column width={10}>
                <Form.Field>
                  <TextArea name={'address'} onChange={handleInputs} value={address} placeholder='Address' style={{ minHeight: 100 }} />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column mobile={6}>
                <label className={'Admin-Form-Label'}>Date of Joining </label>
              </Grid.Column>
              <Grid.Column mobile={10}>

                <DatePicker
                  selected={doj}
                  placeholderText="Click to select a date"
                  maxDate={new Date()}
                  showDisabledMonthNavigation
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="yyyy/MM/dd"
                  onChange={handleDojChange}
                />

              </Grid.Column>


            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <label className={'Admin-Form-Label'}>Post Office </label>
              </Grid.Column>
              <Grid.Column width={10}>
                <Form.Field>
                  <Form.Input fluid placeholder="Post Office Number" name={'poNumber'} value={poNumber} onChange={handleInputs}/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>

              <Grid.Row centered>
                <Grid.Column mobile={6}>
                  <label className={'Admin-Form-Label'}>Date of birth </label>
                </Grid.Column>
                <Grid.Column mobile={10}>

                  <DatePicker
                    selected={dob}
                    placeholderText="Click to select a date of birth"
                    maxDate={new Date()}
                    showDisabledMonthNavigation
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy/MM/dd"
                    onChange={handleDobChange}
                  />

                </Grid.Column>
            </Grid.Row>

          </Grid>
        </Form>
        <br/>

    </React.Fragment>
  }

}
