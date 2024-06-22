import numpy as np
import matplotlib.pyplot as plt

# CONFIG
TITLE = "Temps de réponse en fonction de nombre de DME"
X_AXIS = "Nombre de DME"
Y_AXIS = "Temps de réponse (en ms)"
x = [10, 100, 500, 1_000, 5_000, 10_000, 50_000, 100_000]
Y1_LABEL = "Temps de réponse (en ms)"
y1 = [19.1, 22.9, 23.8, 25.5, 43, 67, 120, 256]

# Create a plot with customized appearance
plt.figure(figsize=(12, 5))  # Set figure size
plt.plot(x, y1, color='#1BA1E2', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y1_LABEL)

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
