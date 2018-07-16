
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {form,Well,FormGroup,FormControl,ControlLabel,controlId,HelpBlock,Button,Checkbox} from 'react-bootstrap';
import {redirect} from 'react-router-dom';
class User extends Component {
 
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      name : '',
      civicSip:'',
    };
  }
  componentDidMount(){
 
    
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  

  handleChange(e) {
   
    this.setState({ name: e.target.value });
  }
  render() {
    return (
      <div className="App" style={{display:"flex",paddingTop:"100px",width:"2000px",alignItems:"center", flexDirection:"column",justifyItems:"center",height:"100vh",backgroundImage:"url('https://cdn-images-1.medium.com/max/1600/1*fPLMYPKnq8mmmwBM3AGsAQ.png')"}}>
     
     <form
      style ={{}}>
       <FormGroup
       
      
       validationState={this.getValidationState()}
     >
       <ControlLabel style={{color:"#ffffff"}}>Please Enter your name</ControlLabel>
       <FormControl
       
         type="text"
        
         placeholder="Enter text"
         onChange={this.handleChange}
       />
      
     </FormGroup>
        <FormGroup
       
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel style={{color:"#ffffff"}}>Please Enter your facebook profile</ControlLabel>
          <FormControl
          
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
         
        </FormGroup>
        <FormGroup
          
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel style={{color:"#ffffff"}}>Please Enter your twitter profile</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
       
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel style={{color:"#ffffff"}}>Please upload the photo of your aadhar card</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
       
        <Button bsStyle="primary" onClick={this.props.main}>Submit</Button>
      </form>
      <Well>
      <Checkbox validationState="success">Agree on the below agreement</Checkbox>
        I <p id="name">{this.state.name}</p></Well>;

      </div>
    );
  }
}

export default User;


