import numpy as np
import matplotlib.pyplot as plt

# CONFIG
TITLE = "Temps de réponse en fonction du nombre de DEMs"
X_AXIS = "Nombre de DEMs"
Y_AXIS = "Temps de réponse (en ms)"
x = [100, 500, 1_000, 5_000, 10_000, 50_000, 100_000]
Y1_LABEL = "En moyen"
y1 = [17.7, 19.1, 19.9, 23.5, 27.8, 32.5, 36.5]

Y2_LABEL = "Recherche d'un patient"
y2 = [5.9, 6.9, 7.4, 7.9, 8.2, 8.9, 9.4]

Y3_LABEL = "Historique d'un patient"
y3 = [25.2, 30.6, 31.1, 33.6, 38.3, 40.3, 42.5]

Y4_LABEL = "Détails d'une consultation"
y4 = [26.2, 29.8, 31, 32.5, 36.9, 38.3, 42]

# Create a plot with customized appearance
plt.figure(figsize=(12, 6))  # Set figure size
plt.plot(x, y1, color='#1BA1E2', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y1_LABEL)
plt.plot(x, y2, color='#673AB7', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y2_LABEL)
plt.plot(x, y3, color='#4CAF50', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y3_LABEL)
plt.plot(x, y4, color='#E53935', marker='o', linestyle='-', linewidth=2, markersize=8, label=Y4_LABEL)

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
