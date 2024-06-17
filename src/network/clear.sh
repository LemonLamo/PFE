export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

printSeparator "Test: Clearing ledgers"
switchIdentity "Nord" 8051

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --tls --cafile $ORDERER_CA -C mychannel -n basic \
--peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/nord.medicalife.dz/peers/peer0.nord.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8052 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/est.medicalife.dz/peers/peer0.est.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8053 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/ouest.medicalife.dz/peers/peer0.ouest.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8054 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/sud.medicalife.dz/peers/peer0.sud.medicalife.dz/tls/ca.crt" \
-c '{"function":"DeleteAll","Args":[]}'