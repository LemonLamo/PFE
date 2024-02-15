# 5- Technical Choices

In this discussion, we'll go over technology choices we are considering and which ones we would like to opt for. 

Thanks to [@mfornos](https://github.com/mfornos/) for the [awesome-microservices](https://github.com/mfornos/awesome-microservices) repo which helpled us curate our list.

## Microservices communication: RESTFUL API

- Language agnostic & Modulrity: The ability to connect µ-services that were programmed in different languages.
- Security: through popular authentication and authorization mechanisms: OAuth 2.0, JWT...etc.

## Containarization: Docker

We would want to isolate our code into smaller units for many reasons:

- Consistency across different deployment environments, since this code is destined to be deployed in different instance on a nation-wide scale.
- Better maintainability: Code is easier to maintain, fix, and evolve if needed when it's in smaller chunks.
- Security: Containerizing an applicaiton into multiple containers isolates them and limits after-effects when compromised.

**Why specifically docker instead of a traditional virtual machine?**\
Because containers are much more lightweight, which goes hand-in-hand with the microservices concept.

## Orchestration: Kubernetes

We would want to orchestrate our docker containers using Kubernetes.

- Efficiency and Scalability: Automatic spawning of containers and load balancing between instances.
- Resilience: Automatic restarts in case of unhandled errors.

## API Gateway vs Reverse Proxy + Load Balancer: (NETFLIX Zuul, Kong or Nginx)

We propose using a modern API Gateway that handles both routing, security, load balancing.

Some examples being:

- **NETFLIX Zuul** - Java based API Gateway developped by Netflix.
- **Kong** - Open Source API Gateway that supports routing, authentication and load balancing.
- **Nginx** - Nginx can be configured as anAPI gateway and load balancer, their 'dynamic-configuration-api' can be used for service registry

## Service Discovery (Consul, NETFLIX Eureka)

- **Consul** - Service discovery and configuration made easy. Distributed, highly available, and datacenter-aware.
- **NETFLIX Eureka** - REST based service that is primarily used in the AWS cloud for locating services for the purpose of load balancing and failover of middle-tier servers.
- Another option is to write a custom service discovery service.

## Authentication

### Authentication Service: idk

### Authentication Mechanism: JWT

Traditionally, you can use sessions, meaning you store an ID on the user's cookies, then look it up from a store on the server side (as an example, you'd look up the user id associated with the session, then look up his permissions)

Instead of using sessions, we opt to use json web tokens (JWT), to minimise data storage on the server side and instead store json web.

**Note:** JWT can be used to store actual data (ex. privs) instead of relying on database lookup of a session id (ex. to look up privs for an authenticated user). Which alleviates some of the processing needed on the server side.

## API Scripting: Mostly Node+Express

**Note:** Mostly... Unless required otherwise for a specific service.

- Node.js is a great fit for real-time web applications that require light processing on the server’s side
  - Why? It provides a non-blocking I/O paradigm that reduces response time between the client and web server.
  - Why in our case? We do not have heavy processing on the data server side (inside the microservices).
- Express is a very lightweight framework, very modular, with lots of plugin support... Ideal for writing smaller APIs as microservices.

## Static File Server: Nginx or Apache

Honestly, nginx or apache would work perfectly fine. As of 2024, the performance difference is negligble.

We lean more towards nginx cause it's a bit more lightweight and a bit more common in scalable applications.

## Frontend framework: Anything works

Honestly, any frontend framework works.

## Monitoring Solution: (Prometheus + Graffana or OpenTelemetry)

\<Work in progress\>

## Logging Solution: Kibana

\<Work in progress\>

## Caching Solution : Redis

Redis is an industry standard when it comes to caching.

## Blockchain network : unsure

\<Work in progress\>
