

setOrdererGlobals() {
        CORE_PEER_LOCALMSPID="OrdererMSP"
        CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
        CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/users/Admin@example.com/msp
}

setGlobals () {
	PEER=$1
	ORG=$2
	if [ $ORG -eq 1 ] ; then
		CORE_PEER_LOCALMSPID="Org1MSP"
		CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
		CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
		if [ $PEER -eq 0 ]; then
			CORE_PEER_ADDRESS=peer0.org1.example.com:7051
		else
			CORE_PEER_ADDRESS=peer1.org1.example.com:7051
		fi
	else
		echo "================== ERROR !!! ORG Unknown =================="
	fi

	env |grep CORE
}



joinChannelWithRetry () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG

        set -x
	peer channel join -b $CHANNEL_NAME.block  >&log.txt
	res=$?
        set +x
	cat log.txt
	if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
		COUNTER=` expr $COUNTER + 1`
		echo "peer${PEER}.org${ORG} failed to join the channel, Retry after $DELAY seconds"
		sleep $DELAY
		joinChannelWithRetry $PEER $ORG
	else
		COUNTER=1
	fi
	
}

installChaincode () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG
	VERSION=${3:-2.1}
        set -x
	peer chaincode install -n mycc -v ${VERSION} -l node -p ${CC_SRC_PATH} >&log.txt
	res=$?
        set +x
	cat log.txt
	
	echo "===================== Chaincode is installed on peer${PEER}.org${ORG} ===================== "
	echo
}

instantiateChaincode () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG
	VERSION=${3:-2.0}

	
		peer chaincode instantiate -o orderer.example.com:7050 -C $CHANNEL_NAME -n mycc -l node -v 2.1 -c '{"Args":["init","a","100","b","200"]}' -P "OR	('Org1MSP.peer')" >&log.txt
		
	echo "===================== Chaincode Instantiation on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
	echo
}


chaincodeQuery () {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG
  EXPECTED_RESULT=$3
  echo "===================== Querying on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME'... ===================== "
  local rc=1
  local starttime=$(date +%s)

  # continue to poll
  # we either get a successful response, or reach TIMEOUT
  while test "$(($(date +%s)-starttime))" -lt "$TIMEOUT" -a $rc -ne 0
  do
     sleep $DELAY
     echo "Attempting to Query peer${PEER}.org${ORG} ...$(($(date +%s)-starttime)) secs"
     set -x
     peer chaincode query -C $CHANNEL_NAME -n mycc -c '{"Args":["lastAid","a"]}' >&log.txt
	 res=$?
     set +x
     test $res -eq 0 && VALUE=$(cat log.txt | awk '/Query Result/ {print $NF}')
     let rc=0
     echo " result   ${VALUE}"
  done
  echo
  cat log.txt
  if test $rc -eq 0 ; then
	 echo "===================== Query on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
  else
	 echo "!!!!!!!!!!!!!!! Query result on peer${PEER}.org${ORG} is INVALID !!!!!!!!!!!!!!!!"
         echo "================== ERROR !!! FAILED to execute End-2-End Scenario =================="
	 echo
	 exit 1
  fi
}
fetchChannelConfig() {
  CHANNEL=$1
  OUTPUT=$2

  setOrdererGlobals

  echo "Fetching the most recent configuration block for the channel"

    peer channel fetch config config_block.pb -o orderer.example.com:7050 -c $CHANNEL --cafile $ORDERER_CA
 

  echo "Decoding config block to JSON and isolating config to ${OUTPUT}"

  configtxlator proto_decode --input config_block.pb --type common.Block | jq .data.data[0].payload.data.config > "${OUTPUT}"

}

signConfigtxAsPeerOrg() {
        PEERORG=$1
        TX=$2
        setGlobals 0 $PEERORG
        set -x
        peer channel signconfigtx -f "${TX}"
        set +x
}


createConfigUpdate() {
  CHANNEL=$1
  ORIGINAL=$2
  MODIFIED=$3
  OUTPUT=$4

  set -x
  configtxlator proto_encode --input "${ORIGINAL}" --type common.Config > original_config.pb
  configtxlator proto_encode --input "${MODIFIED}" --type common.Config > modified_config.pb
  configtxlator compute_update --channel_id "${CHANNEL}" --original original_config.pb --updated modified_config.pb > config_update.pb
  configtxlator proto_decode --input config_update.pb  --type common.ConfigUpdate > config_update.json
  echo '{"payload":{"header":{"channel_header":{"channel_id":"'$CHANNEL'", "type":2}},"data":{"config_update":'$(cat config_update.json)'}}}' | jq . > config_update_in_envelope.json
  configtxlator proto_encode --input config_update_in_envelope.json --type common.Envelope > "${OUTPUT}"
  set +x
}

chaincodeInvoke () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG
		peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n mycc -c '{"Args":["registerUser","admin","admin"]}' >&log.txt
	
	echo "===================== Invoke transaction on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
	echo
}