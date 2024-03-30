#!/usr/bin/python3
import subprocess

subprocess.run(f"kubectl apply -R -f .kubernetes", shell=True)