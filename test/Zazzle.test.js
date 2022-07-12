const Zazzle = artifacts.require("Zazzle")

contract("Zazzle", (accounts)=> {
    //console.log(accounts);
    before(async () => {
        zazzle = await Zazzle.deployed()
        console.log("Zazzle address : ", zazzle.address)
    })
    it("give the owner 1M tokens", async() => {
        let balance = await  zazzle.balanceOf(accounts[0])  
        //console.log(web3.utils.fromWei(balance), 'ether')
        balance = web3.utils.fromWei(balance, 'ether')
        assert.equal(balance, '1000000', "Balance should be 1M token for contract creator")
    })

    it("transfer tokens between accounts", async() => {
        let amount = web3.utils.toWei('1000', 'ether')  
        await zazzle.transfer(accounts[1], amount, {from: accounts[0]})

        let balance = await  zazzle.balanceOf(accounts[1])  
        balance = web3.utils.fromWei(balance, 'ether') 
        assert.equal(balance, '1000', "Balance should be 1K token for contract creator")
    })
})