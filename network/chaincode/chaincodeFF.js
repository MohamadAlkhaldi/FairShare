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


};

shim.start(new Chaincode());
