export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

rm -rf ./crypto-material/*
rm -rf ./system-genesis-block/*
rm -rf ./channel-artifacts/*

COMPOSE_FILES="-f ./docker/docker-compose-nord.yaml -f ./docker/docker-compose-est.yaml -f ./docker/docker-compose-ouest.yaml -f ./docker/docker-compose-sud.yaml -f ./docker/docker-compose-orderer.yaml"
IMAGE_TAG=$IMAGETAG docker compose ${COMPOSE_FILES} down --volumes --remove-orphans

. ./utils.sh

printSeparator "Generate crypto-material for Nord"
cryptogen generate --config=./cryptogen-input/crypto-config-nord.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Est"
cryptogen generate --config=./cryptogen-input/crypto-config-est.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Ouest"
cryptogen generate --config=./cryptogen-input/crypto-config-ouest.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Sud"
cryptogen generate --config=./cryptogen-input/crypto-config-sud.yaml --output="crypto-material"

printSeparator "Generate crypto-material for Orderer"
cryptogen generate --config=./cryptogen-input/crypto-config-orderer.yaml --output="crypto-material"

printSeparator "Create Genesis-Block"
configtxgen -profile ApNetworkProfile -configPath ${PWD}/config -channelID system-channel -outputBlock ./system-genesis-block/genesis.block

printSeparator "Create Channel Transaction"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputCreateChannelTx ./channel-artifacts/mychannel.tx -channelID mychannel

printSeparator "Create Anchor Peers Update for Nord"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/NordMSPanchors.tx -channelID mychannel -asOrg Nord

printSeparator "Create Anchor Peers Update for Est"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/EstMSPanchors.tx -channelID mychannel -asOrg Est

printSeparator "Create Anchor Peers Update for Ouest"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/OuestMSPanchors.tx -channelID mychannel -asOrg Ouest

printSeparator "Create Anchor Peers Update for Sud"
configtxgen -profile ApChannelProfile -configPath ${PWD}/config -outputAnchorPeersUpdate ./channel-artifacts/SudMSPanchors.tx -channelID mychannel -asOrg Sud

./start.sh

./create_channel.sh
