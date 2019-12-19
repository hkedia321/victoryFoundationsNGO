import React from 'react'
import Form from "semantic-ui-react/dist/es/collections/Form/Form";
import Grid from "semantic-ui-react/dist/es/collections/Grid/Grid";
import Button from "semantic-ui-react/dist/es/elements/Button/Button";

export default class MedicalInfo extends React.Component {


  constructor(props) {
    super(props);
  }

  createUI(){
    return this.props.medical_record.map((el, i) =>
      <React.Fragment key={i}>
        <Grid.Row>
          <Grid.Column textAlign={'left'} mobile={10}>

              <Form.Input name={`desc_${i}`} value={el.desc || ''} fluid placeholder="Medical Description"  label={i===0 && 'Description'} onChange={this.handleChange.bind(this, i, "desc")}/>

          </Grid.Column>
          <Grid.Column mobile={6}>
            <Form.Field>
              <Form.Input name={`type_${i}`} value={el.type || ''} label={i===0 && 'Type'} fluid placeholder="Type" onChange={this.handleChange.bind(this, i, "type")}/>
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }

  handleChange(i, field, event) {
    let medical_record = [...this.props.medical_record];
    medical_record[i] = {
      ...medical_record[i],
      [field]: event.target.value
    }
    this.props.handleStateFieldChange('medical_record', medical_record);
  }

  addClick(){
    let medical_record = [...this.props.medical_record];
    medical_record.push({desc:'',type:''});
    this.props.handleStateFieldChange('medical_record', medical_record);
  }



  render() {
    return (
      <Form>
        <Grid doubling >
        {this.createUI()}
        </Grid>
        <br/>
        <Button content='Add more' onClick={this.addClick.bind(this)}/>
      </Form>
    );
  }
}
