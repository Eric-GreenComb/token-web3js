window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No Web3 Detected... using HTTP Provider')
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8540"));
    }
})

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

function getBalance() {
    var address, wei, balance
    address = document.getElementById("address").value;
    wei = web3.eth.getBalance(address);
    try {
        balance = web3.fromWei(wei, 'ether');
        document.getElementById("output").innerHTML = balance + " ETH";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}

function getERC20Balance() {
    var address, contractAddress, contractABI, tokenContract, decimals, balance, name, symbol, adjustedBalance
    address = document.getElementById("address").value;
    contractAddress = document.getElementById("contractAddress").value;
    contractABI = human_standard_token_abi;

    tokenContract = web3.eth.contract(contractABI).at(contractAddress);

    balance = tokenContract.balanceOf(address);
    name = tokenContract.name();
    symbol = tokenContract.symbol();

    try {
        document.getElementById("output2").innerHTML = balance;
        document.getElementById("output2").innerHTML += " " + symbol + " (" + name + ")";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}