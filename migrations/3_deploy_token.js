const TokenVoting = artifacts.require("TokenVoting");
 
module.exports = function(deployer) {
  deployer.deploy(TokenVoting,10,1,["0x1234","0x2344","0x3456"])
};