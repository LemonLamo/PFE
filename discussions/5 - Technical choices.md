# 5- Technical Choices

Dans cette discussion, nous passerons en revue les choix technologiques que nous envisageons et ceux pour lesquels nous aimerions opter.

Merci à [@mfornos](https://github.com/mfornos/) pour le [awesome-microservices](https://github.com/mfornos/awesome-microservices) repo qui nous a aidé à établir notre liste.

## Microservices communication: RESTFUL API (✅ le 20/02/2024)

- Language agnostic & Modulrity: La possibilité de connecter des µ-services programmés dans des langues différentes.
- Sécurité : grâce à des mécanismes d'authentification et d'autorisation courants : OAuth 2.0, JWT...etc.

## Containarization: Docker (✅ le 20/02/2024)

Nous souhaitons isoler notre code en unités plus petites pour plusieurs raisons :

- Indépendance du système vis-à-vis les différents environnements de déploiement, puisque ce code est destiné à être déployé dans différentes instances à l'échelle nationale.
- Meilleure maintenabilité : Le code est plus facile à maintenir, à corriger et à faire évoluer si nécessaire lorsqu'il est divisé en petits morceaux.
- Sécurité : La mise d'une application dans plusieurs conteneurs permet de les isoler et de limiter les conséquences en cas de compromission.

**Pourquoi Docker plutôt qu'une machine virtuelle traditionnelle ?**\
Parce que les conteneurs sont beaucoup plus légers, ce qui va de pair avec le concept de microservices.

## Orchestration: Kubernetes (✅ le 20/02/2024)

Nous voudrions orchestrer nos conteneurs Docker à l'aide de Kubernetes.

- Efficacité et évolutivité : Création automatique de conteneurs et équilibrage de la charge entre les instances.
- Résilience : Redémarrage automatique en cas d'erreurs non gérées.

## Service Discovery: Kube-Proxy, Kubernetes built-in DNS (60% ✅ le 20/02/2024)

Other options:

- **Consul** - La découverte et la configuration des services sont facilitées. Distribué, hautement disponible et adapté au centre de données.
- **NETFLIX Eureka** - Service basé sur REST qui est principalement utilisé dans le nuage AWS pour localiser les services à des fins d'équilibrage de charge et de basculement des serveurs de niveau intermédiaire.

## API Gateway: Kong Ingress Controller (60% ✅ le 20/02/2024)

Nous proposons d'utiliser Kong Ingress Controller, une passerelle API moderne qui gère à la fois le routage, la sécurité et l'équilibrage des charges.

Quelques autres possibilités dans l'ordre :

- **Nginx Ingress Controller** -  Nginx peut être configuré comme une passerelle API et un équilibreur de charge, leur 'dynamic-configuration-api' peut être utilisé pour le registre des services.
- **NETFLIX Zuul** - Passerelle API basée sur Java développée par Netflix.

## Authentication

### Authentication Service: unsure

\<Work in progress\>

### Authentication Mechanism: JSON Web Token (JWT)

Traditionnellement, on peut utiliser des sessions, ce qui signifie que on stock "session-id" dans les cookies de l'utilisateur, puis on le recherche dans un store côté serveur (par exemple, vous recherchez l'user-id associé au sessionid, puis recuperer ses permissions).

Au lieu d'utiliser des sessions, nous choisissons d'utiliser des JSON Web Tokens (JWT), afin de minimiser le stockage de données sur le serveur et pour minimiser le cross-checking (communication inter-service pour verifier les permissions).

**Note:** JWT peut être utilisé pour stocker des données réelles (ex. privilèges) au lieu de s'appuyer sur la consultation d'un identifiant de session dans la base de données (ex. pour consulter les privilèges d'un utilisateur). Cela permet d'alléger le traitement nécessaire côté serveur.

## API Scripting: Mostly Node+Express (✅ le 20/02/2024)

**Note:** Pour la plupart du temps... Sauf exigence contraire pour un service spécifique.

- Node.js convient parfaitement aux applications web en temps réel qui nécessitent un traitement léger du côté du serveur.
  - Pourquoi ? Il fournit un paradigme d'E/S non bloquant qui réduit le temps de réponse entre le client et le serveur web.
  - Pourquoi dans notre cas ? Nous n'avons pas de traitement lourd du côté du serveur de données (à l'intérieur des microservices).
- Express est un framework très léger, très modulaire, avec de nombreux plugins... Idéal pour écrire des API plus petites sous forme de microservices.

## Monitoring Solution: Prometheus + Graffana (80% ✅ le 20/02/2024)

- Capacité à surveiller et analyser
- Offre : Visibilité accrue + Analyse des métriques + Gestion des incidents + une optimisationde la performance + une gestion des ressources + evolotivité individuelle

## Logging Solution: Kibana

- Capacité de visualisation des logs + Analyse des données
- Gestion des incidents + Optimisation de la performance + facilite la gestion des ressources

## Caching Solution : Redis

Redis est un standard de l'industrie en matière de mise en cache.

## Blockchain network : unsure

\<Out of scope at this point in time\>

## CP-ABE Implementation : unsure

\<Out of scope at this point in time\>
