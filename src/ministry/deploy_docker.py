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
    "notifications/notifications-db",
    "notifications/notifications-service",
    "patients/patients-db",
    "patients/patients-service",
    "ehr/ehr-db",
    "ehr/ehr-service",
    "personnel/personnel-db",
    "personnel/personnel-service"
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