# Setting the orderer's env
setOrdererGlobals() {
        CORE_PEER_LOCALMSPID="OrdererMSP"
        CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
        CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/users/Admin@example.com/msp
}
# Setting the peer's and org's env
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



# Joining channle with peers , Retry if failed
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
# Installing chaincode on a spesfic peer
installChaincode () {
	PEER=$1
	ORG=$2
	# Setting peer env
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

# instantiate chaincode on a spesfic peer
instantiateChaincode () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG
	VERSION=${3:-2.0}

	
		peer chaincode instantiate -o orderer.example.com:7050 -C $CHANNEL_NAME -n mycc -l node -v 2.1 -c '{"Args":["init","a","100","b","200"]}' -P "OR	('Org1MSP.peer')" >&log.txt
		
	echo "===================== Chaincode Instantiation on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
	echo
}


# Query on a spesfic peer
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
	 exit 1
  fi
}

# Invoke on a spesfic peer
chaincodeInvoke () {
	PEER=$1
	ORG=$2
	setGlobals $PEER $ORG
		peer chaincode invoke -o orderer.example.com:7050 -C $CHANNEL_NAME -n mycc -c '{"Args":["registerUser","admin","admin"]}' >&log.txt
	
	echo "===================== Invoke transaction on peer${PEER}.org${ORG} on channel '$CHANNEL_NAME' is successful ===================== "
	echo
}