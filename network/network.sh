#!/bin/bash

export PATH=${PWD}/../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=${PWD}


function printHelp () {
  echo "Usage: "
  echo "  network.sh up|down|generate "
  echo "  network.sh -h|--help (print this message)"
  echo "    <mode> - one of 'up', 'down', 'generate'"
  echo "      - 'up' - bring up the network with docker-compose up"
  echo "      - 'down' - clear the network with docker-compose down"
  echo "      - 'generate' - generate required certificates and genesis block"
  echo "	network.sh generate"
  echo "	network.sh up"
  echo "	network.sh down"
}






function networkUp () {

  if [ ! -d "crypto-config" ]; then
    generateCerts
    replacePrivateKey
    generateChannelArtifacts
  fi
  
    IMAGE_TAG="latest" docker-compose -f docker-compose-cli.yaml -f docker-compose-couch.yaml up -d 2>&1
  
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Unable to start network"
    exit 1
  fi

  docker exec cli scripts/script.sh "mychannel" 3 node 10
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Test failed"
    exit 1
  fi
}


function networkDown () {
  docker-compose -f docker-compose-cli.yaml -f docker-compose-couch.yaml down --volumes
  docker-compose -f docker-compose-cli.yaml down --volumes
    CONTAINER_IDS=$(docker ps -aq)
  if [ -z "$CONTAINER_IDS" -o "$CONTAINER_IDS" == " " ]; then
    echo "---- No containers available for deletion ----"
  else
    docker rm -f $CONTAINER_IDS
  fi

    DOCKER_IMAGE_IDS=$(docker images | grep "dev\|none\|test-vp\|peer[0-9]-" | awk '{print $3}')
  if [ -z "$DOCKER_IMAGE_IDS" -o "$DOCKER_IMAGE_IDS" == " " ]; then
    echo "---- No images available for deletion ----"
  else
    docker rmi -f $DOCKER_IMAGE_IDS
  fi
    rm -f docker-compose-e2e.yaml
    rm -r hfc-key-store 
  
}


function replacePrivateKey () {
  ARCH=`uname -s | grep Darwin`
  if [ "$ARCH" == "Darwin" ]; then
    OPTS="-it"
  else
    OPTS="-i"
  fi

 
  cp docker-compose-e2e-template.yaml docker-compose-e2e.yaml


  CURRENT_DIR=$PWD
  cd crypto-config/peerOrganizations/org1.example.com/ca/
  PRIV_KEY=$(ls *_sk)
  cd "$CURRENT_DIR"
  sed $OPTS "s/CA1_PRIVATE_KEY/${PRIV_KEY}/g" docker-compose-e2e.yaml
  # If MacOSX, remove the temporary backup of the docker-compose file
  if [ "$ARCH" == "Darwin" ]; then
    rm docker-compose-e2e.yamlt
  fi
}

function generateCerts (){
  which cryptogen
  if [ "$?" -ne 0 ]; then
    echo "cryptogen tool not found. exiting"
    exit 1
  fi
  echo
  echo "********** Generate certificates **********"


  if [ -d "crypto-config" ]; then
    rm -Rf crypto-config
  fi
  set -x
  cryptogen generate --config=./crypto-config.yaml
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate certificates..."
    exit 1
  fi
  echo
}


function generateChannelArtifacts() {
  which configtxgen
  if [ "$?" -ne 0 ]; then
    echo "configtxgen tool not found. exiting"
    exit 1
  fi


  echo "**********  Generating Orderer Genesis block **********"

  set -x
  configtxgen -profile OrgOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate orderer genesis block..."
    exit 1
  fi
  echo

  echo "********** Generating channel configuration transaction 'channel.tx' **********"

  set -x
  configtxgen -profile OrgChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID "mychannel"
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate channel configuration transaction..."
    exit 1
  fi

  echo
  echo "********** Generating anchor peer update for Org1MSP **********"
  set -x
  configtxgen -profile OrgChannel -outputAnchorPeersUpdate ./channel-artifacts/Org1MSPanchors.tx -channelID "mychannel" -asOrg Org1MSP
  res=$?
  set +x
  if [ $res -ne 0 ]; then
    echo "Failed to generate anchor peer update for Org1MSP..."
    exit 1
  fi


 }

# Obtain the OS and Architecture string that will be used to select the correct
# native binaries for your platform
OS_ARCH=$(echo "$(uname -s|tr '[:upper:]' '[:lower:]'|sed 's/mingw64_nt.*/windows/')-$(uname -m | sed 's/x86_64/amd64/g')" | awk '{print tolower($0)}')

# Parse commandline args
if [ "$1" = "-m" ];then	
    shift
fi
MODE=$1;shift



while getopts "h?m:" opt; do
  case "$opt" in
    h|\?)
      printHelp
      exit 0
    ;;
  esac
done



if [ "${MODE}" == "up" ]; then
  networkUp
elif [ "${MODE}" == "down" ]; then 
  networkDown
elif [ "${MODE}" == "generate" ]; then 
  generateCerts
  replacePrivateKey
  generateChannelArtifacts
else
  printHelp
  exit 1
fi
