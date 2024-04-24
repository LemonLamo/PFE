#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh
printSeparator "Generate crypto-material for Hopital1"
cryptogen generate --config=./cryptogen-input/crypto-config-hopital1.yaml --output="crypto-material"
printSeparator "Generate crypto-material for Hopital2"
cryptogen generate --config=./cryptogen-input/crypto-config-hopital2.yaml --output="crypto-material"
printSeparator "Generate crypto-material for Orderer"
cryptogen generate --config=./cryptogen-input/crypto-config-orderer.yaml --output="crypto-material"
printSeparator "Create Genesis-Block"
configtxgen -profile ApNetworkProfile -configPath ${PWD}/config -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
printSeparator "Start Network within Docker Containers"
docker compose -f ./docker/docker-compose-orderer.yaml up -d
docker compose -f ./docker/docker-compose-hopital1.yaml up -d
docker compose -f ./docker/docker-compose-hopital2.yaml up -d
printSeparator "Create Channel Transaction"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputCreateChannelTx ./channel-artifacts/mychannel.tx -channelID mychannel && sleep 3
printSeparator "Create Anchor Peers Update for Org 1"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/Hopital1MSPanchors.tx -channelID mychannel -asOrg Hopital1
printSeparator "Create Anchor Peers Update for Org 2"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/Hopital2MSPanchors.tx -channelID mychannel -asOrg Hopital2
printSeparator "Wait 3 seconds for network to come up" && sleep 3
printSeparator "Set Identity to Hopital1"
switchIdentity "Hopital1" 7051 && echoCurrentFabricEnvironment
printSeparator "Create channel"
peer channel create -o localhost:7050 -c mychannel --ordererTLSHostnameOverride orderer0.medicalife.com -f ./channel-artifacts/mychannel.tx --outputBlock ./channel-artifacts/mychannel.block --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA
sleep 5
printSeparator "Join Hopital1 to channel"
peer channel join -b ./channel-artifacts/mychannel.block && sleep 1
printSeparator "Update Anchor Peers as Hopital1"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com -c mychannel -f ./channel-artifacts/Hopital1MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA
printSeparator "Set Identity to Hopital2"
switchIdentity "Hopital2" 8051 && echoCurrentFabricEnvironment && sleep 1
printSeparator "Join Hopital2 to channel"
peer channel join -b ./channel-artifacts/mychannel.block
printSeparator "Update Anchor Peers as Hopital2"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com -c mychannel -f ./channel-artifacts/Hopital2MSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA
printSeparator "Done!"