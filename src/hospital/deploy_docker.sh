#!/bin/bash
REGISTRY="abdou1307"
SERVICES=(
    "auth/auth-db"
    "auth/auth-service"
    "codification/codification-db"
    "codification/codification-service"
    "frontend"
)

trap "exit 130" SIGINT

for service in "${SERVICES[@]}"
do
    service_name="${service##*/}"
    printf '** Service %-25s:' "$service_name" 
    docker build -t $service_name ./$service &> /dev/null
    printf ' %s' "built"
    docker tag $service_name $REGISTRY/$service_name:latest &> /dev/null
    docker push $REGISTRY/$service_name:latest &> /dev/null
    printf ', %s\n' "pushed!"
done

echo "All services built and pushed!"