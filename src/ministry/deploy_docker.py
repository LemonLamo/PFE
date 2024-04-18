#!/usr/bin/python3
import os
import subprocess

registry = "medicalife"
services = [
    "frontend",

    "auth/auth-db",
    "auth/auth-service",

    "codifications/codifications-db",
    "codifications/codifications-service",

    "consultations/consultations-db",
    "consultations/consultations-service",

    "hopitaux/hopitaux-db",
    "hopitaux/hopitaux-service",

    "hospitalisations/hospitalisations-db",
    "hospitalisations/hospitalisations-service",

    "interventions/interventions-db",
    "interventions/interventions-service",

    "notifications/notifications-db",
    "notifications/notifications-service",

    "patients/patients-db",
    "patients/patients-service",

    "personnel/personnel-db",
    "personnel/personnel-service",

    "prescriptions-bilans-radios/prescriptions-bilans-radios-db",
    "prescriptions-bilans-radios/prescriptions-bilans-radios-service",

    "rendez-vous/rendez-vous-db",
    "rendez-vous/rendez-vous-service",

    "soins/soins-db",
    "soins/soins-service",

    "rabbitmq",

    "cpabe-service",
]

cwd = os.path.dirname(os.path.realpath(__file__)) 

for service in services:
    service_name = service.split("/")[-1]
    print(f"** Service {service_name.ljust(25)}:", end=" ")
    s = subprocess.Popen(f"docker build -t {service_name} ./{service}", shell=True, cwd=cwd)
    s.wait()
    print("built", end=", ")
    s = subprocess.Popen(f"docker tag {service_name} {registry}/{service_name}", shell=True, text=True, cwd=cwd)
    s.wait()
    s = subprocess.Popen(f"docker push {registry}/{service_name}:latest", shell=True, text=True, cwd=cwd)
    s.wait()
    print("pushed!")

print("All services built and pushed!")