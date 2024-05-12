export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

# -------------------------------------------------------
printSeparator "Wait 5 seconds for network to come up" && sleep 5
# -------------------------------------------------------

printSeparator "Create channel (from Nord)"
switchIdentity "Nord" 8051
peer channel create -o localhost:7050 -c mychannel --ordererTLSHostnameOverride orderer0.medicalife.dz -f ./channel-artifacts/mychannel.tx --outputBlock ./channel-artifacts/mychannel.block --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

printSeparator "Join channel as Nord"
switchIdentity "Nord" 8051
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Nord"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz -c mychannel -f ./channel-artifacts/NordMSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

# -------------------------------------------------------

printSeparator "Join channel as Est"
switchIdentity "Est" 8052
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Est"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz -c mychannel -f ./channel-artifacts/EstMSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

# -------------------------------------------------------

printSeparator "Join channel as Ouest"
switchIdentity "Ouest" 8053
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Ouest"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz -c mychannel -f ./channel-artifacts/OuestMSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA

# -------------------------------------------------------

printSeparator "Join channel as Sud"
switchIdentity "Sud" 8054
peer channel join -b ./channel-artifacts/mychannel.block

printSeparator "Update Anchor Peers as Sud"
peer channel update -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz -c mychannel -f ./channel-artifacts/SudMSPanchors.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA