#!/bin/bash
COMPOSE_FILES="-f ./docker/docker-compose-hopital1.yaml -f ./docker/docker-compose-hopital2.yaml -f ./docker/docker-compose-orderer.yaml"
IMAGE_TAG=$IMAGETAG docker compose ${COMPOSE_FILES} down
