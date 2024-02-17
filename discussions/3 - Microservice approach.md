# 3- Microservices approach

Maintenant que nous avons discuté et critiqué l'état actuel de la plateforme. Nous avons remarqué un gros problème avec le fait qu'elle est basée sur une seule application monolithique.

Il est donc difficile de la maintenir et encore plus de la faire évoluer. Il est également plus difficile de la faire évoluer et de créer ce que l'on appelle un goulot d'étranglement ou un point de défaillance unique.

Notre proposition est de baser la plateforme sur une architecture microservices.

## C'est quoi une architecture microservices?

Dans l'architecture des microservices, les applications sont conçues comme un ensemble de petits services indépendants et faiblement couplés appellées "microservices".

Chaque service est spécialisé dans une fonction métier spécifique et communique avec les autres services grâce à des API (Application Programming Interfaces) bien définies.

Cette modularité offre une plus grande souplesse, une évolutivité et une maintenabilité accrues par rapport aux architectures monolithiques traditionnelles.

## Caracteristics

- Autonomie : Chaque microservice est conçu pour être autonome et indépendant, ce qui signifie qu'il peut être développé, déployé et maintenu de manière indépendante des autres services.
- Modularité : Les microservices sont conçus pour être modulaires, ce qui facilite leur développement, la maintenance et la compréhension.
- Communication via API : Les microservices communiquent entre eux via des protocoles de communication standardisés, généralement basés sur des API.
- Gestion décentralisée des données : Chaque service est responsable de ses propres données, ce qui permet d'assurer l'autonomie et de simplifier la gestion des données.
- Déploiement continu (CI/CD) :  Les microservices peuvent être déployés de manière continue, ce qui permet une innovation plus rapide et une réponse plus rapide aux besoins des utilisateurs.

## Avantages

- Évolutivité : les microservices peuvent être mis à l'échelle individuellement, permettant une allocation efficace des ressources en fonction de la demande de services spécifiques.
- Scalabilité : Les microservices peuvent être escalés indépendamment les uns des autres, ce qui permet d'adapter la capacité de chaque service à la charge de travail spécifique.
- Flexibilité : La modularité et l'autonomie des microservices permettent une plus grande flexibilité dans la conception et la mise en œuvre des systèmes.
- Résilience : Les microservices sont conçus pour être résilients, ce qui signifie que les défaillances d'un microservice ne perturbent pas nécessairement l'ensemble de l'application.
- Facilité de maintenance : On peut apporter des mises à jour ou des corrections de bugs à des services spécifiques sans que cela n'affecte l'ensemble de l'application.
- Vitesse de développement : Les microservices favorisent l'accélération des cycles de développement en permettant aux développeurs de se focaliser sur des fonctionnalités spécifiques de manière autonome.

## Défis

- Changement de culture organisationnelle : Ce changement hiérarchique peut être difficile pour certains membres de l'organisation, nécessitant une adhésion complète à l'initiative.
- Informations cloisonnées : La fragmentation des données sur les patients provoque une fragmentation des données, ce qui engendre des inefficacités, des problèmes de communication et des soins sous-optimaux.
- Problèmes de sécurité : Protéger les données sensibles des patients tout en permettant un accès sécurisé aux professionnels de santé est crucial. Cela nécessite un équilibre délicat entre la sécurité et l'accessibilité.
- Conformité réglementaire : L'intégration informatique doit assurer le respect rigoureux de ces réglementations pour éviter les conséquences juridiques.
