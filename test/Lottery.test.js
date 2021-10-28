const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;



beforeEach(async() => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contracts
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode})
    .send({from: accounts[0], gas: 1000000});
})

describe('Lottery Contract', () => {
    it('deploy the contract', () => {
     assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
      await lottery.methods.enter().send({
        from: accounts[0], 
        value: web3.utils.toWei('0.02', 'ether')});

        const players = await lottery.methods.getPlayers().call({from: accounts[0]});
        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(1, players.length);
    });

})
