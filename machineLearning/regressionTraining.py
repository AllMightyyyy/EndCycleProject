import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
import joblib  # Used to save/load the model

# Load the synthetic data from the CSV file
df = pd.read_csv(r'D:\EndCycleProject\machineLearning\synthetic_data.csv')

# Step 1: Prepare the data for training
X = df[['outdoor_temp', 'outdoor_humidity', 'indoor_temp', 'ac_status', 'ac_target_temp']].fillna(0)
y = df['indoor_temp_next_hour']

# Step 2: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 3: Initialize the scaler
scaler = StandardScaler()

# Step 4: Fit the scaler on the training data and transform
X_train_scaled = scaler.fit_transform(X_train)

# Step 5: Transform the test data
X_test_scaled = scaler.transform(X_test)

# Step 6: Train the Linear Regression model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Step 7: Make predictions on the test set
y_pred_scaled = model.predict(X_test_scaled)

# Step 8: Evaluate the model
mse_scaled = mean_squared_error(y_test, y_pred_scaled)
print(f'Mean Squared Error (scaled): {mse_scaled:.2f}')

# Step 9: Calculate R-squared
r2 = r2_score(y_test, y_pred_scaled)
print(f'R² Score: {r2:.2f}')

# Step 10: Save the trained model and the scaler for future use in the specified path
model_save_path = r'D:\EndCycleProject\machineLearning\trained_regression_model.pkl'
scaler_save_path = r'D:\EndCycleProject\machineLearning\scaler.pkl'

# Save the trained model
joblib.dump(model, model_save_path)

# Save the scaler
joblib.dump(scaler, scaler_save_path)

print(f'Model saved at {model_save_path}')
print(f'Scaler saved at {scaler_save_path}')

coefficients = model.coef_
intercept = model.intercept_
feature_names = X.columns

for coef, feature in zip(coefficients, feature_names):
    print(f"Coefficient for {feature}: {coef}")
print(f"Intercept: {intercept}")
