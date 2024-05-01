# Readme

## Basics

```bash
curl -sSL https://bit.ly/2ysbOFE | bash -s # Install binaries and then move ./fabric-samples/bin to ./
./init.sh # Generates crypto-material (certificates).
./start.sh # Ensures the containers are up and running.
./stop.sh # To stop the current running network (does not tear it down)
./deploy_cc.sh # Builds, Packages, Installs, Approves & Commits the chaincode.
./test.sh # Queries the chaincode "GetAll" function.
```

### How to use?

First time setup:

```bash
./start.sh
./create_channel.sh
./deploy_cc.sh
# <use>
./stop.sh
```

Afterwards:

```bash
./start.sh
# <use>
./stop.sh
```

## Advanced

### Setup ENV variables

```bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config
```

### Connect to "Hospital 1"

```bash
ORG="Hopital1"
LOWER_MSP=$(echo $ORG | tr A-Z a-z)
PORT=7051

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/crypto-material/ordererOrganizations/medicalife.com/orderers/orderer0.medicalife.com/msp/tlscacerts/tlsca.medicalife.com-cert.pem
export CORE_PEER_LOCALMSPID=${ORG}MSP
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/crypto-material/peerOrganizations/${LOWER_MSP}.medicalife.com/peers/peer0.${LOWER_MSP}.medicalife.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-material/peerOrganizations/${LOWER_MSP}.medicalife.com/users/Admin@${LOWER_MSP}.medicalife.com/msp
export CORE_PEER_ADDRESS=localhost:${PORT}
```

### Invoke chaincode

```bash
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer0.medicalife.com --tls --cafile $ORDERER_CA -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital1.medicalife.com/peers/peer0.hopital1.medicalife.com/tls/ca.crt" --peerAddresses localhost:8051 --tlsRootCertFiles "${PWD}/crypto-material/peerOrganizations/hopital2.medicalife.com/peers/peer0.hopital2.medicalife.com/tls/ca.crt" -c '{"function":"AddEntry","Args":["asset3", "green", "6", "BRAHIM", "600"]}'
```

### Query chaincode

```bash
peer chaincode query -C mychannel -n basic -c '{"Args":["GetAll"]}'
```
