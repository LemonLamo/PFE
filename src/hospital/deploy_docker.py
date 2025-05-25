#python3
import os
#!/usr/bin/python3
import subprocess

registry = "localhost:5050"
services = [
    "frontend",

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
    s = subprocess.Popen(f"docker push {registry}/{service_name}", shell=True, text=True, cwd=cwd)
    s.wait()
    print("pushed!")
print("All services built and pushed!")