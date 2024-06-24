#python3
import os
#!/usr/bin/python3
import subprocess

registry = "hospital1307"
services = [
    "frontend",
]

cwd = os.path.dirname(os.path.realpath(__file__)) 

for service in services:
    service_name = service.split("/")[-1]
    print(f"** Service {service_name.ljust(25)}:")
    subprocess.run([f"docker build -t {service_name} ./{service}"], shell=True, text=True, cwd=cwd)
    subprocess.run([f"docker tag {service_name} {registry}/{service_name}"], shell=True, text=True, cwd=cwd)
    subprocess.run([f"docker push {registry}/{service_name}"], shell=True, text=True, cwd=cwd)

print("All services built and pushed!")