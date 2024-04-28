export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

printSeparator "Test: Querying 'GetOne' with $1 as hospital 1"
switchIdentity "Hopital1" 7051
data=$(peer chaincode query -C mychannel -n basic -c '{"Args":["GetOne", "$1"]}')
echo "Data currently in ledger: $data"
echo ""
