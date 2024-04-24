#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh
switchIdentity "Hopital1" 7051 && echoCurrentFabricEnvironment && sleep 1
peer chaincode query -C mychannel -n basic -c '{"Args":["GetAll"]}'