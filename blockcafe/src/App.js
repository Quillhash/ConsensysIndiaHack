import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './user';
import Lending from './lending';
import axios from 'axios';
import {form,Well,FormGroup,FormControl,ControlLabel,controlId,HelpBlock,Checkbox,Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
class App extends Component {
 
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
     user:false,
     login:true,
     civicId:'',
    };
  }
  componentDidMount(){
    var s = document.createElement('script');
    s.src = "https://hosted-sip.civic.com/js/civic.sip.min.js";
    document.head.appendChild(s);
    
    
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
   login = (e)=>{
    var civicSip = new window.civic.sip({ appId: 'Bkz9vkLXQ' });
    var that = this;
   civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
    civicSip.on('auth-code-received', function (event) {
    /*
        event:
        {
            event: "scoperequest:auth-code-received",
            response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
            type: "code"
        }
    */

    // encoded JWT Token is sent to the server
   
    var jwtToken = event.response;
    console.log(jwtToken);
    let  headers ={
      "authorization":jwtToken
    }
    
    axios.post('http://localhost:4200/login', {token:jwtToken} ).then((res) =>localStorage.setItem("id", res.data.userId)).catch((err) => err);
    
    that.setState({
      login:false,
      user:true,
     
    })
    // Your function to pass JWT token to your server
   // sendAuthCode(jwtToken);
  });

  civicSip.on('user-cancelled', function (event) {
    /*
        event:
        {
          event: "scoperequest:user-cancelled"
        }
    */
   });

  civicSip.on('read', function (event) {
    /*
        event:
        {
          event: "scoperequest:read"
        }
    */
  });

   // Error events.
   civicSip.on('civic-sip-error', function (error) {
      // handle error display if necessary.
      console.log('   Error type = ' + error.type);
      console.log('   Error message = ' + error.message);
   });




  }
  handleLending =(e)=>{
    e.preventDefault();
    this.setState({
      user:false,
      login:false,
    })
  }

  handleChange(e) {
   
    this.setState({ name: e.target.value });
  }
  render() {
    return (
     
      <div style={{
      display:"flex",justifyContent:"center",alignContent:"center",

      height:"800px",
      backgroundImage:"url('https://cdn-images-1.medium.com/max/1600/1*fPLMYPKnq8mmmwBM3AGsAQ.png')"}}>

         {this.state.user ? <User main={this.handleLending}/> : this.state.login ?
      <Button  style={{ maxHeight: "100px",
        width: "200px",marginTop:"400px"}} id="signupButton" onClick ={this.login} className="btn btn-primary" type="button">
      <span>Log in with Civic</span>
  </Button> :
  <Lending civicId ={this.state.civicId} />
         }
      

      </div>
    );
  }
}

export default App;
