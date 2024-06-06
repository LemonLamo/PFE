import numpy as np
import matplotlib.pyplot as plt

# CONFIG
TITLE = "Throughput en fonction de nombre de DME"
X_AXIS = "Nombre de DME"
Y_AXIS = "Throughput (en requetes)"
x = [10, 100, 1000, 10000, 100000, 1000000]
Y1_LABEL = "Nombre de requetes"
y1 = [35000, 24000, 16000, 12000, 11000, 10000]
#Y2_LABEL = "Avec Blockchain, Avec CP-ABE"
#y2 = [40, 50, 80, 120, 200, 400]

# Create a plot with customized appearance
plt.figure(figsize=(12, 5))  # Set figure size
plt.plot(x, y1, color='#1BA1E2', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y1_LABEL)
#plt.plot(x, y2, color="#6A00FF", marker='o', linestyle='-', linewidth=2, markersize=8, label=Y2_LABEL)

# Add labels, title, legend, and grid
plt.xlabel(X_AXIS, fontsize=12)
plt.ylabel(Y_AXIS, fontsize=12)
plt.title(TITLE, fontsize=14)
plt.legend(fontsize=10)
plt.grid(True)

# Customize scales
plt.xscale("log")

# Add annotations or text
#plt.text(0.5, 0.8, 'Sample Text', fontsize=12, ha='center')

# Show the plot
plt.tight_layout()  # Adjust layout to prevent clipping of labels
plt.show()
