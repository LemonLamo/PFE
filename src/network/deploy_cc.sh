#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

rm -rf handicap.tar.gz

printSeparator "Building chaincode"
cd chaincode
npm install
npm run build
cd ..

# package chaincode into handicap.tar.gz
printSeparator "Packaging chaincode"
switchIdentity "Nord" 8051
peer lifecycle chaincode package handicap.tar.gz --path ./chaincode --lang node --label handicap_1.1
echo "Chaincode 'handicap.tar.gz' packaged correctly"

########### INSTALL
# Install for Nord
printSeparator "Installing chaincode as Nord"
switchIdentity "Nord" 8051
peer lifecycle chaincode install handicap.tar.gz

# Install for Est
printSeparator "Installing chaincode as Est"
switchIdentity "Est" 8052
peer lifecycle chaincode install handicap.tar.gz

# Install for Ouest
printSeparator "Installing chaincode as Ouest"
switchIdentity "Ouest" 8053
peer lifecycle chaincode install handicap.tar.gz

# Install for Sud
printSeparator "Installing chaincode as Sud"
switchIdentity "Sud" 8054
peer lifecycle chaincode install handicap.tar.gz


########### APPROVE
# Approve for Nord
printSeparator "Approving chaincode as Nord"
switchIdentity "Nord" 8051
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --channelID mychannel --name handicap --version 1.1 --package-id $CC_PACKAGE_ID --sequence 3 --tls --cafile $ORDERER_CA

# Approve for Est
printSeparator "Approving chaincode as Est"
switchIdentity "Est" 8052
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --channelID mychannel --name handicap --version 1.1 --package-id $CC_PACKAGE_ID --sequence 3 --tls --cafile $ORDERER_CA

# Approve for Ouest
printSeparator "Approving chaincode as Ouest"
switchIdentity "Ouest" 8053
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --channelID mychannel --name handicap --version 1.1 --package-id $CC_PACKAGE_ID --sequence 3 --tls --cafile $ORDERER_CA

# Approve for Sud
printSeparator "Approving chaincode as Sud"
switchIdentity "Sud" 8054
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --channelID mychannel --name handicap --version 1.1 --package-id $CC_PACKAGE_ID --sequence 3 --tls --cafile $ORDERER_CA


########### APPROVE
# Check for commit ready
printSeparator "Is the chaincode ready to commit?"
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name handicap --version 1.1 --sequence 3 --tls --cafile $ORDERER_CA --output json

# Commit for Est
printSeparator "Committing chaincode (as Nord)"
switchIdentity "Nord" 8051
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --channelID mychannel --name handicap --version 1.1 --sequence 3 --tls --cafile $ORDERER_CA \
--peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/nord.medicalife.dz/peers/peer0.nord.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8052 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/est.medicalife.dz/peers/peer0.est.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8053 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/ouest.medicalife.dz/peers/peer0.ouest.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8054 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/sud.medicalife.dz/peers/peer0.sud.medicalife.dz/tls/ca.crt"

# Init
printSeparator "Calling 'InitLedger' on chaincode (as Nord)"
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.dz --tls --cafile $ORDERER_CA -C mychannel -n handicap \
--peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/nord.medicalife.dz/peers/peer0.nord.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8052 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/est.medicalife.dz/peers/peer0.est.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8053 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/ouest.medicalife.dz/peers/peer0.ouest.medicalife.dz/tls/ca.crt" \
--peerAddresses localhost:8054 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/sud.medicalife.dz/peers/peer0.sud.medicalife.dz/tls/ca.crt" \
-c '{"function":"InitLedger","Args":[]}'
sleep 5
