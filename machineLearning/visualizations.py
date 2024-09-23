import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import joblib
from sklearn.metrics import mean_squared_error, r2_score

# Load the synthetic data from the CSV file
df = pd.read_csv(r'D:\EndCycleProject\machineLearning\synthetic_data.csv')

# Prepare the data (same way you did during training)
X = df[['outdoor_temp', 'outdoor_humidity', 'indoor_temp', 'ac_status', 'ac_target_temp']].fillna(0)
y = df['indoor_temp_next_hour']

# Load the saved model and scaler
model = joblib.load(r'D:\EndCycleProject\machineLearning\trained_regression_model.pkl')
scaler = joblib.load(r'D:\EndCycleProject\machineLearning\scaler.pkl')

# Scale the features
X_scaled = scaler.transform(X)

# Make predictions using the loaded model
y_pred = model.predict(X_scaled)

# Create a DataFrame to store results
results_df = X.copy()  # Copy the feature data
results_df['Actual'] = y.values
results_df['Predicted'] = y_pred
results_df['Residuals'] = results_df['Actual'] - results_df['Predicted']

# Save results to CSV if needed
results_df.to_csv(r'D:\EndCycleProject\machineLearning\prediction_results.csv', index=False)

# Print basic evaluation metrics
mse = mean_squared_error(results_df['Actual'], results_df['Predicted'])
r2 = r2_score(results_df['Actual'], results_df['Predicted'])
print(f'Mean Squared Error: {mse:.2f}')
print(f'R² Score: {r2:.2f}')

# ==============================================
# 2. Pair Plot
# ==============================================
pairplot_df = df[['outdoor_temp', 'outdoor_humidity', 'indoor_temp', 'ac_status', 'ac_target_temp', 'indoor_temp_next_hour']].fillna(0)
sns.pairplot(pairplot_df)
plt.title('Pair Plot of Features and Target')
plt.savefig(r'D:\EndCycleProject\machineLearning\pairplot.png')
plt.show()

# ==============================================
# 3. Correlation Heatmap
# ==============================================
corr_matrix = pairplot_df.corr()
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Correlation Heatmap')
plt.savefig(r'D:\EndCycleProject\machineLearning\correlation_heatmap.png')
plt.show()

# ==============================================
# 4. Actual vs. Predicted Values Plot
# ==============================================
plt.figure(figsize=(8, 6))
plt.scatter(results_df['Actual'], results_df['Predicted'], alpha=0.7)
plt.xlabel('Actual Indoor Temp Next Hour')
plt.ylabel('Predicted Indoor Temp Next Hour')
plt.title('Actual vs. Predicted Indoor Temperatures')
plt.plot([results_df['Actual'].min(), results_df['Actual'].max()],
         [results_df['Actual'].min(), results_df['Actual'].max()],
         color='red', linewidth=2)  # Line of perfect prediction
plt.savefig(r'D:\EndCycleProject\machineLearning\actual_vs_predicted.png')
plt.show()

# ==============================================
# 5. Residuals Histogram
# ==============================================
plt.figure(figsize=(8, 6))
sns.histplot(results_df['Residuals'], kde=True)
plt.xlabel('Residuals (Actual - Predicted)')
plt.title('Residuals Distribution')
plt.savefig(r'D:\EndCycleProject\machineLearning\residuals_histogram.png')
plt.show()

# ==============================================
# 6. Residuals vs. Predicted Plot
# ==============================================
plt.figure(figsize=(8, 6))
plt.scatter(results_df['Predicted'], results_df['Residuals'], alpha=0.7)
plt.xlabel('Predicted Indoor Temp Next Hour')
plt.ylabel('Residuals')
plt.title('Residuals vs. Predicted Values')
plt.axhline(y=0, color='red', linestyle='--')
plt.savefig(r'D:\EndCycleProject\machineLearning\residuals_vs_predicted.png')
plt.show()

# ==============================================
# 7. Time Series Plot
# ==============================================
df['Hour'] = np.arange(len(df))  # Assuming data is sequential
plt.figure(figsize=(12, 6))
plt.plot(df['Hour'], df['indoor_temp'], label='Indoor Temp', alpha=0.7)
plt.plot(df['Hour'], df['outdoor_temp'], label='Outdoor Temp', alpha=0.7)
plt.xlabel('Hour')
plt.ylabel('Temperature (°C)')
plt.title('Indoor and Outdoor Temperatures Over Time')
plt.legend()
plt.savefig(r'D:\EndCycleProject\machineLearning\time_series.png')
plt.show()

# ==============================================
# 8. Feature Coefficient Bar Chart
# ==============================================
coefficients = model.coef_
feature_names = X.columns
coef_df = pd.DataFrame({'Feature': feature_names, 'Coefficient': coefficients})
plt.figure(figsize=(8, 6))
sns.barplot(x='Coefficient', y='Feature', data=coef_df, orient='h')
plt.title('Feature Coefficients')
plt.savefig(r'D:\EndCycleProject\machineLearning\feature_coefficients.png')
plt.show()

# ==============================================
# 9. Distribution of Features
# ==============================================
features = ['outdoor_temp', 'outdoor_humidity', 'indoor_temp', 'ac_target_temp']
for feature in features:
    plt.figure(figsize=(8, 6))
    sns.histplot(df[feature], kde=True)
    plt.title(f'Distribution of {feature}')
    plt.xlabel(feature)
    plt.savefig(rf'D:\EndCycleProject\machineLearning\{feature}_distribution.png')
    plt.show()
