export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

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
