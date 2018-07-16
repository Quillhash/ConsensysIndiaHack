pragma solidity ^ 0.4.21;
import "./SafeMath.sol";
pragma experimental ABIEncoderV2;


contract credit {
    // lender variable starts
   address[] public lenders;
   
  
   struct profile {
       address lenderAddress; // address of lender
       string institutionName;  // institutionName of the lender;
       string idDocumentHash; //idDocument which will contains addrss and name like details about institution
       bool verificationStatus;
       
   }
   mapping(address => profile) public lendersProfile;
   address public manager;
  // lender variable ends here
  
  //creditSeeker variable starts here
  uint public transactionId = 0;
  
  mapping(address => uint) public scores; // credit scores assigned to customers;

  mapping(address => uint[]) public transactionRecords;
  struct creditRequest {
      address creditSeekerAddress;
      address civicId;
      address lenderAddress;
      uint amount;
      uint duration;
      string status;
      uint256 timeStamp;
      uint256 interest;
      uint256 penalty;
      bool lenderVerified;
      bool creditSeekerVerified;
      bool checked;
  }
  
  mapping(uint => creditRequest) public creditRequests;
  
   
   
   
   
   function credit(){
     manager = msg.sender;
  
   }
   modifier onlyOwner(){
       require(msg.sender == manager);
       _;
   }
   
   modifier verifiedLender(address lender){
       require(lendersProfile[lender].verificationStatus == true);
       _;
       
   }
   
   function registerAsLender(address _lenderAddress,string _institutionName,string _idDocumentHash) public {
    profile pf = lendersProfile[_lenderAddress];
    pf.lenderAddress = _lenderAddress;
    pf.institutionName = _institutionName;
    pf.idDocumentHash = _idDocumentHash;
    pf.verificationStatus = false;
    lenders.push(_lenderAddress);
 
       
   }
   
   function verifyLender(address _lender) public onlyOwner {
       profile pf = lendersProfile[_lender];
       pf.verificationStatus = true;
   }
   
   function getLender() public view returns (address[]){
      return lenders;
   }
   
   function applyForCredit(address civicAddress,address _lenderAddress,uint _amount,uint _duration,uint _interest,uint _penalty) public verifiedLender(_lenderAddress){
       transactionId = transactionId + 1;
       transactionRecords[civicAddress].push(transactionId);
       creditRequest cr= creditRequests[transactionId];
       cr.lenderAddress = _lenderAddress;
       cr.creditSeekerAddress = msg.sender;
       cr.civicId = civicAddress;
       cr.amount = _amount;
       cr.duration = _duration;
       cr.status = 'pending';
       cr.timeStamp = now;
       cr.interest = _interest;
       cr.penalty = _penalty;
   }
   
   function verifyRequest(uint _transactionID) public {
       require(creditRequests[_transactionID].lenderAddress == msg.sender);
       scores[creditRequests[_transactionID].lenderAddress] = scores[creditRequests[_transactionID].lenderAddress] + 10;
       creditRequests[_transactionID].status = 'Verified ,Your credit money will be send to you shortly';
   }
     function declineRequest(uint _transactionID) public {
       require(creditRequests[_transactionID].lenderAddress == msg.sender);
       creditRequests[_transactionID].status = 'Rejected';
   }
      
   function paymentAmount(uint _transactionID) public view returns(uint){
       creditRequest cr = creditRequests[_transactionID];
       uint256 AmountToBePaid ;
       require(creditRequests[_transactionID].lenderAddress == msg.sender || creditRequests[_transactionID].creditSeekerAddress == msg.sender);
       if(now - creditRequests[_transactionID].timeStamp > 2 * creditRequests[_transactionID].duration){
           AmountToBePaid = creditRequests[_transactionID].amount + cr.amount * cr.interest/100 + cr.penalty;
           if(cr.checked == false){
             scores[cr.civicId] = scores[cr.civicId] - 5;   
           }
           cr.checked = true;
          
           return AmountToBePaid;
       }
       else {
           AmountToBePaid = creditRequests[_transactionID].amount + cr.amount * cr.interest/100;
           return AmountToBePaid;
           
       }
   }
   
   function paymentVerify(uint transactionId,uint hashOfProof) public {
       creditRequest cr = creditRequests[transactionId];
       require(cr.lenderVerified != true);
       if(msg.sender == cr.creditSeekerAddress){
           cr.creditSeekerVerified = true;
       }
       else if(msg.sender == cr.lenderAddress){
           
           cr.lenderVerified = true;
           cr.status = "Transaction settled";
           if(now - cr.timeStamp > 2 * cr.duration){
               scores[cr.civicId] = scores[cr.civicId] + 5;
           }  
       }
   }
   
   function getTransactionRecords(address civicAddress) public view returns (uint[]){
       return transactionRecords[civicAddress];
   }
    
}
