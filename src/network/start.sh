#!/bin/bash
export PATH=${PWD}/bin:$PATH
export FABRIC_CFG_PATH=${PWD}/config

. ./utils.sh

printSeparator "Start Network within Docker Containers"
docker compose -f ./docker/docker-compose-orderer.yaml up -d
docker compose -f ./docker/docker-compose-nord.yaml up -d
docker compose -f ./docker/docker-compose-est.yaml up -d
docker compose -f ./docker/docker-compose-ouest.yaml up -d
docker compose -f ./docker/docker-compose-sud.yaml up -d
