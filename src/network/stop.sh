#!/bin/bash

COMPOSE_FILES="-f ./docker/docker-compose-hopital1.yaml -f ./docker/docker-compose-hopital2.yaml -f ./docker/docker-compose-orderer.yaml"
IMAGE_TAG=$IMAGETAG docker compose ${COMPOSE_FILES} down --volumes --remove-orphans

rm -rf basic.tar.gz
rm -rf ./crypto-material/*
rm -rf ./system-genesis-block/*
rm -rf ./channel-artifacts/*
