#!/usr/bin/python3
import subprocess

subprocess.run(f"kubectl delete -R -f .kubernetes", shell=True)