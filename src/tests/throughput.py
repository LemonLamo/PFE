import numpy as np
import matplotlib.pyplot as plt

# CONFIG
TITLE = "Throughput vis à vis nombre de patients"
X_AXIS = "Nombre de patients"
Y_AXIS = "Throughput (en requetes)"
x = [10, 100, 1000, 10000, 100000, 1000000]
Y1_LABEL = "Sans Blockchain, Sans CP-ABE"
y1 = [20, 30, 50, 100, 180, 360]
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
