import web3 from './web3';

 const address = "0x2ae2adbc7604b008810a61f7f1e481a7ce330e82";
 const abi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "civicAddress",
				"type": "address"
			},
			{
				"name": "_lenderAddress",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_duration",
				"type": "uint256"
			},
			{
				"name": "_interest",
				"type": "uint256"
			},
			{
				"name": "_penalty",
				"type": "uint256"
			}
		],
		"name": "applyForCredit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_transactionID",
				"type": "uint256"
			}
		],
		"name": "declineRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "civicAddress",
				"type": "address"
			}
		],
		"name": "getTransactionRecords",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "transactionId",
				"type": "uint256"
			},
			{
				"name": "hashOfProof",
				"type": "uint256"
			}
		],
		"name": "paymentVerify",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_lenderAddress",
				"type": "address"
			},
			{
				"name": "_institutionName",
				"type": "string"
			},
			{
				"name": "_idDocumentHash",
				"type": "string"
			}
		],
		"name": "registerAsLender",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_transactionID",
				"type": "uint256"
			}
		],
		"name": "verifyRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_lender",
				"type": "address"
			}
		],
		"name": "verifyLender",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "creditRequests",
		"outputs": [
			{
				"name": "creditSeekerAddress",
				"type": "address"
			},
			{
				"name": "civicId",
				"type": "address"
			},
			{
				"name": "lenderAddress",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			},
			{
				"name": "duration",
				"type": "uint256"
			},
			{
				"name": "status",
				"type": "string"
			},
			{
				"name": "timeStamp",
				"type": "uint256"
			},
			{
				"name": "interest",
				"type": "uint256"
			},
			{
				"name": "penalty",
				"type": "uint256"
			},
			{
				"name": "lenderVerified",
				"type": "bool"
			},
			{
				"name": "creditSeekerVerified",
				"type": "bool"
			},
			{
				"name": "checked",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getLender",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lenders",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "lendersProfile",
		"outputs": [
			{
				"name": "lenderAddress",
				"type": "address"
			},
			{
				"name": "institutionName",
				"type": "string"
			},
			{
				"name": "idDocumentHash",
				"type": "string"
			},
			{
				"name": "verificationStatus",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_transactionID",
				"type": "uint256"
			}
		],
		"name": "paymentAmount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "scores",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "transactionId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactionRecords",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
export default new web3.eth.Contract(abi,address);