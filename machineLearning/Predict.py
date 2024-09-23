import pandas as pd
import joblib  # To load the saved model and scaler

# Define the paths where the model and scaler are saved
model_path = r'D:\EndCycleProject\machineLearning\trained_regression_model.pkl'
scaler_path = r'D:\EndCycleProject\machineLearning\scaler.pkl'

# Load the saved model and scaler
model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# Real-time input data (replace these with actual sensor or user inputs)
current_outdoor_temp = 30  # Example: fetched from a weather API
current_outdoor_humidity = 65  # Example: fetched from a weather API
current_indoor_temp = 36  # Example: fetched from a sensor inside the room
ac_status = 1  # 1 if the AC is on, 0 if off
ac_target_temp = 24  # Set by the user or system (if AC is on)

# Organize the new data into a DataFrame (similar to the format used for training)
input_data = pd.DataFrame([[current_outdoor_temp, current_outdoor_humidity, current_indoor_temp, ac_status, ac_target_temp]],
                          columns=['outdoor_temp', 'outdoor_humidity', 'indoor_temp', 'ac_status', 'ac_target_temp'])

# Scale the new data using the saved scaler
input_data_scaled = scaler.transform(input_data)

# Make a prediction using the saved model
predicted_indoor_temp = model.predict(input_data_scaled)

# Display the predicted indoor temperature
print(f"Predicted indoor temperature for the next hour: {predicted_indoor_temp[0]:.2f}°C")
