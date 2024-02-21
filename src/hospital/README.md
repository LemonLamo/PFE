# Contents of /src/hospital

## Quick Start

### Requirements

- Ensure Docker Desktop is installed and "Use Kubernetes" is ticked.
- Ensure Kubectl is installed (Note: It is not included in Docker desktop on linux).

### Build & push Docker containers

Build the docker containers and push them to your own docker-hub using a small handy bash script such as:

```bash
./deploy_docker.sh
```

### Deploy Kong Ingress Controller (API Gateway)

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.0.0/standard-install.yaml
helm repo add kong https://charts.konghq.com
helm repo update
helm install kong kong/ingress -n kong --create-namespace
```

### Deploy microservices

```bash
./deploy_k8s.sh
```

### Kill everything

```bash
kubectl delete all --all -n default # to remove all ressources deployed in default namespace
kubectl delete all --all -n kong # to remove all ressources deployed in kong namespace
helm uninstall kong kong/ingress -n kong # to uninstall kong
```

### Add new service

Let's consider adding a new service named "**new_service**", here are the steps to follow:

- Create a create a folder "**new_service**" containing a **Dockerfile** for the service.
- Add the path to the Dockerfile into the **deploy_docker.sh** script.
- Add "**new_service.yaml**" to the .kubernetes folder, Specify the **Deployment** and **Service** object.
- Run the **deploy_docker.sh** and **deploy_k8s.sh** scripts.

## Details

You'll find here a kubernetes set up for our client system (usable by any "préstataire de service de santé"):

- api_gateway: API Gateway, currently using nginx as a load balancer.

- auth: Authentication service, currently using keycloak.

- frontend: Static file server serving a web app that constitutes the health practitioner's portal, currently using nginx.
