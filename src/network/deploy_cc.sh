#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

rm -rf basic.tar.gz

printSeparator "Building chaincode"
cd chaincode
npm install
npm run build
cd ..

# package chaincode into basic.tar.gz
printSeparator "Packaging chaincode (as Hospital 1)"
switchIdentity "Hopital1" 7051
peer lifecycle chaincode package basic.tar.gz --path ./chaincode --lang node --label basic_1.0

# Install for Hopital1
printSeparator "Installing chaincode as Hospital1"
switchIdentity "Hopital1" 7051
peer lifecycle chaincode install basic.tar.gz

# Install for Hopital2
printSeparator "Installing chaincode as Hospital2"
switchIdentity "Hopital2" 8051
peer lifecycle chaincode install basic.tar.gz

# Approve for Hopital1
printSeparator "Approving chaincode as Hospital1"
switchIdentity "Hopital1" 7051
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA

# Approve for Hopital2
printSeparator "Approving chaincode as Hospital2"
switchIdentity "Hopital2" 8051
output=$(peer lifecycle chaincode queryinstalled)
export CC_PACKAGE_ID=$(echo "$output" | grep -o 'Package ID: [^,]*' | cut -d' ' -f3)
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --channelID mychannel --name basic --version 1.0 --package-id $CC_PACKAGE_ID --sequence 1 --tls --cafile $ORDERER_CA

# Check for commit ready
printSeparator "Is the chaincode ready to commit?"
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile $ORDERER_CA --output json

# Commit for Hopital2
printSeparator "Committing chaincode (as Hospital 2)"
switchIdentity "Hopital2" 8051
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --channelID mychannel --name basic --version 1.0 --sequence 1 --tls --cafile $ORDERER_CA --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital1.medicalife.com/peers/peer0.hopital1.medicalife.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital2.medicalife.com/peers/peer0.hopital2.medicalife.com/tls/ca.crt"

# Init
printSeparator "Calling 'InitLedger' on chaincode (as Hospital 2)"
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --tls --cafile $ORDERER_CA -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital1.medicalife.com/peers/peer0.hopital1.medicalife.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital2.medicalife.com/peers/peer0.hopital2.medicalife.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'
sleep 5
