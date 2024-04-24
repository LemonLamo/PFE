#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh
switchIdentity "Hopital1" 7051 && echoCurrentFabricEnvironment && sleep 1
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --tls --cafile $ORDERER_CA -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital1.medicalife.com/peers/peer0.hopital1.medicalife.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital2.medicalife.com/peers/peer0.hopital2.medicalife.com/tls/ca.crt" -c '{"function":"AddEntry","Args":["asset3", "green", "6", "BRAHIM", "600"]}'