# 3- Microservices approach

Now that we've discussed and critiqued the current state of the platform. We notice a big problem with it being based on a single monolithic application.

Thus making it hard to maintain, even harder to evolve. As well as making it more harder to scale and creating what's known as a bottleneck or a single point of failure.

Our proposition is to base the platform on a microservices architecture.

## What is a microservices architecture?

Dans l'architecture des microservices, les applications sont conçues comme un ensemble de petits services indépendants et faiblement couplés appellées "microservices".

Chaque service est spécialisé dans une fonction métier spécifique et communique avec les autres services grâce à des API (Application Programming Interfaces) bien définies.

Cette modularité offre une plus grande souplesse, une évolutivité et une maintenabilité accrues par rapport aux architectures monolithiques traditionnelles.

## Caracteristics

- Autonomie : Chaque microservice est conçu pour être autonome et indépendant, ce qui signifie qu'il peut être développé, déployé et maintenu de manière indépendante des autres services.
- Modularité : Les microservices sont conçus pour être modulaires, ce qui facilite leur développement, la maintenance et la compréhension.
- Communication via API : Les microservices communiquent entre eux via des protocoles de communication standardisés, généralement basés sur des API.
- Gestion décentralisée des données : Chaque service est responsable de ses propres données, ce qui permet d'assurer l'autonomie et de simplifier la gestion des données.
- Déploiement continu (CI/CD) :  Les microservices peuvent être déployés de manière continue, ce qui permet une innovation plus rapide et une réponse plus rapide aux besoins des utilisateurs.

## Advantages

- Évolutivité : les microservices peuvent être mis à l'échelle individuellement, permettant une allocation efficace des ressources en fonction de la demande de services spécifiques.
- Scalabilité : Les microservices peuvent être escalés indépendamment les uns des autres, ce qui permet d'adapter la capacité de chaque service à la charge de travail spécifique.
- Flexibilité : La modularité et l'autonomie des microservices permettent une plus grande flexibilité dans la conception et la mise en œuvre des systèmes.
- Résilience : Les microservices sont conçus pour être résilients, ce qui signifie que les défaillances d'un microservice ne perturbent pas nécessairement l'ensemble de l'application.
- Facilité de maintenance : On peut apporter des mises à jour ou des corrections de bugs à des services spécifiques sans que cela n'affecte l'ensemble de l'application.
- Vitesse de développement : Les microservices favorisent l'accélération des cycles de développement en permettant aux développeurs de se focaliser sur des fonctionnalités spécifiques de manière autonome.

## Challenges

\<Work in progress\>