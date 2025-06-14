GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NO_COLOR='\033[0m'

function switchIdentity() {
    ORG=$1
    LOWER_MSP=$(echo $ORG | tr A-Z a-z)
    PORT=$2

    export CORE_PEER_TLS_ENABLED=true
    export ORDERER_CA=${PWD}/crypto-material/ordererOrganizations/medicalife.dz/orderers/orderer0.medicalife.dz/msp/tlscacerts/tlsca.medicalife.dz-cert.pem
    export CORE_PEER_LOCALMSPID=${ORG}MSP
    export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/crypto-material/peerOrganizations/${LOWER_MSP}.medicalife.dz/peers/peer0.${LOWER_MSP}.medicalife.dz/tls/ca.crt
    export CORE_PEER_MSPCONFIGPATH=${PWD}/crypto-material/peerOrganizations/${LOWER_MSP}.medicalife.dz/users/Admin@${LOWER_MSP}.medicalife.dz/msp
    export CORE_PEER_ADDRESS=localhost:${PORT}
}

function echoCurrentFabricEnvironment() {
    echo -e "${YELLOW}Now acting as ${CORE_PEER_LOCALMSPID} ${NO_COLOR}"
    #echo -e "Current environment variables and identities:"
    #echo -e "${YELLOW}CORE_PEER_TLS_ENABLED=${CORE_PEER_TLS_ENABLED}"
    #echo -e "ORDERER_CA=${ORDERER_CA}"
    #echo -e "CORE_PEER_LOCALMSPID=${CORE_PEER_LOCALMSPID}"
    #echo -e "CORE_PEER_TLS_ROOTCERT_FILE=${CORE_PEER_TLS_ROOTCERT_FILE}"
    #echo -e "CORE_PEER_MSPCONFIGPATH=${CORE_PEER_MSPCONFIGPATH}"
    #echo -e "CORE_PEER_ADDRESS=${CORE_PEER_ADDRESS}${NO_COLOR}"
}

function printSeparator() {
    echo -e "${GREEN}"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' +
    echo -e "$1"
    printf '%*s\n' "${COLUMNS:-$(tput cols)}" '' | tr ' ' +
    echo -e "\033[0m"
}
