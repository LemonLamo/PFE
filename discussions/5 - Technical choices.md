# Technical Choices

## Microservices communication: RESTFUL API

- Modularity.
- Language agnostic: The ability to connect µ-services that were programmed in different languages.
- Security: through authentication and authorization mechanisms: OAuth 2.0, JWT...etc.

## Containarization: Docker

We would want to isolate our code into smaller units for many reasons:

- Consistency across different deployment environments, since this code is destined to be deployed in different instance on a nation-wide scale.

- Better maintainability: Code is easier to maintain, fix, and evolve if needed when it's in smaller chunks.

- Security: Containerizing an applicaiton into multiple containers isolates them and limits after-effects when compromised.

**Why specifically docker instead of a traditional virtual machine?**\
Because containers are much more lightweight and go hand-in-hand with the microservices concept.

## Orchestration: Kubernetes

We would want to orchestrate our docker containers using Kubernetes.

- Efficiency and Scalability: Automatic spawning of containers and load balancing between instances.
- Resilience: Automatic restarts in case of unhandled errors.

## API Gateway vs Reverse Proxy: (Nginx maybe?)

\<Work in progress\>

## API Scripting: Mostly Node+Express

**Note:** Mostly... Unless required otherwise for a specific service.

- Node.js is a great fit for real-time web applications that require light processing on the server’s side
  - Why? It provides a non-blocking I/O paradigm that reduces response time between the client and web server.
  - Why in our case? We do not have heavy processing on the server side (inside the microservices).
- Express is a very lightweight framework, very modular, with lots of plugin support... Ideal for writing smaller APIs as microservices.

## Static File Server: Nginx or Apache

Honestly, nginx or apache would work perfectly fine. As of 2024, the performance difference is negligble.

We lean more towards nginx cause it's a bit more lightweight and a bit more common in scalable applications.

## Frontend framework: Anything works

Honestly, any frontend framework works.

## Monitoring Solution: unsure

\<Work in progress\>

## Logging Solution: unsure

\<Work in progress\>

## Electronic Health Records Cache : Redis

Redis is an industry standard when it comes to caching.

## Blockchain network : unsure

\<Work in progress\>
