#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

printSeparator "Start Network within Docker Containers"
docker compose -f ./docker/docker-compose-orderer.yaml up -d
docker compose -f ./docker/docker-compose-hopital1.yaml up -d
docker compose -f ./docker/docker-compose-hopital2.yaml up -d
