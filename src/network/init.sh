export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

rm -rf ./crypto-material/*
rm -rf ./system-genesis-block/*
rm -rf ./channel-artifacts/*

COMPOSE_FILES="-f ./docker/docker-compose-hopital1.yaml -f ./docker/docker-compose-hopital2.yaml -f ./docker/docker-compose-orderer.yaml"
IMAGE_TAG=$IMAGETAG docker compose ${COMPOSE_FILES} down --volumes --remove-orphans

. ./utils.sh

printSeparator "Generate crypto-material for Hopital1"
cryptogen generate --config=./cryptogen-input/crypto-config-hopital1.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Hopital2"
cryptogen generate --config=./cryptogen-input/crypto-config-hopital2.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Orderer"
cryptogen generate --config=./cryptogen-input/crypto-config-orderer.yaml --output="crypto-material"

printSeparator "Create Genesis-Block"
configtxgen -profile ApNetworkProfile -configPath ${PWD}/config -channelID system-channel -outputBlock ./system-genesis-block/genesis.block

printSeparator "Create Channel Transaction"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputCreateChannelTx ./channel-artifacts/mychannel.tx -channelID mychannel

printSeparator "Create Anchor Peers Update for Hospital 1"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/Hopital1MSPanchors.tx -channelID mychannel -asOrg Hopital1

printSeparator "Create Anchor Peers Update for Hospital 2"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/Hopital2MSPanchors.tx -channelID mychannel -asOrg Hopital2

./start.sh

# -------------------------------------------------------
printSeparator "Wait 5 seconds for network to come up" && sleep 5
# -------------------------------------------------------

printSeparator "Create channel (from Hospital1)"
switchIdentity "Hopital1" 7051
peer channel create -o localhost:7050 -c mychannel --ordererTLSHostnameOverride orderer0.medicalife.com -f ./channel-artifacts/mychannel.tx --outputBlock ./channel-artifacts/mychannel.block --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

printSeparator "Join channel as Hopital1"
switchIdentity "Hopital1" 7051
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Hopital1"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com -c mychannel -f ./channel-artifacts/Hopital1MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

# -------------------------------------------------------

printSeparator "Join channel as Hopital2"
switchIdentity "Hopital2" 8051
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Hopital2"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com -c mychannel -f ./channel-artifacts/Hopital2MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA