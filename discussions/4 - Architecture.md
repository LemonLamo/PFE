# 4- Architecture

![Proposed Architecture](figures/architecture.png "Architecture")

Comme vous pouvez le voir, notre architecture est divisée en deux systèmes principaux, chacun emploit une architecture microservices :

- **Système du ministère de la santé:** ce système doit être hébergé au niveau du ministère pour consolider toutes les données au niveau national.
- **Système des prestataires de soins de santé:** ce système doit être hébergé par les différents prestataires de soins de santé pour gérer les données internes.

**Note:** Dans cette représentation, nous avons fait abstraction de la manière dont les utilisateurs se servent des systèmes (c'est-à-dire des applications mobiles, des services web frontaux, etc.) ainsi que le contenu des services.

## Standard services in a microservices architecture

- **API Gateway:** Assure la sécurité, l'équilibrage de la charge...
- **Service Registry:** Assure que les services peuvent se découvrir les uns les autres.
- **Authentication Service (Identity Provider):** Service + Base de données pour les informations d'identification acceptées.
- **Monitoring Service:** Surveille les performances de l'infrastructure.
- **Logging Service:** Enregistre les anomalies détectées dans les journaux d'événements.

## Common services

- **Codefication service:** Utilisé pour l'autocomplétion et la garantie de codifications standard.

**Remarque:** Ces services doivent être répliqués entre les deux systèmes pour des raisons de performance.

## Système des prestataires de soins de santé

On y trouve des services destinés aux praticiens de la santé. Certains services peuvent être omis en fonction de la nature de l'établissement de santé :

- **Personnel management service:** utilisé pour gérer les utilisateurs autorisés.
- **Roles & permissions service:** utilisé pour gérer les utilisateurs autorisés.
- **Rooms & Beds management service:** utilisé pour gérer les chambres et les lits attribués.
- **Medications stock service:** utilisé pour gérer les informations relatives aux stocks de médicaments.
- **Hospitalizations service**
- **Visits service**
- **Lab results service**
- **Blockchain node**

## Système du ministère de la santé

- **CP-ABE Encryption service:** Service de chiffrement qui met en œuvre un chiffrement basé sur les attributs du texte chiffré.
