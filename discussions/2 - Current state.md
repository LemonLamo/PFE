# 2- Platform's Current State

## Architecture

La plateforme est basée sur une seule application monolithique Laravel. Le code est organisé selon le design pattern MVC (Model-View-Controller).

## Fonctionalités

- Gestion du personnel
- Rôles et permissions
- Gestion du DSE (Visites, Hospitalisations, Tests...etc)
- Lits et chambres
- Stock de médicaments
- Codifications

## Critiques

- Cette application est construite sur une seule application monolithique, ce qui la rend difficile à maintenir (corrections de bogues, évolution...) et aussi pose des problèmes de scalabilité.
- Niveau d'isolation très faible. Si un attaquant y accède, la base de données entière est compromise.
- Le manque de cache ce qui met la base de données sous pression et peut entraîner des pannes et des temps de réponse lents.
- Le manque de logging system ce qui signifie que le site web peut être confronté à des difficultés dans le suivi et le dépannage des problèmes de manière efficace.

## API Breakdown

Dans cette partie, nous allons décomposer l'API qui existe déjà en routes séparées par les fonctionnalités mentionnées ci-dessus.

### Gestion du personnel

- GET, POST, PUT, DELETE /users
  - Varible role étant un entier dont 3=médecin, 5=infirmier, 6=agent.
- GET, POST, PUT, DELETE /medecins
- GET, POST, PUT, DELETE /infirmiers
- GET, POST, PUT, DELETE /agents

### Rôles et permissions

- GET, POST, PUT, DELETE /roles
- GET POST, PUT, DELETE /permissions

### Gestion de DSE (Dossier de Santé electronique)

\<Work in progress\>

### Gestion des lits et chambres

- GET, POST, PUT, DELETE /chambres
- GET, POST, PUT, DELETE /lits
- POST /lits/:id/assign
  - Used to assign a bed
- \<Work in progress\>

### Stock de médicaments

- GET, POST, PUT, DELETE /medicamenthopital

### Codificaitons

- GET /maladies?search=\
GET /maladies/:id

- GET /medicament?search=\
GET /medicament/:id

- GET /allergies?search=\
GET /allergies/:id

- GET /vaccins?search=\
GET /vaccins/:id

- GET /bilans?search=\
GET /bilans/:id

- GET /tests?search=\
GET /tests/:id

- GET /speciality?search=\
GET /speciality/:id

- GET /param_tres_dh_mobiologies

- GET /wilayas?search\
GET /wilayas/:id\
GET /wilayas/:id/communes\
GET /wilayas/:id/communes/:id
