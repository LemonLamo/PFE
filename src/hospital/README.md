# Contents of /src/hospital

You'll find here a kubernetes set up for our client system (usable by any "préstataire de service de santé"):

- api_gateway: API Gateway, currently using nginx as a load balancer.

- auth: Authentication service, currently using keycloak.

- frontend: Static file server serving a web app that constitutes the health practitioner's portal, currently using nginx.

- codification_service: Node+Express RESTFUL API serving codifications for : medicaments, maladies, allergies, vaccines, billans, tests, spécialités, parametres_dh_mobiologies, wilayas and communes.

- codification_db: MySQL database for the aformentioned entities.
