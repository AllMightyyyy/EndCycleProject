import numpy as np
import pandas as pd
import os

# Set seed for reproducibility
np.random.seed(42)

# Parameters for data generation
n_hours = 500  # Number of hours to simulate
outdoor_temp_range = (15, 40)  # Min and max outdoor temperature
outdoor_humidity_range = (20, 100)  # Min and max outdoor humidity
ac_target_temp_range = (22, 26)  # AC target temperature when on

# Initialize lists to store data
outdoor_temps = []
outdoor_humidities = []
indoor_temps = []
ac_statuses = []
ac_target_temps = []
indoor_temp_next_hour = []

# Initial indoor temperature
current_indoor_temp = np.random.uniform(18, 28)

for i in range(n_hours):
    # Randomly generate outdoor temperature and humidity
    outdoor_temp = np.random.uniform(*outdoor_temp_range)
    outdoor_humidity = np.random.uniform(*outdoor_humidity_range)

    # Randomly decide if AC is on or off (50% chance)
    ac_status = np.random.choice([0, 1])

    if ac_status == 1:  # AC is on
        ac_target_temp = np.random.uniform(*ac_target_temp_range)
        cooling_rate = 0.7  # How fast the AC cools
        next_indoor_temp = current_indoor_temp - cooling_rate * (current_indoor_temp - ac_target_temp)
    else:  # AC is off
        ac_target_temp = np.nan  # No target temperature when AC is off
        heating_rate = 0.1  # How fast the room heats up or cools without AC
        next_indoor_temp = current_indoor_temp + heating_rate * (outdoor_temp - current_indoor_temp)

    # Save the current data
    outdoor_temps.append(outdoor_temp)
    outdoor_humidities.append(outdoor_humidity)
    indoor_temps.append(current_indoor_temp)
    ac_statuses.append(ac_status)
    ac_target_temps.append(ac_target_temp)
    indoor_temp_next_hour.append(next_indoor_temp)

    # Update current indoor temperature for the next hour
    current_indoor_temp = next_indoor_temp

# Create a DataFrame with the generated data
df = pd.DataFrame({
    'outdoor_temp': outdoor_temps,
    'outdoor_humidity': outdoor_humidities,
    'indoor_temp': indoor_temps,
    'ac_status': ac_statuses,
    'ac_target_temp': ac_target_temps,
    'indoor_temp_next_hour': indoor_temp_next_hour
})

# Specify the path where the file will be saved
csv_file = r'D:\EndCycleProject\machineLearning\synthetic_data.csv'

# Save to CSV (append if file exists)
if os.path.exists(csv_file):
    df.to_csv(csv_file, mode='a', header=False, index=False)  # Append to the file if it exists
else:
    df.to_csv(csv_file, mode='w', index=False)  # Write new file if it doesn't exist

print(f"Data saved to {csv_file}")
