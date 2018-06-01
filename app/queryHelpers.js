var express = require('express');
var bodyParser = require('body-parser');
var Fabric_Client = require('fabric-client');
var path = require('path');
var util = require('util');
var os = require('os');
var bcrypt = require('bcrypt');





var fabric_client = new Fabric_Client();
var blockchainUser = 'user1';
// setting up the network
var channel = fabric_client.newChannel('mychannel');
var peer = fabric_client.newPeer('grpc://localhost:7051');
channel.addPeer(peer);
var peer1 = fabric_client.newPeer('grpc://localhost:8051');
channel.addPeer(peer1);
var order = fabric_client.newOrderer('grpc://localhost:7050')
channel.addOrderer(order);


var member_user = null;
var store_path = path.join(__dirname, '../network/hfc-key-store');
console.log('Store path:'+store_path);
var tx_id = null;

var keyStore = function(state_store){
	fabric_client.setStateStore(state_store);
	var crypto_suite = Fabric_Client.newCryptoSuite();
	var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
	crypto_suite.setCryptoKeyStore(crypto_store);
	fabric_client.setCryptoSuite(crypto_suite);
	return fabric_client.getUserContext(blockchainUser , true);
}

var query = function (req, res) {
	console.log("query",req.body)
	Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then(keyStore).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded user1 from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get user1.... run registerUser.js');
	}

	const request = {
		//targets:[peer,peer1],
		chaincodeId: 'mycc',
		fcn: req.body.fcn,
		args: [req.body.args]
	};

	return channel.queryByChaincode(request);
}).then((query_responses) => {
	console.log("Query has completed, checking results");
	// query_responses number
	if (query_responses && query_responses.length == 2 ) {
		if (query_responses[0] instanceof Error || query_responses[1] instanceof Error) {
			console.error("error from query = ", query_responses[0]);
		} else if(query_responses[0].toString() === query_responses[1].toString()){
			console.log("Response is ", query_responses[0].toString())
			console.log('hiiiii', query_responses.toString())
			res.send(JSON.parse(query_responses[0].toString()))
		}
	} else {
		console.log("No payloads were returned from query");
	}
}).catch((err) => {
	console.error('Failed to query successfullyyyyyyyy :: ' + err);
	res.send('failed')
});
}


var signUp = function(req,res,hash){
	Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then(keyStore).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded '+blockchainUser+' from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get '+blockchainUser+' ... run registerUser.js');
	}

	// get a transaction id object based on the current user assigned to fabric client
	tx_id = fabric_client.newTransactionID();
	console.log("Assigning transaction_id: ", tx_id._transaction_id);
  
   

	// must send the proposal to endorsing peers
	console.log('hash',hash)
	var request = {
		targets:[peer],
		chaincodeId: 'mycc',
		fcn: "registerUser",
		args: [req.body.username,hash],
		chainId: 'mychannel',
		txId: tx_id
	};

	// send the transaction proposal to the peers
	return channel.sendTransactionProposal(request);
}).then((results) => {
	var proposalResponses = results[0];
	var proposal = results[1];
	//console.log('--------->',results[1])
	let isProposalGood = false;
	if (proposalResponses && proposalResponses[0].response &&
		proposalResponses[0].response.status === 200) {
			isProposalGood = true;
			console.log('Transaction proposal was good');
		} else {
			console.error('Transaction proposal was bad');
		}
	if (isProposalGood) {
		console.log(util.format(
			'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
			proposalResponses[0].response.status, proposalResponses[0].response.message));

		// build up the request for the orderer to have the transaction committed
		var request = {
			proposalResponses: proposalResponses,
			proposal: proposal
		};

		// set the transaction listener and set a timeout of 30 sec
		// if the transaction did not get committed within the timeout period,
		// report a TIMEOUT status
		var transaction_id_string = tx_id.getTransactionID(); //Get the transaction ID string to be used by the event processing
		var promises = [];

		var sendPromise = channel.sendTransaction(request);
		promises.push(sendPromise); //we want the send transaction first, so that we know where to check status

		// get an eventhub once the fabric client has a user assigned. The user
		// is required bacause the event registration must be signed
		let event_hub = fabric_client.newEventHub();
		event_hub.setPeerAddr('grpc://localhost:7053');

		// using resolve the promise so that result status may be processed
		// under the then clause rather than having the catch clause process
		// the status
		let txPromise = new Promise((resolve, reject) => {
			let handle = setTimeout(() => {
				event_hub.disconnect();
				resolve({event_status : 'TIMEOUT'}); //we could use reject(new Error('Trnasaction did not complete within 30 seconds'));
			}, 3000);
			event_hub.connect();
			event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
				// this is the callback for transaction event status
				// first some clean up of event listener
				clearTimeout(handle);
				event_hub.unregisterTxEvent(transaction_id_string);
				event_hub.disconnect();

				// now let the application know what happened
				var return_status = {event_status : code, tx_id : transaction_id_string};
				if (code !== 'VALID') {
					console.error('The transaction was invalid, code = ' + code);
					resolve(return_status); // we could use reject(new Error('Problem with the tranaction, event status ::'+code));
				} else {
					console.log('The transaction has been committed on peer ' + event_hub._ep._endpoint.addr);
					resolve(return_status);
					res.send('success')
				}
			}, (err) => {
				//this is the callback if something goes wrong with the event registration or processing
				reject(new Error('There was a problem with the eventhub ::'+err));
			});
		});
		promises.push(txPromise);

		return Promise.all(promises);
	} else {
		console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
	}
})
.catch((err) => {
	console.error('Failed to invoke successfully :: ' + err);
});   
}



var invoke = function (req, res) {
	console.log("invoooookeeee",typeof req.body.args,req.body.args);
Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then(keyStore).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded user1 from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get user1.... run registerUser.js');
	}

	// get a transaction id object based on the current user assigned to fabric client
	tx_id = fabric_client.newTransactionID();
	console.log("Assigning transaction_id: ", tx_id._transaction_id);

	// must send the proposal to endorsing peers
	var request = {
		targets:[peer],
		chaincodeId: 'mycc',
		fcn: req.body.fcn,
		args: req.body.args,
		chainId: 'mychannel',
		txId: tx_id
	};

	// send the transaction proposal to the peers
	return channel.sendTransactionProposal(request);
}).then((results) => {
	var proposalResponses = results[0];
	var proposal = results[1];
	let isProposalGood = false;
	if (proposalResponses && proposalResponses[0].response &&
		proposalResponses[0].response.status === 200) {
			isProposalGood = true;
			console.log('Transaction proposal was good');
		} else {
			console.error('Transaction proposal was bad');
		}
	if (isProposalGood) {
		// console.log(util.format(
		// 	'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s"',
		// 	proposalResponses[0].response.status, proposalResponses[0].response.message));

		// build up the request for the orderer to have the transaction committed
		var request = {
			proposalResponses: proposalResponses,
			proposal: proposal
		};

		// set the transaction listener and set a timeout of 30 sec
		// if the transaction did not get committed within the timeout period,
		// report a TIMEOUT status
		var transaction_id_string = tx_id.getTransactionID(); //Get the transaction ID string to be used by the event processing
		var promises = [];

		// Send the proposal responses that contain the endorsements of a transaction proposal to the orderer for further processing. This is the 2nd phase of the transaction lifecycle in the fabric. 
		var sendPromise = channel.sendTransaction(request);
		promises.push(sendPromise); 
		//we want the send transaction first, so that we know where to check status

		// get an eventhub once the fabric client has a user assigned. The user
		// is required bacause the event registration must be signed
		// An event hub object encapsulates the properties of an event stream on a peer node, through which the peer publishes notifications of blocks being committed in the channel's ledger.
		let event_hub = fabric_client.newEventHub();
		event_hub.setPeerAddr('grpc://localhost:7053');

		// using resolve the promise so that result status may be processed
		// under the then clause rather than having the catch clause process
		// the status
		let txPromise = new Promise((resolve, reject) => {
			let handle = setTimeout(() => {
				event_hub.disconnect();
				resolve({event_status : 'TIMEOUT'}); //we could use reject(new Error('Trnasaction did not complete within 30 seconds'));
			}, 3000);
			event_hub.connect();
			event_hub.registerTxEvent(transaction_id_string, (tx, code) => {
				// this is the callback for transaction event status
				// first some clean up of event listener
				clearTimeout(handle);
				event_hub.unregisterTxEvent(transaction_id_string);
				event_hub.disconnect();

				// now let the application know what happened
				var return_status = {event_status : code, tx_id : transaction_id_string};
				if (code !== 'VALID') {
					console.error('The transaction was invalid, code = ' + code);
					resolve(return_status); // we could use reject(new Error('Problem with the tranaction, event status ::'+code));
				} else {
					console.log('The transaction has been committed on peer ' + event_hub._ep._endpoint.addr);
					resolve(return_status);
					res.send('success')
				}
			}, (err) => {
				//this is the callback if something goes wrong with the event registration or processing
				reject(new Error('There was a problem with the eventhub ::'+err));
			});
		});
		promises.push(txPromise);

		return Promise.all(promises);
	} else {
		console.error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
		throw new Error('Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...');
	}
})

.catch((err) => {
	console.error('Failed to invoke successfully :: ' + err);
});
}

var login = function(req,res){
	var username = '#'+req.body.username;
	var password = req.body.password;
	if(username.toLowerCase() === '#guest'){
		blockchainUser =  'user1' ;
	res.send('guest');
}else {
	
Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then(keyStore).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded '+blockchainUser+' from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get '+blockchainUser+' ... run registerUser.js');
	}

	const request = {
		//targets:[peer],
		chaincodeId: 'mycc',
		fcn: 'queryUser',
		args: [username]
	};

	// send the query proposal to the peer
	return channel.queryByChaincode(request);
}).then((query_responses) => {
	console.log("Query has completed, checking results");
	// query_responses could have more than one results if there multiple peers were used as targets
	if (query_responses && query_responses.length == 2 ) {
		if (query_responses[0] instanceof Error || query_responses[1] instanceof Error) {
			console.error("error from query = ", query_responses[0]);
		} else if(query_responses[0].toString() === query_responses[1].toString()){
			console.log("Response is ", query_responses[0].toString())
			console.log('hiiiii', typeof JSON.parse(query_responses[0].toString()))
			

		bcrypt.compare(password,JSON.parse(query_responses[0].toString()).password, function(err, isMatch) {
    		if (err) return 'error';
			if(isMatch){
				blockchainUser = 'admin';
				res.send(username);
			}else{
				console.log("wrong password")
					res.sendStatus(404)
			}
		})

		}
	} else {
		console.log("No payloads were returned from query");
	}
}).catch((err) => {
	console.error('Failed to query successfully :: ' + err);
});

}
}

// var init = function(){
// 	let user = db.User({
//             userName: "admin",
//             passWord: "admin"           
//           })
//           user.save((err, data) =>{
//             if (err){
//               console.log(err);
//             }
//             else {
//               console.log(data);
//             }
//           })          
// }

module.exports.login = login
module.exports.query = query
module.exports.signUp = signUp
module.exports.invoke = invoke
