const shim = require('fabric-shim');
const util = require('util');

var Chaincode = class {

  // Initialize the chaincode
  async Init(stub) {
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
    let method = this[ret.fcn];
    if (!method) {
      return shim.success();
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (err) {
      return shim.error(err);
    }
  }

  


//**************************** Family functinality **************************** 


  // Checking if family entry exists and if not it will create it  
  async checkFamily(stub, args) {
    if (args.length != 4) {
      return shim.error('Incorrect number of arguments. Expecting 4');
    }
    // Get args value
    let id = args[0];
    let organization = args[1];
    let amount = args[2]
    let date = args[3]


    // Get the state of the family from the ledger
    let valueInBytes = await stub.getState(id);
    //checking if family exists
    if (valueInBytes.toString() === "") {
      //Create familyInfo object with default values
      let familyInfo = {
        familyId : id,
        income : 'to be changed',
        rent : 'to be changed',
        address : 'to be changed',
        familyMembers: 'to be changed',
        date: date
      }

      // Write the states back to the ledger
      await stub.putState('?'+id, Buffer.from(JSON.stringify(familyInfo)));
    }
  }

  // Get information about a spesfic family
  async getFamilyInfo(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting the family id to query')
    } 
    // Assigning argument value  to variable
    let orgName =  '?' + args[0];

    // Get the state of the organization from the ledger
    let valueInBytes = await stub.getState(orgName);
    // If doesnt exist throw an error
    if (!valueInBytes) {
      throw new Error(JSON.stringify('Failed to get state for ' + args[0]));
    }
    // Get back the value if it exist and return it
    return valueInBytes;
  }


  // Update the information for a spesfic family
  async updateFamily(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 6 arguments')
    } 

    // Assigning arguments value to variables
    let familyId = args[0];
    let income = args[1];
    let rent = args[2];
    let address = args[3];
    let familyMembers = args[4];
    let date = args[5];

    // 
    let valueInBytes = await stub.getState('?'+familyId);
    if (!valueInBytes) {
      throw new Error('Failed to get state of family' + familyId);
    }
    let family =JSON.parse(valueInBytes.toString());
    
    family.income = income 
    family.rent = rent
    family.address = address
    family.familyMembers = familyMembers
    family.date = date

    // Write the states back to the ledger
    await stub.putState('?'+familyId, Buffer.from(JSON.stringify(val)));

  }


//**************************** Aid functinality ****************************


  // Adding a new transaction to the ledger
  async newAid(stub, args ,that) {

    // Checking if family exists and creting an entry if it doesnt 
    let method = that['checkFamily'];
    await method(stub, args,that);

    // Adding aid to family 
    let method1 = that['addAid'];
    await method1(stub, args,that);

    // Updating Orginization's informations
    let method2 = that['updateOrg'];
    await method2(stub, args,that);



  }

 // Adding the transaction to the ledger
 async addAid(stub, args) {
  if (args.length != 4) {
    throw new Error('Incorrect number of arguments. Expecting 4');
  }

    // Assigning arguments value to variables
    let id = args[0];
    let organization = args[1];
    let amount = args[2]
    let date = args[3]

    //create an aid object
    let aid = {
      docType : 'Aid',
      familyId : id,
      amount : amount,
      organization : organization,
      date: date
    }

    // Write the states to the ledger
    await stub.putState(id, Buffer.from(JSON.stringify(aid)));
  }



  // Get the last transaction for a spesfic family
  async lastAid(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the person to query')
    }

    // Assigning arguments value to variable
    let familyId = args[0];

    // Get the state for the family from the ledger
    let valueInBytes = await stub.getState(familyId);
    // Check if it exist
    if (!valueInBytes) {
      // If doesn't exist throw and error
      throw new Error(JSON.stringify('Failed to get state for ' + familyId));
    }

    // If exist Get back the value and return it
    return valueInBytes;
  }
  
  // Get transaction history for a spesfic family 
  async aidHistory(stub, args, that) {
    if (args.length < 1) {
      throw new Error('Incorrect number of arguments. Expecting 1')
    }
    // Assigning arguments value to variable
    let familyId = args[0];
    // Get the state for the family from the ledger and save it in a variable 
    let resultsIterator = await stub.getHistoryForKey(familyId);
    // Getting all the transactions to a spesfic family and saving in a variable
    let method = that['getAllResults'];
    let results = await method(resultsIterator, true);

    // Return back the transaction history
    return Buffer.from(JSON.stringify(results));
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



//**************************** organization functinality ****************************

  // Updating organization's information 
  async updateOrg(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the organization')
    }

    // Assigning arguments value to variables
    let id = args[0];
    let organization = args[1];
    let amount = args[2]
    let date = args[3]

    // Get the state for the organization from the ledger 
    let valueInBytes = await stub.getState('#'+organization);
    // Check if it exist
    if (!valueInBytes) {
      // If doesn't exist throw an error 
      throw new Error('Failed to get state of organization' + organization);
    }
    // Getting the organization's information
    let org =JSON.parse(valueInBytes.toString());
    // changing the values of the object
    org.amountOfDonations = org.amountOfDonations * 1 + amount * 1 
    org.numberOfDonations += 1
    org.amountofLastDonation = amount
    org.lastDonationDate = date

    // Write the states back to the ledger
    await stub.putState('#'+organization, Buffer.from(JSON.stringify(val)));

  }

  async searchByOrg(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting name of the organization to query')
    }
    // Assigning arguments value to variables
    let orgName =  '#' + args[0];

    // Get the state of the originzation from the ledger
    let valueInBytes = await stub.getState(orgName);
    // Check if it exist
    if (!Avalbytes) {
      // If not throw an error
      throw new Error('Failed to get state for ' + args[0]);
    }
    // Get back the state of the orginization  and returning it 
    return valueInBytes;
  }


  

  

  async registerUser(stub,args){
    let user = {
      docType: 'user',
      organizationName: args[0],
      password: args[1],
      amountOfDonations:0,
      numberOfDonations:0,
      amountofLastDonation:0,
      lastDonationDate:'date...' 
    }
    await stub.putState('#' +args[0], Buffer.from(JSON.stringify(user)));
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
