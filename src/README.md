# Contents of /src

You'll find here the source code for our platform devised into 3 parts:

## hospital

- Update config files for ip address, look up 192.168.43.x

- Launch the microservices: in 'hospital' folder: kubectl apply -R -f .kubernetes

## ministry

- Update config files for ip address, look up 192.168.43.x... Probably should change those.

- Launch the blockchain network. in 'network' folder: ./start.sh

- Launch the HF explorer. in 'network/explorer' folder: docker compose up

- Launch the microservices: in 'ministry' folder: kubectl apply -R -f .kubernetes

## mobile_app

Work in progress.
