const Web3 = require("web3");
const voting_artifacts = require("../../build/contracts/TokenVoting.json");
const web3 = new Web3(new Web3.providers.HttpProvider("http://118.31.246.132:8545"));

// if (typeof web3 != 'undefined') {
//     window.web3 = new Web3(web3.currentProvider);
// } else {
//     window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
// }

fromAddress = "0x8cbe269fde905f9e849fe677dabdb265f0924527"
netId = 19763

getId = async function () {
    await web3.eth.net.getId().then(res => {
        networkId = res;
    });
    return networkId;
}

getId().then(res => { })
var Voting = new web3.eth.Contract(voting_artifacts.abi, voting_artifacts.networks[netId].address);
let candidates = {};

$(document).ready(function () {
    (async () => {
        await web3.eth.getAccounts().then(res => {
            web3.eth.defaultAccount = res[0];
        });
        populateCandidates();
    })();
})

function populateCandidates() {
    Voting.methods.allCandidate().call().then(candidateArray => {
        for (let i = 0; i < candidateArray.length; i++) {
            candidates[candidateArray[i]] = 'candidate-' + i;
        }
        setupCandidateRows();
        populateCandidateVotes();
        populateTokenData();
    });
}

function setupCandidateRows() {
    Object.keys(candidates).forEach(candidate => {
        $("#candidate-rows").append("<tr><td>" + candidate + "</td><td id='" + candidates[candidate] + "'></td></tr>")
    });
}

function populateCandidateVotes() {
    let candidateNames = Object.keys(candidates);
    for (let i = 0; i < candidateNames.length; i++) {
        Voting.methods.totalVotesFor(candidateNames[i]).call().then(res => {
            $("#" + candidates[candidateNames[i]]).html(res.toString());
        });

    }
}

function populateTokenData() {
    Voting.methods.tokenTotal().call().then(amount => {
        $("#tokens-total").html(amount.toString());
    });
    Voting.methods.totalSold().call().then(amount => {
        $("#tokens-sold").html(amount.toString());
    });
    Voting.methods.tokenPrice().call().then(amount => {
        tokenPrice = amount;
        $("#token-cost").html(amount.toString());
    });
    web3.eth.getBalance(voting_artifacts.networks[netId].address).then(balance => {
        $("#contract-balance").html(balance.toString());
    });
}

//购买token
window.buyTokens = function () {
    let tokensToBuy = $("#buy").val();
    let _value = tokenPrice * tokensToBuy;
    Voting.methods.buyToken().send({ from: fromAddress, value: _value }).then(() => {
        Voting.methods.totalSold().call().then(amount => {
            $("#tokens-sold").html(amount.toString());
        });
        web3.eth.getBalance(voting_artifacts.networks[netId].address).then(balance => {
            $("#contract-balance").html(balance.toString());
        });
    });
}

//投票
window.voteForCandidate = function () {
    let candidateName = $("#candidate").val();
    let voteTokens = $("#vote-tokens").val();
    $("#candidate").val(""); $("#vote-tokens").val("")
    Voting.methods.voteForCandidate(candidateName, voteTokens).send({ from: fromAddress, gas: 999999 }).then(() => {
        Voting.methods.totalVotesFor(candidateName).call().then(res => {
            $("#" + candidates[candidateName]).html(res.toString());
        });
    });
}

//投票人信息
window.lookupVoterInfo = function () {
    let _add = $("#voter-info").val();
    console.log('add ', _add)
    Voting.methods.voterDetails(_add).call().then(res => {
        $("#tokens-bought").html("Token Bought:" + res[0].toString());
        let candidateNames = Object.keys(candidates);
        $("#votes-cast").empty();
        $("#votes-cast").append("Votes cast per candidate: <br>");
        for (let i = 0; i < candidateNames.length; i++) {
            $("#votes-cast").append(candidateNames[i] + ":" + res[1][i].toString() + "<br>");
        }
    })
}