# 2- Platform's Current State

## Architecture

The platform is based on a single monolithic Laravel application. Code is organised following the MVC (Model-View-Controller) design pattern.

## Functionalities

- Personnel management
- Roles & Permissions
- EHR management (Visits, Hospitiliastions, Tests...etc)
- Beds & Rooms
- Medecines stock
- Codifications

## Critiques

- This application is built on a single monolithic application, making it hard to maintain (bugfixes, evolution...) and scale.
- Very low level of isolation. If an attacker gains access, the entire database is compromised.
-  \<Work in progress\>

## API Breakdown

In this part, we will break down the api that already exists seperate routes by functionlities mentioned above.

### Personnel management

- GET, POST, PUT, DELETE /users
  - Varible role being an integer with 3=médecin, 5=infirmier, 6=agent.
- GET, POST, PUT, DELETE /medecins
- GET, POST, PUT, DELETE /infirmiers
- GET, POST, PUT, DELETE /agents

### Roles & Permissions

- GET, POST, PUT, DELETE /roles
- GET POST, PUT, DELETE /permissions

### EHR management

\<Work in progress\>

### Beds & Rooms Management

- GET, POST, PUT, DELETE /chambres
- GET, POST, PUT, DELETE /lits
- POST /lits/:id/assign
  - Used to assign a bed
- \<Work in progress\>

### Medicines Stock Management

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
