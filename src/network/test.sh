export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

printSeparator "Test: Querying 'GetAll' as nord.medicalife.dz"
switchIdentity "Nord" 8051
data=$(peer chaincode query -C mychannel -n basic -c '{"Args":["GetAll"]}')
echo "Data currently in ledger: $data"
echo ""