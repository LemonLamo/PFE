# Architecture

![Proposed Architecture](figures/architecture.png "Architecture")

As you can see, our architecture is separated into 2 main systems:

- **Healthcare provider system:** this system is to be hosted at different healthcare providers to manage internal data.
- **Ministry of health system:** this system is to be hosted at ministry level to consolidate all the data on a national level.

**Note:** We abstracted away in this representation how the users utilise the systems (meaning.. Mobile applications, Frontend web services...etc)

## Standard services in a microservices architecture

- **API Gateway:** Ensures security, load balancing...
- **Service Registry:** Ensures services can discover eachother.
- **Identity Provider:** Database for accepted credentials.
- **Monitoring Service:** Monitoring the infastructure for performance.
- **Logging Service:** Logs anomalies detected into event logs.

## Common services

- **Codefication service:** used for autocompleting and ensuring standard codifcations.

**Note:**  these services are to be replicated between the 2 systems for performance reasons.

## Healthcare provider system

Here we find services geared towards health practitioners. Some services can be ommitted depending on the nature of the healthcare providing facility:

- **Users management service:** used to manage authorised users and their roles & permissions.
- **Rooms & Beds management service:** used to manage assigned rooms & beds.
- **Medications stock service:** used to manage medications stock information.
- **Hospitalizations service**
- **Visits service**
- **Lab results service**
- **Blockchain node**

## Ministry of health system

- **CP-ABE Encryption service:** Encryption service that implements ciphertext attribute based encryption.
