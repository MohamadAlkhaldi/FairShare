const shim = require('fabric-shim');
const util = require('util');

var Chaincode = class {

  // Initialize the chaincode
  async Init(stub) {
    console.info('========= example02 Init =========');
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let args = ret.params;
    // initialise only if 4 parameters passed.
    if (args.length != 4) {
      return shim.error('Incorrect number of arguments. Expecting 4');
    }
    let aid = {
        docType : 'aid',
        familyId : 'a',
        amount : 100,
        organization : 'organization'
      }
      let aid1 = {
        docType : 'aid',
        familyId : 'b',
        amount : 200,
        organization : "organization1"
      }
    let A = args[0];
    let B = args[2];
    let Aval = aid;
    let Bval = aid1;
    try {
      await stub.putState(A, Buffer.from(JSON.stringify(Aval)));
      try {
        await stub.putState(B, Buffer.from(JSON.stringify(Bval)));
        return shim.success();
      } catch (err) {
        return shim.error(err);
      }
    } catch (err) {
      return shim.error(err);
    }
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let method = this[ret.fcn];
    if (!method) {
      console.log('no method of name:' + ret.fcn + ' found');
      return shim.success();
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async newAid(stub, args) {
    // if (args.length != 3) {
    //   throw new Error('Incorrect number of arguments. Expecting 3');
    // }
    //if(args[4] === "admin"){
    let A = args[0];
    let B = args[1];
    if (!A || !B) {
      throw new Error('asset holding must not be empty');
    }
    let aid = {
        docType : 'aid',
        familyId : A,
        amount : args[2],
        organization : B,
        date: args[3]
      }
    //Get the state from the ledger
    let Avalbytes = await stub.getState(A);
    // if (!Avalbytes) {
    //   throw new Error('Failed to get state of asset holder A');
    // }
    let Aval = parseInt(Avalbytes.toString());

    // Write the states back to the ledger
    await stub.putState(A, Buffer.from(JSON.stringify(aid)));
    //await stub.putState(B, Buffer.from(Bval.toString()));
// } else {
//   throw new Error('Access denied: Authorization error');
// }
  }

  async lastAid(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the person to query')
    }

    let jsonResp = {};
    let familyId = args[0];

    // Get the state from the ledger
    let Avalbytes = await stub.getState(familyId);
    if (!Avalbytes) {
      jsonResp.error = 'Failed to get state for ' + familyId;
      throw new Error(JSON.stringify(jsonResp));
    }

    //to be removed
    jsonResp.name = familyId;
    jsonResp.amount = Avalbytes.toString();
    console.info('Query Response:');
    console.info(jsonResp);
    //
    return Avalbytes;
  }
  
  async getAllResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.tx_id;
          jsonRes.Timestamp = res.value.timestamp;
          jsonRes.IsDelete = res.value.is_delete.toString();
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString('utf8');
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString('utf8');
          }
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }

  async aidHistory(stub, args, that) {
    if (args.length < 1) {
      throw new Error('Incorrect number of arguments. Expecting 1')
    }
    let familyId = args[0];
    console.info('- start getHistoryForFamily: %s\n', familyId);

    let resultsIterator = await stub.getHistoryForKey(familyId);
    let method = that['getAllResults'];
    let results = await method(resultsIterator, true);

    return Buffer.from(JSON.stringify(results));
  }

  async registerUser(stub,args){
    let user = {
      docType: 'user',
      username: args[0],
      password: args[1] 
    }
     await stub.putState(args[0], Buffer.from(JSON.stringify(user)));
  }
async queryUser(stub,args){
   let user = await stub.getState(args[0]);
    if (!user) {
      jsonResp.error = 'Failed to get state for ' + args[0];
      throw new Error(JSON.stringify(jsonResp));
    }
    return user
    
}



};



shim.start(new Chaincode());
