const Web3 = require('web3');
//const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./build/contracts/Zazzle.json');
const address = '0xe634d62E3c78412165DAcc9547BC0CbFA239a54B';
const privateKey = 'e30495872ee88d814739adeaf0fdd8841675ad7969815c8db4de3e38dc7849f5';
const infuraUrl = 'https://rinkeby.infura.io/v3/ed40d244d07b4beba6246525ad60917b'; 

//to do sign transaction and update data
  exports.transfer = async function(req, res) {
    console.log(req.body);
    const web3 = new Web3(infuraUrl);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract( MyContract.abi, MyContract.networks[networkId].address );

  const tx = myContract.methods.setData(1);
  const gas = await tx.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);

  //console.log(tx, gas, gasPrice,data, nonce);
  console.log(privateKey == req.body.privatekey);
  try{
  const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: myContract.options.address, 
          data,
          gas,
          gasPrice,
          nonce, 
          chainId: networkId
        }, req.body.privatekey); 
      console.log(`Old data value: ${await myContract.methods.data().call()}`);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(`New data value: ${await myContract.methods.data().call()}`);
      res.send(receipt);
      }
      catch(err){
        console.log(err);
      }  
}

//to get eth balance in rinkeby
exports.checkBalance = async function(req, res){

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ed40d244d07b4beba6246525ad60917b"))

const getBal = await web3.eth.getBalance(address, function(err, result) {
  if (err) {
    console.log(err)
  } else {
    //console.log(web3.utils.fromWei(result, "ether") + " ETH");
    tknBal = web3.utils.fromWei(result);
    result = {
      "balanace" : tknBal,
      "ETH": "eth"
    }
    console.log(result);
    res.send(result);
  }
}); 
}

//to get token balance in rinkeby
exports.checkTknBalance = async function(req, res){
const web3 = new Web3(infuraUrl)
let tokenAddress = "0x54cd8339239d6428076fD36129c5E9aB92D936aD";

// The minimum ABI to get ERC20 Token balance
let minABI = [
  // balanceOf
  {
    "constant":true,
    "inputs":[{"name":"_owner","type":"address"}],
    "name":"balanceOf",
    "outputs":[{"name":"balance","type":"uint256"}],
    "type":"function"
  },
  // decimals
  {
    "constant":true,
    "inputs":[],
    "name":"decimals",
    "outputs":[{"name":"","type":"uint8"}],
    "type":"function"
  }
];

let contract = new web3.eth.Contract(minABI,tokenAddress);
async function getBalance() {
  balance = await contract.methods.balanceOf(address).call();
  return balance;
}
getBalance().then(function (balance) {
  result = {
    "balanace" : balance,
    "token": "Zazzle"
  }
  console.log(result);
  res.send(result);
});

//console.log(getBalance());
}