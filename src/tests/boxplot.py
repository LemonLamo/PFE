import matplotlib.pyplot as plt

# Data as separate variables
min_value = 5
max_value = 90
q1=21.5
median = 8.9
q3=25.3
percentile_95 = 25.8
percentile_99 = 48.9

# Prepare the data for the boxplot
box_data = [q1, median, q3]

# Create the boxplot
plt.boxplot(
    [box_data],  # List containing the box data
    notch=True,  # Add notch to show confidence interval around median (optional)
    vert=True,  # Vertical boxplot (default)
    patch_artist=True,  # Enables further customization of box appearance
    showfliers=True  # Show outliers as individual points
)

# Set labels and title
plt.xlabel('Data Groups')  # Adjust label if applicable
plt.ylabel('Values')
plt.title('Boxplot of Data Distribution')

# Customize plot (optional)
# You can adjust colors, linewidths, etc. using the returned boxplot artist

# Show the plot
plt.show()
