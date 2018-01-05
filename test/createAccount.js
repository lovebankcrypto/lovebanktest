const debug = require("debug")("ck");
const BigNumber = require("bignumber.js");

const ETH_STRING = web3.toWei(1, "ether");
const FINNEY_STRING = web3.toWei(1, "finney");
const ETH_BN = new BigNumber(ETH_STRING);
const FINNEY_BN = new BigNumber(FINNEY_STRING);
const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const util = require("./util.js");

const BankCore = artifacts.require("./BankCore.sol");
const LoveAccountBase = artifacts.require("./LoveAccountBase.sol");

contract("BankCore", function(accounts) {
    // This only runs once across all test suites
    before(() => util.measureGas(accounts));
    after(() => util.measureGas(accounts));
    if (util.isNotFocusTest("core")) return;
    const eq = assert.equal.bind(assert);
	const ceo = accounts[0];
	const user1 = accounts[1];
	const user2 = accounts[2];
	const user3 = accounts[3];
	const user4 = accounts[4];
	const coo = accounts[5];
	const cfo = accounts[6];
	const gasPrice = 1e11;
	let coreBank;
	const logEvents = [];
  	const pastEvents = [];

  	async function deployContract() {
		debug("deploying contract");
		coreBank = await BankCore.new({from:ceo, gas:5500000});
		// the deployer is the original CEO and can appoint a new one
		const eventsWatch = coreBank.allEvents();
		await coreBank.unpause({from: ceo});
		const paused = await coreBank.paused();
		eq(paused, false);
		eventsWatch.watch((err, res) => {
			if (err) return;
			pastEvents.push(res);
			debug(">>", res.event, res.args);
		});
		logEvents.push(eventsWatch);
	};
	after(function() {
	logEvents.forEach(ev => ev.stopWatching());
	});

	describe("Initial state", function() {
		before(deployContract);

		it("should own contract ceo", async function() {
      	const ceoAddress = await coreBank.ceoAddress();
      	eq(ceoAddress, ceo);

      	const cfoAddress = await coreBank.cfoAddress();
      	eq(cfoAddress, ceo);

      	const cooAddress = await coreBank.cooAddress();
      	eq(cooAddress, ceo);
		});
		
		it("set Clevel charecter", async function() {
      		await util.expectThrow(coreBank.setCEO(ceo,{from: cfo}));
			console.log("Set CEO: "+await coreBank.setCEO.estimateGas(ceo,{from: ceo}));
			await coreBank.setCEO(ceo,{from: ceo});

			await util.expectThrow(coreBank.setCFO(cfo,{from: cfo}));
			console.log("Set CFO: "+await coreBank.setCFO.estimateGas(cfo,{from: ceo}));
			await coreBank.setCFO(cfo,{from: ceo});

			await util.expectThrow(coreBank.setCOO(coo,{from: coo}));
			console.log("Set COO: "+await coreBank.setCOO.estimateGas(coo,{from: ceo}));
			await coreBank.setCOO(coo,{from: ceo});

			const ceoAddress = await coreBank.ceoAddress();
      		eq(ceoAddress, ceo);

			const cfoAddress = await coreBank.cfoAddress();
			eq(cfoAddress, cfo);

			const cooAddress = await coreBank.cooAddress();
			eq(cooAddress, coo);

			console.log("Pause: "+await coreBank.pause.estimateGas({from: cfo}));
			await coreBank.pause({from: cfo});
			console.log("Unpause: "+await coreBank.unpause.estimateGas({from: ceo}));
			await coreBank.unpause({from: ceo});

			await util.expectThrow(coreBank.unpause({from: cfo}));

		});
	});

	describe("Create Love Account", function() {
		before(deployContract);

		it("Create Love Account", async function() {
			await coreBank.createAccount("longlong", "xinxin", user1, user2, {from: user1, value: web3.toWei(1),gas:1500000});

			console.log("Create Account: "+ await coreBank.createAccount.estimateGas("longlong", "xinxin", user2, user4, {from: user2, value: web3.toWei(1),gas:1500000}));
			await coreBank.createAccount("longlong2", "xinxin2", user3, user4, {from: user3, value: web3.toWei(1),gas:1500000});
		});
	
		it("Check ID", async function() {
			acc_0 = await coreBank.getContract(user1, user2);
			acc_1 = await coreBank.getContract(user3, user4);
			console.log("get Contract: "+ await coreBank.getContract.estimateGas(user3, user4));
			const acc_1_bak = await coreBank.getContract(user4, user3);
			eq(acc_1,acc_1_bak);
			balance_1 =  web3.eth.getBalance(acc_1).toNumber();
			// console.log(acc_1);
		});
	
		it("Withdraw", async function() {
			await util.expectThrow(coreBank.bankWithdraw(acc_1, 1, {from:user1})); // wrong user
			await util.expectThrow(coreBank.bankWithdraw(acc_0, 1, {from:user3})); // wrong address
			await util.expectThrow(coreBank.bankWithdraw(acc_1, web3.toWei(1), {from:user3})); // over withdraw

			console.log("Withdraw: "+ await coreBank.bankWithdraw.estimateGas(acc_1, 1, {from: user3}));
			await coreBank.bankWithdraw(acc_1, 1, {from: user3});

			await util.expectThrow(coreBank.bankWithdraw(acc_1, 1, {from:user3})); // conflict
			await util.expectThrow(coreBank.bankWithdraw(acc_1, 1, {from:user4})); // conflict
		});

		it("Confirm", async function() {
			await util.expectThrow(coreBank.bankConfirm(acc_1, 1, {from:user1})); // wrong user
			await util.expectThrow(coreBank.bankConfirm(acc_0, 1, {from:user3})); // wrong address
			await util.expectThrow(coreBank.bankConfirm(acc_1, 3, {from:user3})); // wrong amount
			await util.expectThrow(coreBank.bankConfirm(acc_1, 1, {from:user3})); // wrong user
			console.log("WithdrawConfirm: "+ await coreBank.bankConfirm.estimateGas(acc_1, 1, {from: user4}));

			await coreBank.bankConfirm(acc_1, 1, {from: user4});

			await util.expectThrow(coreBank.bankConfirm(acc_1, 1, {from:user4})); // conflict
			balance_2 =  web3.eth.getBalance(acc_1).toNumber();
			eq(balance_1, balance_2+1);
		});
/**
		it("Withdraw 100 times", async function() {
			// b3 = web3.eth.getBalance(user3).toNumber();
			// b4 = web3.eth.getBalance(user4).toNumber();
			for (var i=0; i<100; i++){
				await coreBank.bankWithdraw(acc_1, 1, {from: user3});
				await coreBank.bankConfirm(acc_1, 1, {from: user4});
				//console.log(i);
				// console.log(web3.eth.getBalance(user3).toNumber()-b3);
				// console.log(web3.eth.getBalance(user4).toNumber()-b4);
				// b3 = web3.eth.getBalance(user3).toNumber();
				// b4 = web3.eth.getBalance(user4).toNumber();
			}
		balance_3 =  web3.eth.getBalance(acc_1).toNumber();
		eq(balance_2, balance_3+100);
		});
 */

		it("Withdraw together", async function() {
			await coreBank.bankWithdraw(acc_0, 1, {from: user1});
			await coreBank.bankWithdraw(acc_1, 1, {from: user3});
			await coreBank.bankConfirm(acc_1, 1, {from: user4});
			await coreBank.bankConfirm(acc_0, 1, {from: user2});
		});

		it("Diary", async function() {
			await util.expectThrow(coreBank.sendDiary(acc_0, "test", {from: user3}));// wrong user
			console.log("Send Diary: "+ await coreBank.sendDiary.estimateGas(acc_0, "test this is a diary for testing and I really like hotpot", {from: user1}));
			await coreBank.sendDiary(acc_0, "test this is a diary for testing and I really like hotpot", {from: user1});
		});

		it("MileStone", async function() {
			await util.expectThrow(coreBank.sendMileStone(acc_0, 1514950472, 1, {from: user1,value:web3.toWei(0.04)})); // wrong choice
			await util.expectThrow(coreBank.sendMileStone(acc_0, 1514950472, 6, {from: user3,value:web3.toWei(0.04)})); // wrong user
			console.log("Send MileStone: "+await coreBank.sendMileStone.estimateGas(acc_0, 1514950472, 6, {from: user1, value:web3.toWei(0.04)}));
			await coreBank.sendMileStone(acc_0, 1514950472, 6, {from: user1, value:web3.toWei(0.04)});
		});

		it("Breakup", async function() {
			await util.expectThrow(coreBank.sendBreakup(acc_0,{from: user3}));// wrong user
			console.log("Send BreakUp: "+await coreBank.sendBreakup.estimateGas(acc_0,{from: user1}));
			await coreBank.sendBreakup(acc_0,{from: user1});
			await util.expectThrow(coreBank.bankWithdraw(acc_0, 1, {from: user1})); // breakup
			await util.expectThrow(coreBank.sendDiary(acc_0, "test ", {from: user1})); // breakup
			await util.expectThrow(coreBank.sendMileStone(acc_0, 1514950666, 6, {from: user1, value:web3.toWei(0.04)})); // breakup
		});

		it("set contract in account", async function() {
			await coreBank.pause({from:ceo});
			const paused = await coreBank.paused();
			eq(paused, true);
			console.log("set contract in account: "+await coreBank.changeBank.estimateGas(acc_1, acc_1,{from:ceo}));
			await coreBank.changeBank(acc_1, acc_1,{from: ceo});
		});
	});

	describe("C-Level Tests", function() {
		before(deployContract);

		it("set Free Time", async function() {
			await coreBank.setCOO(coo,{from: ceo});
			await util.expectThrow(coreBank.setFreeTime(1614950666, 1614950666, {from:ceo})); //wrong user
			await util.expectThrow(coreBank.setFreeTime(1514950666, 1514950666, {from:coo})); // early than now
			console.log("set Free Time: "+await coreBank.setFreeTime.estimateGas(1615037066, 1615037066, {from:coo}));
			await coreBank.setFreeTime(1615037066, 1615037066, {from:coo});
		});

		it("set Fee", async function() {
			await util.expectThrow(coreBank.setFee(10 , 50, web3.toWei(0.04),web3.toWei(0.04),{from:ceo})); //too high
			await util.expectThrow(coreBank.setFee(100 , 50, web3.toWei(0.04),web3.toWei(0.04),{from:coo})); // wrong usernow
			console.log("set Fee: "+await coreBank.setFee.estimateGas(100 , 50, web3.toWei(0.04), web3.toWei(0.04),{from:ceo}));
			await coreBank.setFee(100 , 50, web3.toWei(0.04), web3.toWei(0.04),{from:ceo});
		});

		it("set Confirm", async function() {
			await util.expectThrow(coreBank.setFee(10 , 50, web3.toWei(0.04),web3.toWei(0.04),{from:ceo})); //too high
			await util.expectThrow(coreBank.setFee(100 , 50, web3.toWei(0.04),web3.toWei(0.04),{from:coo})); // wrong usernow
			console.log("set Confirm: "+await coreBank.setConfirm.estimateGas(1500,{from:ceo}));
			await coreBank.setConfirm(1500, {from:ceo});
		});

		it("Withdraw Bank Balance", async function() {
			await coreBank.setCFO(cfo,{from: ceo});
			await util.expectThrow(coreBank.withdrawBalance.estimateGas({from:ceo})); // wrong user
			console.log("Withdraw Bank Balance: "+await coreBank.withdrawBalance.estimateGas({from:cfo}));
			await coreBank.withdrawBalance.estimateGas({from:cfo});
		});

		it("get free time or fee", async function() {
			console.log("get free time: "+await coreBank.getFreeTime.estimateGas({from:coo}));
			await coreBank.getFreeTime.estimateGas({from:coo});
			console.log("get fee: "+await coreBank.getFee.estimateGas({from:ceo}));
			await coreBank.getFee.estimateGas({from:ceo});
		});

		it("set contract", async function() {
			await coreBank.pause({from:coo});
			console.log("set contract: "+await coreBank.setNewAddress.estimateGas(user3,{from:ceo}));
			await coreBank.setNewAddress.estimateGas(user3,{from:ceo});
		});
	});
});


