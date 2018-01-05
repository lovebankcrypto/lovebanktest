var LoveAccountBase = artifacts.require("LoveAccountBase");
var LoveBankAccessControl = artifacts.require("LoveBankAccessControl");
var Bank = artifacts.require("Bank");
//var DoubleSigWithdraw = artifacts.require("DoubleSigWithdraw");
var LovePromo = artifacts.require("LovePromo");
var BankCore = artifacts.require("BankCore");

module.exports = function(deployer) {
  deployer.deploy(LoveAccountBase);
  
  deployer.deploy(LoveBankAccessControl);
  deployer.deploy(Bank);
  //deployer.deploy(DoubleSigWithdraw);
  deployer.deploy(LovePromo);
  deployer.deploy(BankCore);
};
