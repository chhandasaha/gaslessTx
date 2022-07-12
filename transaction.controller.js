// const Web3 = require ('web3');
const Web3 = require('web3');
//const web3 = new Web3();
const Accounts = require('web3-eth-accounts');
const ethereum_controller = require('./ethereum.controller');
const infuraUrl = 'https://rinkeby.infura.io/v3/ed40d244d07b4beba6246525ad60917b'; 
const web3 = new Web3(infuraUrl);






exports.transfer = async function(req, res) {
  // write transfer code
  console.log(req.body);
  // var accounts = web3.eth.getAccounts(); //woriking fine
  // let acc = await accounts; //working fine
  // console.log(acc); //returning blank arr
  try{
  const signedTx = await web3.eth.accounts.signTransaction({
    to: req.body.to,
    value: req.body.value,
    gas: req.body.gas
  }, req.body.pvt_key)
  // .then(console.log);
  .then(res.send.bind(res));
  }
  catch(err){
    console.log(err);
  } 
 
}

