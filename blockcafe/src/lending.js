import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import credit from './credit';
import User from './user';
import {form,Well,Navbar,NavbarBrand,MenuItem,NavDropdown
  ,FormGroup,FormControl,ControlLabel,controlId,HelpBlock,Button,Checkbox,Nav,NavItem} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
class Lending extends Component {
 
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.getLoanDetails = this.getLoanDetails.bind(this);

    this.state = {
     user:false,
     login:true,
     showDetails:false,
     lenderAddress:"0xksksjhjdhkajhbjd",
     amount:'',
     duration:'',
     Interest:5,
     penalty:'',
     transactions:[],
     currentAccount:'',
     civicAccount:'0xa4C1C85210726ed6cE7fE45707E7818ceF979792',
     creditScore:'',
     loan :{
       lender:'',
       creditSeeker:'',
       civic:'',
       amount:0,
       duration:'',
       interest:'',
       penalty:'',
       status:'',
       timeStamp:'',



     },
     showLoanDetails:false,
    };
  }
  previousTransactions=[]
  async componentDidMount(){
    const manager = await credit.methods.manager().call();
    const accounts =await web3.eth.getAccounts();
    
    console.log(manager);
    const transactions = await credit.methods.getTransactionRecords(accounts[0]).call();
    const creditScore = await credit.methods.scores(this.state.civicAccount).call();
    console.log(transactions);
    this.setState({
      transactions,
      currentAccount:accounts[0],
      creditScore,
    })
    
    
  }

 async getLoanDetails(e){
 
  let id = document.getElementById('loanId').value;
  const transactions = await credit.methods.creditRequests(id).call();
  console.log(transactions)
  console.log(transactions.status)
   this.setState({
     loan:{
       lender:transactions.lenderAddress,
       creditSeeker:transactions.creditSeekerAddress,
       civic:transactions.civicId,
       status:transactions.status,
       interest:transactions.interest,
       duration:transactions.duration,
       amount:transactions.amount,
       penalty:transactions.penalty,

     }
     ,
     showLoanDetails:true,
   })
  }
  handleChange(e) {
    let penalty = e.target.value * (10/100);
    this.setState({ amount: e.target.value,penalty });

  }
  handleDuration(e){
    this.setState({ duration: e.target.value ,showDetails:true});
  }
  render() {

    const data =this.state.transactions;
    const listItems = data.map((d) => <li key={d}>{d}</li>);

    return (
     <div style={{height:"2000px",width:"2000px",
     backgroundImage:"url('https://cdn-images-1.medium.com/max/1600/1*fPLMYPKnq8mmmwBM3AGsAQ.png')"}}>
       <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Blockcafe</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={1} href="#">
     User Address: {this.state.currentAccount}
    </NavItem>
    <NavItem eventKey={2} href="#">
      Email
    </NavItem>
    <NavItem eventKey={3} href="#">
      VerificationStatus: Not yet verified
    </NavItem>
    <NavItem eventKey={4} href="#">
       Credit Score : {this.state.creditScore}
    </NavItem>
    <NavItem eventKey={4} href="#">
       Civic ID : {localStorage.getItem('id')}
    </NavItem>
    {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Separated link</MenuItem>
    </NavDropdown> */}
  </Nav>
</Navbar>;
      <div className="row" style={{display:"flex"}}>
        <div className="col-md-6">
        <h1 style={{color:"#ffffff"}}>Previous Loan transactions Ids</h1>
        <div>
          <h1 style={{color:"#ffffff"}}> {listItems} </h1>
          </div>
          <form>
        <FormGroup>
       <ControlLabel style={{color:"#ffffff"}}>Please Enter the loan transaction id</ControlLabel>
       <FormControl
       
         type="text"
        
         placeholder="Please enter the loan transaction Id"
         id="loanId"
       />
      
     </FormGroup>
     <Button Style="primary" onClick ={this.getLoanDetails}>Get loan details</Button>
   
     {this.state.showLoanDetails? <div style={{color:"#ffffff"}}>
          <h2 >Lender Address : {this.state.loan.lender}</h2>
          <h2> Your Address :{this.state.loan.creditSeeker}</h2>
         <h2> Amount: {this.state.loan.amount}</h2>
         <h2> Interest Rate:{this.state.loan.interest}</h2>
        <h2> Penalty on delay: {this.state.loan.penalty} </h2>
        <h2> Status :{this.state.loan.status}</h2>
         <h2> Duration :{this.state.loan.duration}</h2>
        
          </div> :<div></div>}
          
          </form>
        </div>
        <div className="col-md-6">
        <h1 style={{color:"#ffffff"}}>New Lending Request</h1>
       
        <form
      style ={{}}>
      
       <FormGroup>
       <ControlLabel style={{color:"#ffffff"}}>Please Enter the loan amount</ControlLabel>
       <FormControl
       
         type="text"
        
         placeholder="Please enter the loan amount"
         onChange={this.handleChange}
       />
      
     </FormGroup>
        <FormGroup
       
          controlId="formBasicText"
         
        >
          <ControlLabel style={{color:"#ffffff"}}>Please Enter the duration in days</ControlLabel>
          <FormControl
          
            type="text"
            value={this.state.value}
            placeholder="Please enter the duration in days"
            onChange={this.handleDuration}

          />
         
        </FormGroup>

        
        

        <Button bsStyle="primary">Send Lending Requests</Button>
       {this.state.showDetails? <div>
          <h2>Lender Address : {this.state.lenderAddress}</h2>
         <h2> Amount: {this.state.amount}</h2>
         <h2> Interest Rate:{this.state.Interest}</h2>
        <h2> Penalty on delay: {this.state.penalty} </h2>
         <h2> Duration :{this.state.duration}</h2>
          </div> :<div></div>}

      </form>
     

    
        </div>
      

      </div>
      </div>
    );
  }
}

export default Lending;
