#!/bin/bash
COMPOSE_FILES="-f ./docker/docker-compose-nord.yaml -f ./docker/docker-compose-est.yaml -f ./docker/docker-compose-ouest.yaml -f ./docker/docker-compose-sud.yaml -f ./docker/docker-compose-orderer.yaml"
IMAGE_TAG=$IMAGETAG docker compose ${COMPOSE_FILES} down
