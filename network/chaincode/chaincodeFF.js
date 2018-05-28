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

  

};

shim.start(new Chaincode());
