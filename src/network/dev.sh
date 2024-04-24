#!/bin/bash
cd chaincode
npm run build
cd ..

./stop.sh
./start.sh
./deploy_cc.sh